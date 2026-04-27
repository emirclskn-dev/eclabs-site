import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Starfield = ({
    targetScroll,
    currentScroll,
    mouse,
    onSceneChange,
    onReady,
    isLogoHovered
}) => {
    const mountRef = useRef(null);
    const activeSceneRef = useRef(0);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const reducedMotion = false;

        if (!mountRef.current) return;

        let renderer, scene, camera, particles, geometry, material;
        let rafId;
        const debug = new URLSearchParams(window.location.search).get("debug") === "1";
        let lastFpsT = performance.now();
        let frames = 0;

        // Create a 5-pointed star texture
        const getStarTexture = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 32;
            canvas.height = 32;
            const context = canvas.getContext("2d");
            const cx = 16;
            const cy = 16;
            const outerRadius = 14;
            const innerRadius = 6;
            const spikes = 5;

            context.beginPath();
            for (let i = 0; i < spikes * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (Math.PI / spikes) * i - Math.PI / 2;
                const x = cx + Math.cos(angle) * radius;
                const y = cy + Math.sin(angle) * radius;
                if (i === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }
            }
            context.closePath();

            // Create gradient for glow effect
            const gradient = context.createRadialGradient(cx, cy, 0, cx, cy, outerRadius);
            gradient.addColorStop(0, "rgba(255,255,255,1)");
            gradient.addColorStop(0.5, "rgba(255,255,255,0.8)");
            gradient.addColorStop(1, "rgba(255,255,255,0)");
            
            context.fillStyle = gradient;
            context.fill();
            
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
        };

        let originalPositions;
        let velocities;
        let didMarkReady = false;

        const init = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const dpr = Math.min(window.devicePixelRatio, 1.5);

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

            renderer = new THREE.WebGLRenderer({
                antialias: !reducedMotion,
                alpha: true,
                powerPreference: "high-performance",
            });

            renderer.setSize(width, height);
            renderer.setPixelRatio(dpr);
            mountRef.current.appendChild(renderer.domElement);
            renderer.domElement.style.position = "absolute";
            renderer.domElement.style.inset = "0";
            renderer.domElement.style.width = "100%";
            renderer.domElement.style.height = "100%";
            renderer.domElement.style.display = "block";
            renderer.setClearColor(0x000000, 0);

            const count = isMobile ? 800 : 2000;
            const positions = new Float32Array(count * 3);
            originalPositions = new Float32Array(count * 3);
            velocities = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                positions[i3] = (Math.random() - 0.5) * 80;
                positions[i3 + 1] = (Math.random() - 0.5) * 80;
                positions[i3 + 2] = -20 - Math.random() * 380;

                originalPositions[i3] = positions[i3];
                originalPositions[i3 + 1] = positions[i3 + 1];
                originalPositions[i3 + 2] = positions[i3 + 2];

                const c = 0.75 + Math.random() * 0.25;
                colors[i3] = c;
                colors[i3 + 1] = c;
                colors[i3 + 2] = c;
            }

            geometry = new THREE.BufferGeometry();
            geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

            const starTexture = getStarTexture();

            material = new THREE.PointsMaterial({
                size: 0.4,
                map: starTexture,
                vertexColors: true,
                transparent: true,
                opacity: 0.92,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                alphaTest: 0.01,
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            rafId = requestAnimationFrame(animate);
            document.addEventListener("visibilitychange", handleVisibilityChange);
        };

        const animate = () => {
            currentScroll.current += (targetScroll.current - currentScroll.current) * 0.06;
            const t = currentScroll.current;
            const easedProgress = 1 - Math.pow(1 - t, 3);

            camera.position.z = 15;
            camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.05;
            camera.position.y += (-mouse.current.y * 1.5 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);
            particles.rotation.y += 0.0006;
            particles.rotation.x += 0.0002;

            const limitSq = 64;
            const mouse3D = new THREE.Vector3(mouse.current.x, mouse.current.y, 0.5);
            mouse3D.unproject(camera);
            const dir = mouse3D.sub(camera.position).normalize();
            const distToPlane = -camera.position.z / dir.z;
            const pos = camera.position.clone().add(dir.multiplyScalar(distToPlane));

            const posAttr = geometry.attributes.position.array;
            const count = geometry.attributes.position.count;

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                const dx = posAttr[i3] - pos.x;
                const dy = posAttr[i3 + 1] - pos.y;
                const dz = posAttr[i3 + 2] - pos.z;
                const d2 = dx * dx + dy * dy + dz * dz;

                if (d2 < limitSq) {
                    const force = (limitSq - d2) / limitSq;
                    velocities[i3] += (dx / 8) * force * 0.6;
                    velocities[i3 + 1] += (dy / 8) * force * 0.6;
                    velocities[i3 + 2] += (dz / 8) * force * 0.6;
                }

                // Gravity pull towards center when logo is hovered
                if (isLogoHovered) {
                    // Calculate vector to center (roughly 0,0, camera.position.z - some distance)
                    const targetZ = camera.position.z - 50;
                    const dirX = 0 - posAttr[i3];
                    const dirY = 0 - posAttr[i3 + 1];
                    const dirZ = targetZ - posAttr[i3 + 2];

                    const distToCenter = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
                    if (distToCenter > 1) { // Prevent extreme speeds
                        const pullForce = 0.05 / Math.max(distToCenter, 10); // Inverse square-ish pull
                        velocities[i3] += dirX * pullForce;
                        velocities[i3 + 1] += dirY * pullForce;
                        velocities[i3 + 2] += dirZ * pullForce;
                    }
                } else {
                    // Normal behavior: return to original positions
                    velocities[i3] += (originalPositions[i3] - posAttr[i3]) * 0.015;
                    velocities[i3 + 1] += (originalPositions[i3 + 1] - posAttr[i3 + 1]) * 0.015;
                    velocities[i3 + 2] += (originalPositions[i3 + 2] - posAttr[i3 + 2]) * 0.015;
                }

                velocities[i3] *= 0.92;
                velocities[i3 + 1] *= 0.92;
                velocities[i3 + 2] *= 0.92;

                posAttr[i3] += velocities[i3];
                posAttr[i3 + 1] += velocities[i3 + 1];
                posAttr[i3 + 2] += velocities[i3 + 2];
            }

            geometry.attributes.position.needsUpdate = true;

            let newScene = 0;
            const targetColor = new THREE.Color(0x22d3ee);
            if (t < 0.1) {
                newScene = 0;
                targetColor.set(0x22d3ee);
            } else if (t < 0.3) {
                newScene = 1;
                targetColor.set(0x22d3ee);
            } else if (t < 0.5) {
                newScene = 2;
                targetColor.set(0xf59e0b);
            } else if (t < 0.7) {
                newScene = 3;
                targetColor.set(0xa855f7);
            } else if (t < 0.9) {
                newScene = 4;
                targetColor.set(0x6b7280); // Gray for Ascend
            } else {
                newScene = 5;
                targetColor.set(0x10b981); // Emerald for Sporio
            }

            if (newScene !== activeSceneRef.current) {
                activeSceneRef.current = newScene;
                onSceneChange?.(newScene);
            }

            material.color.lerp(targetColor, 0.03);
            material.opacity += ((activeSceneRef.current >= 2 ? 0.96 : 0.92) - material.opacity) * 0.05;

            renderer.render(scene, camera);
            if (!didMarkReady) {
                didMarkReady = true;
                onReady?.(true);
            }
            rafId = requestAnimationFrame(animate);
        };

        const handleVisibilityChange = () => {
            if (document.hidden) cancelAnimationFrame(rafId);
            else {
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(animate);
            }
        };

        const handleResize = () => {
            if (!camera || !renderer) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        };

        init();
        window.addEventListener("resize", handleResize);

        return () => {
            onReady?.(false);
            cancelAnimationFrame(rafId);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("resize", handleResize);
            if (renderer) {
                renderer.dispose();
                if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
            }
            if (geometry) geometry.dispose();
            if (material) material.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default Starfield;
