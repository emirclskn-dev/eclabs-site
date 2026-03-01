import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Starfield from "../components/Starfield";
import AppIcon from "../components/common/AppIcon";
import { DisabledCTA } from "../components/common/Buttons";
import { WAITLIST_EMAIL } from "../constants";
import { useLanguage } from "../context/LanguageContext";

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
    
    .scene-container { perspective: 1500px; transform-style: preserve-3d; }
    .scene-card { transition: all 1.4s cubic-bezier(0.16, 1, 0.3, 1); transform-style: preserve-3d; backface-visibility: hidden; }
    
    .star-particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        filter: blur(1px);
        box-shadow: 0 0 10px white, 0 0 20px #22D3EE;
        pointer-events: none;
        transition: all 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 15;
    }

    @keyframes star-pulse {
        0%, 100% { opacity: 0.8; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
    }
    `}</style>
);

function Home() {
    const targetScroll = useRef(0);
    const currentScroll = useRef(0);
    const mouse = useRef({ x: 0, y: 0 });

    const [activeScene, setActiveScene] = useState(0);
    const { lang, toggleLanguage } = useLanguage();
    const [isStarfieldReady, setIsStarfieldReady] = useState(false);

    useEffect(() => {
        const handleWheel = (e) => {
            targetScroll.current = Math.min(Math.max(targetScroll.current + e.deltaY * 0.0004, 0), 1);
        };

        let touchY = 0;
        const handleTouchStart = (e) => (touchY = e.touches[0].clientY);
        const handleTouchMove = (e) => {
            const delta = touchY - e.touches[0].clientY;
            targetScroll.current = Math.min(Math.max(targetScroll.current + delta * 0.001, 0), 1);
            touchY = e.touches[0].clientY;
        };

        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        if (window.innerWidth >= 768) window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const setScene = (sceneIndex) => {
        const targets = [0.0, 0.33, 0.66, 1.0];
        const clamped = Math.max(0, Math.min(sceneIndex, targets.length - 1));
        targetScroll.current = targets[clamped];
        currentScroll.current = targets[clamped];
        setActiveScene(clamped);
    };

    const t_copy = {
        en: {
            intro: "Scroll to explore the lab",
            atlasly_desc: "Private travel journal. Mark countries, attach notes, and keep travel memories organized.",
            saatlikayet_desc: "Daily Quran verses, precise prayer times, and Asmaul Husna in a minimal design.",
            novagaia_desc: "Post-human survival shooter. Short runs, high stakes, score-chasing.",
            atlasly_badge: "In Development",
            saatlikayet_badge: "App Store Review",
            novagaia_badge: "In Development",
            atlasly_primary: "In Development",
            saatlikayet_primary: "Coming Soon to App Store",
            novagaia_primary: "Playtest Coming Soon",
        },
        tr: {
            intro: "Laboratuvarı keşfetmek için kaydırın",
            atlasly_desc: "Özel seyahat günlüğü. Ülkeleri işaretleyin, notlar ekleyin ve anılarınızı düzenleyin.",
            saatlikayet_desc: "Minimalist bir tasarımda günlük ayetler, doğru namaz vakitleri ve Esmaül Hüsna.",
            novagaia_desc: "Post-human hayatta kalma oyunu. Kısa run’lar, yüksek tempo, rekor odaklı.",
            atlasly_badge: "Geliştirme Aşamasında",
            saatlikayet_badge: "App Store İncelemede",
            novagaia_badge: "Geliştirme Aşamasında",
            atlasly_primary: "Geliştirme Aşamasında",
            saatlikayet_primary: "Yakında App Store’da",
            novagaia_primary: "Playtest Yakında",
        },
    }[lang];

    return (
        <div className="relative w-full h-screen bg-[#000] text-white overflow-hidden font-sans">
            <GlobalStyles />
            <Starfield
                targetScroll={targetScroll}
                currentScroll={currentScroll}
                mouse={mouse}
                onSceneChange={setActiveScene}
                onReady={setIsStarfieldReady}
            />

            {!isStarfieldReady && (
                <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <div className="mx-auto w-px h-16 bg-gradient-to-b from-transparent via-cyan-500 to-transparent mb-6 animate-pulse" />
                        <div className="text-xs tracking-[0.6em] uppercase font-bold text-cyan-400/80 animate-pulse">
                            {lang === "tr" ? "Yükleniyor" : "Loading"}
                        </div>
                    </div>
                </div>
            )}

            <div className="relative z-10 w-full h-full pointer-events-none scene-container">
                <div className="absolute right-6 top-1/2 -translate-y-1/2 z-40 pointer-events-auto select-none">
                    <div className="flex flex-col items-center gap-3">
                        {[0, 1, 2, 3].map((i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setScene(i)}
                                aria-label={`Go to scene ${i}`}
                                className="group flex items-center justify-center"
                            >
                                <span
                                    className={`block rounded-full transition-all duration-300 border border-white/20 bg-white/10 group-hover:bg-white/20 group-hover:border-white/40 ${activeScene === i ? "w-2.5 h-2.5 opacity-100" : "w-2 h-2 opacity-50"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 h-24 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
                </div>

                <nav className="absolute top-0 z-40 w-full p-8 flex justify-between items-center opacity-40">
                    <div className="text-xs tracking-[0.5em] font-bold uppercase text-cyan-400">ECLABS</div>
                    <div className="flex items-center gap-3 pointer-events-auto">
                        <Link to="/contact" className="text-[10px] uppercase tracking-widest font-mono bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:bg-cyan-500 hover:text-black transition-all">
                            {lang === "tr" ? "İletişim" : "Contact"}
                        </Link>
                        <button
                            onClick={toggleLanguage}
                            className="text-[10px] uppercase tracking-widest font-mono bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:bg-cyan-500 hover:text-black transition-all"
                        >
                            {lang === "en" ? "TR" : "EN"}
                        </button>
                    </div>
                </nav>

                {/* Scene 0: Intro (Marka Logosu) */}
                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center px-6 scene-card ${activeScene === 0 ? "pointer-events-auto" : "pointer-events-none"}`}
                    style={{
                        opacity: activeScene === 0 ? 1 : 0,
                        transform: activeScene === 0
                            ? "translateZ(0) rotateY(0) scale(1)"
                            : activeScene > 0
                                ? "translateZ(-800px) rotateY(-45deg) translateX(-50%)"
                                : "translateZ(-400px) rotateY(20deg) translateX(30%)",
                        filter: activeScene === 0 ? "blur(0px)" : "blur(20px)"
                    }}
                >
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-cyan-500 to-transparent mb-8 animate-pulse" />
                    <h1 className="text-6xl md:text-[8rem] font-display font-bold tracking-tighter mb-4 text-center select-none text-white opacity-80">
                        ECLABS.
                    </h1>
                    <p className="text-cyan-400 text-[10px] tracking-[0.6em] uppercase animate-pulse">{t_copy.intro}</p>
                </div>

                {/* Scene 1: Atlasly */}
                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center px-6 scene-card ${activeScene === 1 ? "pointer-events-auto" : "pointer-events-none"}`}
                    style={{
                        opacity: activeScene === 1 ? 1 : 0,
                        transform: activeScene === 1
                            ? "translateZ(0) rotateY(0) scale(1)"
                            : activeScene > 1
                                ? "translateZ(-1200px) rotateY(-70deg) translateX(-120%)"
                                : "translateZ(-1800px) rotateY(70deg) translateX(150%)",
                        filter: activeScene === 1 ? "blur(0px)" : "blur(40px)",
                        zIndex: activeScene === 1 ? 20 : 10
                    }}
                >
                    <AppIcon src="/atlasly-new.png" alt="Atlasly" fallbackGradient="from-cyan-500 to-blue-600" glowColor="bg-cyan-500" />
                    <div className={`text-center max-w-xs bg-white/[0.03] border border-white/5 p-6 rounded-3xl backdrop-blur-xl ${activeScene === 1 ? "pointer-events-auto" : "pointer-events-none"}`}>
                        <div className="inline-block px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[8px] text-cyan-400 font-bold mb-4 uppercase tracking-[0.2em]">{t_copy.atlasly_badge}</div>
                        <h2 className="text-3xl font-display font-bold mb-2 tracking-tight">Atlasly</h2>
                        <p className="text-white/40 text-xs leading-relaxed mb-4">{t_copy.atlasly_desc}</p>
                        <Link to="/privacy-atlasly" className="inline-block mb-6 text-[10px] text-cyan-400/60 hover:text-cyan-400 underline decoration-cyan-400/20 underline-offset-4 transition-colors">
                            {lang === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
                        </Link>
                        <div className="flex items-center justify-center"><DisabledCTA label={t_copy.atlasly_primary} /></div>
                    </div>
                </div>

                {/* Scene 2: SaatlikAyet */}
                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center px-6 scene-card ${activeScene === 2 ? "pointer-events-auto" : "pointer-events-none"}`}
                    style={{
                        opacity: activeScene === 2 ? 1 : 0,
                        transform: activeScene === 2
                            ? "translateZ(0) rotateY(0) scale(1)"
                            : activeScene > 2
                                ? "translateZ(-1200px) rotateY(-70deg) translateX(-120%)"
                                : "translateZ(-1800px) rotateY(70deg) translateX(150%)",
                        filter: activeScene === 2 ? "blur(0px)" : "blur(40px)",
                        zIndex: activeScene === 2 ? 20 : 10
                    }}
                >
                    <AppIcon src="/saatlikayet-icon.png" alt="SaatlikAyet" fallbackGradient="from-amber-500 to-orange-600" glowColor="bg-amber-500" />
                    <div className={`text-center max-w-xs bg-white/[0.03] border border-white/5 p-6 rounded-3xl backdrop-blur-xl ${activeScene === 2 ? "pointer-events-auto" : "pointer-events-none"}`}>
                        <div className="inline-block px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[8px] text-amber-400 font-bold mb-4 uppercase tracking-[0.2em]">{t_copy.saatlikayet_badge}</div>
                        <h2 className="text-3xl font-display font-bold mb-2 tracking-tight">SaatlikAyet</h2>
                        <p className="text-white/40 text-xs leading-relaxed mb-4">{t_copy.saatlikayet_desc}</p>
                        <Link to="/privacy-saatlikayet" className="inline-block mb-6 text-[10px] text-amber-400/60 hover:text-amber-400 underline decoration-amber-400/20 underline-offset-4 transition-colors">
                            {lang === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
                        </Link>
                        <div className="flex items-center justify-center"><DisabledCTA label={t_copy.saatlikayet_primary} /></div>
                    </div>
                </div>

                {/* Scene 3: Nova Gaia */}
                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center px-6 scene-card ${activeScene === 3 ? "pointer-events-auto" : "pointer-events-none"}`}
                    style={{
                        opacity: activeScene === 3 ? 1 : 0,
                        transform: activeScene === 3
                            ? "translateZ(0) rotateY(0) scale(1)"
                            : activeScene > 3
                                ? "translateZ(-1200px) rotateY(-70deg) translateX(-120%)"
                                : "translateZ(-1800px) rotateY(70deg) translateX(150%)",
                        filter: activeScene === 3 ? "blur(0px)" : "blur(40px)",
                        zIndex: activeScene === 3 ? 20 : 10
                    }}
                >
                    <AppIcon src="/novagaia-icon.png" alt="Nova Gaia" fallbackGradient="from-purple-600 to-indigo-800" glowColor="bg-purple-500" />
                    <div className={`text-center max-w-xs bg-white/[0.03] border border-white/5 p-6 rounded-3xl backdrop-blur-xl ${activeScene === 3 ? "pointer-events-auto" : "pointer-events-none"}`}>
                        <div className="inline-block px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[8px] text-purple-400 font-bold mb-4 uppercase tracking-[0.2em]">{t_copy.novagaia_badge}</div>
                        <h2 className="text-3xl font-display font-bold mb-2 tracking-tighter">Nova Gaia</h2>
                        <p className="text-white/40 text-xs leading-relaxed mt-4">{t_copy.novagaia_desc}</p>
                    </div>
                </div>

                {/* Orbital Star Particles (Trails) */}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={`star-${i}`}
                        className="star-particle"
                        style={{
                            opacity: activeScene === 0 ? 0 : 0.6,
                            transform: activeScene === 0
                                ? `translateZ(${-500 - i * 100}px) rotateY(${i * 60}deg) translateX(${100 + i * 50}%)`
                                : activeScene === 1
                                    ? `translateZ(${-200 - i * 50}px) rotateY(${10 - i * 5}deg) translateX(${-10 + i * 20}%)`
                                    : activeScene === 2
                                        ? `translateZ(${-200 - i * 50}px) rotateY(${-10 + i * 5}deg) translateX(${10 - i * 20}%)`
                                        : `translateZ(${-400 - i * 100}px) rotateY(${-45 + i * 15}deg) translateX(${-50 + i * 30}%)`,
                            boxShadow: `0 0 10px white, 0 0 20px ${activeScene === 2 ? '#f59e0b' : activeScene === 3 ? '#a855f7' : '#22D3EE'}`
                        }}
                    />
                ))}

                <footer className="absolute bottom-0 z-40 w-full p-10 flex justify-between items-center opacity-30">
                    <div className="text-[10px] tracking-[0.4em] font-mono text-white/50">© 2026 ECLABS • {WAITLIST_EMAIL}</div>
                    <div className="flex gap-8 text-[9px] tracking-widest font-bold uppercase pointer-events-auto">
                        <Link to="/privacy" className="hover:text-cyan-400 transition-colors">{lang === "tr" ? "Gizlilik" : "Privacy"}</Link>
                        <Link to="/terms" className="hover:text-cyan-400 transition-colors">{lang === "tr" ? "Şartlar" : "Terms"}</Link>
                        <Link to="/contact" className="hover:text-cyan-400 transition-colors">{lang === "tr" ? "İletişim" : "Contact"}</Link>
                    </div>
                </footer>
            </div>

            <div
                className="absolute inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}

export default Home;
