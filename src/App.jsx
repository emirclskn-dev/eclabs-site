import React, { useState, useEffect, useRef, Component } from "react";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";

// ===== Links (App Store review bitene kadar tıklatma) =====
const WAITLIST_EMAIL = "hello@eclabs.tech";
const ATLASLY_NOTIFY = `mailto:${WAITLIST_EMAIL}?subject=Atlasly%20Waitlist`;
const SAATLIKAYET_NOTIFY = `mailto:${WAITLIST_EMAIL}?subject=SaatlikAyet%20Waitlist`;
const NOVA_GAIA_NOTIFY = `mailto:${WAITLIST_EMAIL}?subject=Nova%20Gaia%20Interest`;

// (kept for readability – anchors removed, now opens a dock)
const PRIVACY_URL = "privacy";
const TERMS_URL = "terms";

// --- Error Boundary ---
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError)
      return (
        <div className="h-screen bg-[#06080F] flex items-center justify-center text-cyan-400 font-mono text-center px-4">
          System Reboot Required. <br /> Please refresh the page.
        </div>
      );
    return this.props.children;
  }
}

// --- Optimized App Icon Component ---
const AppIcon = ({ src, alt, fallbackGradient, glowColor }) => {
  const [isError, setIsError] = useState(false);
  return (
    <div className="relative w-20 h-20 md:w-22 md:h-22 mb-6 transition-transform duration-500 hover:scale-105 pointer-events-none">
      <div className={`absolute inset-0 blur-2xl opacity-30 rounded-full ${glowColor}`} />
      <div className="w-full h-full rounded-[22.5%] relative overflow-hidden bg-black border border-white/10 z-10">
        {!isError ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover relative z-10"
            onError={() => setIsError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient} opacity-80`} />
        )}
        <div className="absolute inset-0 border border-white/10 rounded-[22.5%] pointer-events-none z-20" />
      </div>
    </div>
  );
};

const DisabledCTA = ({ label }) => (
  <button
    type="button"
    aria-disabled="true"
    className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 text-white/70 text-[10px] font-bold rounded-full uppercase tracking-widest cursor-not-allowed border border-white/10"
    onClick={(e) => e.preventDefault()}
  >
    {label}
  </button>
);

const SecondaryCTA = ({ href, label }) => (
  <a
    href={href}
    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition-colors"
  >
    {label}
  </a>
);

const AppContent = () => {
  const mountRef = useRef(null);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const activeSceneRef = useRef(0);

  const [activeScene, setActiveScene] = useState(0);
  const [lang, setLang] = useState("tr");
  const [legalOpen, setLegalOpen] = useState(null); // 'privacy' | 'terms' | null

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    if (!mountRef.current) return;

    let renderer, scene, camera, particles, geometry, material;
    let planetAtlasly, planetSaatlikAyet, planetNovaGaia;
    let rafId;

    let originalPositions;
    let velocities;

    const init = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, 1.5);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });

      renderer.setSize(width, height);
      renderer.setPixelRatio(dpr);
      mountRef.current.appendChild(renderer.domElement);

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

        colors[i3] = 0.13;
        colors[i3 + 1] = 0.82;
        colors[i3 + 2] = 0.93;
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      material = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // --- Subtle distant planet meshes ---
      const createPlanet = (color, x, z) => {
        const geo = new THREE.SphereGeometry(3.5, 48, 48);
        const mat = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.08,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, 2, z);
        scene.add(mesh);
        return mesh;
      };

      planetAtlasly = createPlanet(0x22d3ee, -12, -180);
      planetSaatlikAyet = createPlanet(0xf59e0b, 0, -220);
      planetNovaGaia = createPlanet(0xa855f7, 14, -260);

      rafId = requestAnimationFrame(animate);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    };

    const animate = () => {
      currentScroll.current += (targetScroll.current - currentScroll.current) * 0.06;
      const t = currentScroll.current;
      const easedProgress = 1 - Math.pow(1 - t, 3);

      // --- Planet cinematic intro (fade out before cards) ---
      if (planetAtlasly && planetSaatlikAyet && planetNovaGaia) {
        const introPhase = Math.min(t / 0.18, 1);
        const fadeOutPhase = Math.min(Math.max((t - 0.18) / 0.12, 0), 1);

        const baseScale = 0.9 + introPhase * 0.2;
        const opacity = 0.08 * (1 - fadeOutPhase);

        planetAtlasly.scale.set(baseScale, baseScale, baseScale);
        planetSaatlikAyet.scale.set(baseScale, baseScale, baseScale);
        planetNovaGaia.scale.set(baseScale, baseScale, baseScale);

        planetAtlasly.material.opacity = opacity;
        planetSaatlikAyet.material.opacity = opacity;
        planetNovaGaia.material.opacity = opacity;
      }

      camera.position.z = 20 - easedProgress * 60;

      if (planetAtlasly) planetAtlasly.rotation.y += 0.0008;
      if (planetSaatlikAyet) planetSaatlikAyet.rotation.y += 0.0006;
      if (planetNovaGaia) planetNovaGaia.rotation.y += 0.0004;
      camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.current.y * 1.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, -80);

      const mouse3D = new THREE.Vector3();
      const targetColor = new THREE.Color(0x22d3ee);
      const limitSq = 64;

      mouse3D.set(mouse.current.x, mouse.current.y, 0.5);
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
        setActiveScene(newScene);
      }

      material.color.lerp(targetColor, 0.03);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(animate);
      }
    };

    const handleWheel = (e) => {
      targetScroll.current = Math.min(Math.max(targetScroll.current + e.deltaY * 0.00025, 0), 1);
    };

    let touchY = 0;
    const handleTouchStart = (e) => (touchY = e.touches[0].clientY);
    const handleTouchMove = (e) => {
      const delta = touchY - e.touches[0].clientY;
      targetScroll.current = Math.min(Math.max(targetScroll.current + delta * 0.0008, 0), 1);
      touchY = e.touches[0].clientY;
    };

    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    init();
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize);
    if (!isMobile) window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      if (!isMobile) window.removeEventListener("mousemove", handleMouseMove);

      if (planetAtlasly) planetAtlasly.geometry.dispose();
      if (planetAtlasly) planetAtlasly.material.dispose();
      if (planetSaatlikAyet) planetSaatlikAyet.geometry.dispose();
      if (planetSaatlikAyet) planetSaatlikAyet.material.dispose();
      if (planetNovaGaia) planetNovaGaia.geometry.dispose();
      if (planetNovaGaia) planetNovaGaia.material.dispose();

      if (renderer) {
        renderer.dispose();
        if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, []);

  const t_copy =
    {
      en: {
        intro: "Scroll to explore the lab",
        atlasly_desc: "Private travel journal. Mark countries, attach notes, and keep travel memories organized.",
        saatlikayet_desc: "Daily Quran verses, precise prayer times, and Asmaul Husna in a minimal design.",
        novagaia_desc: "Post-human survival shooter. The stars are reclaiming what we lost.",
        cta_disabled: "App Store (In Review)",
        notify: "Notify Me",
        soon: "In Development",
        privacy_title: "Privacy Policy",
        terms_title: "Terms",
      },
      tr: {
        intro: "Laboratuvarı keşfetmek için kaydırın",
        atlasly_desc: "Özel seyahat günlüğü. Ülkeleri işaretleyin, notlar ekleyin ve anılarınızı düzenleyin.",
        saatlikayet_desc: "Minimalist bir tasarımda günlük ayetler, doğru namaz vakitleri ve Esmaül Hüsna.",
        novagaia_desc: "Post-human hayatta kalma oyunu. Yıldızlar kaybettiğimizi geri alıyor.",
        cta_disabled: "App Store (Review’de)",
        notify: "Beni Bilgilendir",
        soon: "Geliştirme Aşamasında",
        privacy_title: "Gizlilik",
        terms_title: "Şartlar",
      },
    }[lang];

  const privacyText =
    lang === "tr"
      ? "Bu site yalnızca vitrin amaçlıdır. Ziyaretçi verisi toplama/takip sistemleri şu an minimum düzeydedir. App Store linkleri yayınlanana kadar pasiftir. Detaylı gizlilik metnini yayın öncesi buraya koyacağız."
      : "This site is a showcase. Tracking/analytics is minimal for now. App Store links are disabled until release. We will publish the full privacy text before launch.";

  const termsText =
    lang === "tr"
      ? "Bu sayfadaki içerikler bilgilendirme amaçlıdır. Marka/ürün isimleri ECLABS’e aittir. Uygulamalar yayınlandığında ilgili App Store şartları + EULA burada linklenecek."
      : "Content is informational only. Brand/product names belong to ECLABS. Once apps are released, App Store terms and EULA links will be provided here.";

  const legalTitle = legalOpen === "privacy" ? t_copy.privacy_title : t_copy.terms_title;
  const legalBody = legalOpen === "privacy" ? privacyText : termsText;

  return (
    <div className="relative w-full h-screen bg-[#000] text-white overflow-hidden font-sans">
      <GlobalStyles />
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 w-full h-full pointer-events-none">
        <nav className="absolute top-0 w-full p-8 flex justify-between items-center opacity-40">
          <div className="text-xs tracking-[0.5em] font-bold uppercase text-cyan-400">ECLABS</div>
          <button
            onClick={() => setLang((l) => (l === "en" ? "tr" : "en"))}
            className="pointer-events-auto text-[10px] uppercase tracking-widest font-mono bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:bg-cyan-500 hover:text-black transition-all"
          >
            {lang === "en" ? "TR" : "EN"}
          </button>
        </nav>

        {/* Scene 0 */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
            activeScene === 0 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-95"
          }`}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-cyan-500 to-transparent mb-8 animate-pulse" />
          <h1 className="text-6xl md:text-[8rem] font-display font-bold tracking-tighter mb-4 text-center text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            ECLABS.
          </h1>
          <p className="text-cyan-400 text-[10px] tracking-[0.6em] uppercase animate-pulse">{t_copy.intro}</p>
        </div>

        {/* Scene 1: Atlasly */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] px-6 will-change-transform ${
            activeScene === 1
              ? "opacity-100 translate-y-0 scale-100 blur-0"
              : "opacity-0 translate-y-24 scale-75 rotate-3 blur-md"
          }`}
        >
          <AppIcon src="/atlasly-new.png" alt="Atlasly" fallbackGradient="from-cyan-500 to-blue-600" glowColor="bg-cyan-500" />
          <div className="text-center max-w-xs pointer-events-auto bg-white/[0.03] border border-white/5 p-6 rounded-3xl backdrop-blur-xl">
            <h2 className="text-3xl font-display font-bold mb-2 tracking-tight">Atlasly</h2>
            <p className="text-white/40 text-xs leading-relaxed mb-6">{t_copy.atlasly_desc}</p>

            <div className="flex items-center justify-center gap-3">
              <DisabledCTA label={t_copy.cta_disabled} />
              <SecondaryCTA href={ATLASLY_NOTIFY} label={t_copy.notify} />
            </div>
          </div>
        </div>

        {/* Scene 2: SaatlikAyet */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] px-6 will-change-transform ${
            activeScene === 2
              ? "opacity-100 translate-y-0 scale-100 blur-0"
              : "opacity-0 translate-y-24 scale-75 rotate-3 blur-md"
          }`}
        >
          <AppIcon
            src="/saatlikayet-icon.png"
            alt="SaatlikAyet"
            fallbackGradient="from-amber-500 to-orange-600"
            glowColor="bg-amber-500"
          />
          <div className="text-center max-w-xs pointer-events-auto bg-white/[0.03] border border-white/5 p-6 rounded-3xl backdrop-blur-xl">
            <h2 className="text-3xl font-display font-bold mb-2 tracking-tight">SaatlikAyet</h2>
            <p className="text-white/40 text-xs leading-relaxed mb-6">{t_copy.saatlikayet_desc}</p>

            <div className="flex items-center justify-center gap-3">
              <DisabledCTA label={t_copy.cta_disabled} />
              <SecondaryCTA href={SAATLIKAYET_NOTIFY} label={t_copy.notify} />
            </div>
          </div>
        </div>

        {/* Scene 3: Nova Gaia (şimdilik boş / placeholder) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] px-6 will-change-transform ${
            activeScene === 3
              ? "opacity-100 translate-y-0 scale-100 blur-0"
              : "opacity-0 translate-y-24 scale-75 rotate-3 blur-md"
          }`}
        >
          <AppIcon src="/novagaia-icon.png" alt="Nova Gaia" fallbackGradient="from-purple-600 to-indigo-800" glowColor="bg-purple-500" />
          <div className="text-center max-w-xs pointer-events-auto bg-white/[0.03] border border-white/5 p-6 rounded-3xl backdrop-blur-xl">
            <div className="inline-block px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[8px] text-purple-400 font-bold mb-4 uppercase tracking-[0.2em]">
              {t_copy.soon}
            </div>
            <h2 className="text-3xl font-display font-bold mb-2 tracking-tighter">Nova Gaia</h2>

            {/* boş kalsın dedin: sadece minimal placeholder */}
            <div className="mt-6 w-full rounded-2xl border border-white/10 bg-black/30 p-5 text-left">
              <div className="text-[9px] tracking-[0.3em] uppercase text-white/40">Placeholder</div>
              <div className="mt-2 text-xs text-white/50 leading-relaxed">
                {lang === "tr"
                  ? "Oyun sayfası daha sonra doldurulacak. Şimdilik sadece varlığını gösteriyoruz."
                  : "Game page will be filled later. For now we only show it exists."}
              </div>
            </div>

            <a
              href={NOVA_GAIA_NOTIFY}
              className="mt-6 block w-full py-4 rounded-xl bg-white text-black hover:bg-purple-500 hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.3em]"
            >
              {t_copy.notify}
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 w-full p-10 flex justify-between items-center opacity-30">
          <div className="text-[10px] tracking-[0.4em] font-mono text-white/50">© 2026 ECLABS</div>
          <div className="flex gap-8 text-[9px] tracking-widest font-bold uppercase pointer-events-auto">
            <button
              type="button"
              onClick={() => setLegalOpen("privacy")}
              className="hover:text-cyan-400 transition-colors"
            >
              {t_copy.privacy_title}
            </button>
            <button
              type="button"
              onClick={() => setLegalOpen("terms")}
              className="hover:text-cyan-400 transition-colors"
            >
              {t_copy.terms_title}
            </button>
          </div>
        </footer>
        {/* Vertical Scene Indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-40 pointer-events-none">
          {[0,1,2,3].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                activeScene === i
                  ? "bg-cyan-400 scale-125 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Overlay noise */}
      <div
        className="absolute inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Legal modal (opened from footer links) */}
      {legalOpen && (
        <div className="fixed inset-0 z-[60] pointer-events-auto">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setLegalOpen(null)}
          />

          <div className="absolute inset-x-0 bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex justify-center px-4">
            <div
              className="w-full max-w-lg rounded-3xl border border-white/10 bg-black/70 backdrop-blur-xl p-6"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={legalTitle}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[9px] tracking-[0.35em] uppercase text-cyan-300 font-bold">{legalTitle}</div>
                  <p className="mt-3 text-xs text-white/60 leading-relaxed">{legalBody}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setLegalOpen(null)}
                  className="shrink-0 w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&family=Space+Grotesk:wght@500;700&display=swap');
    html { scroll-behavior: smooth; }
    body { margin: 0; background: black; -webkit-font-smoothing: antialiased; color-scheme: dark; }
    .font-display { font-family: 'Space Grotesk', sans-serif; }
    ::-webkit-scrollbar { display: none; }
    * { box-sizing: border-box; -ms-overflow-style: none; scrollbar-width: none; }
    a, button { cursor: pointer; }
    button:focus-visible, a:focus-visible { outline: 2px solid #22D3EE; outline-offset: 4px; }
  `}</style>
);

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}