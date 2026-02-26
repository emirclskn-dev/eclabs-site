import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Starfield = ({
    targetScroll,
    currentScroll,
    mouse,
    onSceneChange,
    onReady
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

            const count = isMobile ? 1000 : 2500;
            const positions = new Float32Array(count * 3);
            originalPositions = new Float32Array(count * 3);
            velocities = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                positions[i3] = (Math.random() - 0.5) * 80;
                positions[i3 + 1] = (Math.random() - 0.5) * 80;
                positions[i3 + 2] = (Math.random() - 0.5) * 400;

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

            material = new THREE.PointsMaterial({
                size: 0.11,
                vertexColors: true,
                transparent: true,
                opacity: 0.92,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
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

            camera.position.z = 15 - easedProgress * 110;
            camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.05;
            camera.position.y += (-mouse.current.y * 1.5 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, -easedProgress * 180);
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

                velocities[i3] += (originalPositions[i3] - posAttr[i3]) * 0.015;
                velocities[i3 + 1] += (originalPositions[i3 + 1] - posAttr[i3 + 1]) * 0.015;
                velocities[i3 + 2] += (originalPositions[i3 + 2] - posAttr[i3 + 2]) * 0.015;

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
            if (t < 0.15) {
                newScene = 0;
                targetColor.set(0x22d3ee);
            } else if (t < 0.45) {
                newScene = 1;
                targetColor.set(0x22d3ee);
            } else if (t < 0.75) {
                newScene = 2;
                targetColor.set(0xf59e0b);
            } else {
                newScene = 3;
                targetColor.set(0xa855f7);
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
