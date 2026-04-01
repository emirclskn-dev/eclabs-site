import React, { useCallback, useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import Starfield from "../components/Starfield";
import AppIcon from "../components/common/AppIcon";
import { DisabledCTA, PrimaryCTA, SecondaryCTA } from "../components/common/Buttons";
import { WAITLIST_EMAIL, NOVA_GAIA_NOTIFY, NOVAGAIA_ASCEND_NOTIFY } from "../constants";
import { useAudio } from "../context/AudioContext";
import { useLanguage } from "../context/LanguageContext";

const GlobalStyles = () => (
    <style>{`
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
        width: 3px;
        height: 3px;
        background: white;
        border-radius: 50%;
        filter: blur(0.5px);
        box-shadow: 0 0 10px white, 0 0 20px #22D3EE;
        pointer-events: none;
        transition: all 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 15;
    }

    @keyframes star-pulse {
        0%, 100% { opacity: 0.8; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
    }

    .eclabs-letter {
        display: inline-block;
        color: white;
        cursor: default;
        transition: opacity 0.3s ease;
        will-change: opacity;
    }

    @keyframes letter-restore {
        0% { opacity: 0; filter: blur(4px) brightness(3); transform: scale(1.15); }
        60% { opacity: 0.8; filter: blur(1px) brightness(1.5); transform: scale(1.02); }
        100% { opacity: 1; filter: blur(0) brightness(1); transform: scale(1); }
    }

    @keyframes scroll-bounce {
        0%, 100% { transform: translateY(0); opacity: 0.4; }
        50% { transform: translateY(6px); opacity: 1; }
    }
    .scroll-chevron {
        animation: scroll-bounce 1.6s ease-in-out infinite;
    }
    `}</style>
);

function Home() {
    const targetScroll = useRef(0);
    const currentScroll = useRef(0);
    const mouse = useRef({ x: 0, y: 0 });

    const [activeScene, setActiveScene] = useState(0);
    const { lang, toggleLanguage } = useLanguage();
    const { playUiFx } = useAudio();
    const [isStarfieldReady, setIsStarfieldReady] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [logoHover, setLogoHover] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    // Per-letter dissolve effect
    const letterRefs = useRef([]);
    const letterCooldowns = useRef({});

    const spawnPixels = useCallback((el) => {
        const rect = el.getBoundingClientRect();
        const count = 22;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            const size = Math.random() * 3.5 + 1;
            // Mostly upward with some lateral spread
            const spreadAngle = (Math.random() * 260 - 130) * (Math.PI / 180);
            const dist = 25 + Math.random() * 100;
            const tx = Math.sin(spreadAngle) * dist;
            const ty = -(Math.abs(Math.cos(spreadAngle)) * dist + Math.random() * 50);
            const startX = rect.left + Math.random() * rect.width;
            const startY = rect.top + Math.random() * rect.height;
            const delay = Math.random() * 160;
            const dur = 650 + Math.random() * 500;
            const isCyan = Math.random() > 0.4;
            const color = isCyan ? '#22D3EE' : '#ffffff';
            Object.assign(p.style, {
                position: 'fixed',
                left: startX + 'px',
                top: startY + 'px',
                width: size + 'px',
                height: size + 'px',
                background: color,
                boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${isCyan ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.3)'}`,
                pointerEvents: 'none',
                zIndex: '9999',
                opacity: '1',
                transition: `transform ${dur}ms cubic-bezier(0.1, 0.05, 0.25, 1) ${delay}ms, opacity ${Math.round(dur * 0.55)}ms ease ${delay + Math.round(dur * 0.4)}ms`,
            });
            document.body.appendChild(p);
            requestAnimationFrame(() => requestAnimationFrame(() => {
                p.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
                p.style.opacity = '0';
            }));
            setTimeout(() => p.remove(), dur + delay + 120);
        }
    }, []);

    const handleLetterEnter = useCallback((i) => {
        if (letterCooldowns.current[i]) return;
        const el = letterRefs.current[i];
        if (!el) return;
        letterCooldowns.current[i] = true;
        spawnPixels(el);
        // Instant hide
        el.style.transition = 'opacity 0s';
        el.style.animation = 'none';
        el.style.opacity = '0';
        // Fade back in after 1s
        setTimeout(() => {
            const target = letterRefs.current[i];
            if (!target) return;
            target.style.transition = 'none';
            target.style.animation = 'letter-restore 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            setTimeout(() => {
                if (letterRefs.current[i]) {
                    letterRefs.current[i].style.animation = '';
                    letterRefs.current[i].style.opacity = '1';
                    letterRefs.current[i].style.transition = 'opacity 0.3s ease';
                }
                letterCooldowns.current[i] = false;
            }, 820);
        }, 950);
    }, [spawnPixels]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);

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

        const clampMotion = (value) => Math.max(-1, Math.min(1, value));
        const handleDeviceOrientation = (e) => {
            if (window.innerWidth >= 768) return;
            if (typeof e.gamma !== "number" || typeof e.beta !== "number") return;

            mouse.current.x = clampMotion(e.gamma / 30);
            mouse.current.y = clampMotion((e.beta - 45) / 45);
        };

        const requestOrientationPermission = async () => {
            const orientationEvent = window.DeviceOrientationEvent;
            if (!orientationEvent || typeof orientationEvent.requestPermission !== "function") return;

            try {
                const result = await orientationEvent.requestPermission();
                if (result === "granted") {
                    window.addEventListener("deviceorientation", handleDeviceOrientation, true);
                }
            } catch (error) {
                // Permission denied or unavailable; keep touch behavior only.
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        if (window.innerWidth >= 768) window.addEventListener("mousemove", handleMouseMove);
        if (window.innerWidth < 768) {
            if (typeof window.DeviceOrientationEvent !== "undefined" && typeof window.DeviceOrientationEvent.requestPermission === "function") {
                window.addEventListener("touchstart", requestOrientationPermission, { passive: true, once: true });
            } else {
                window.addEventListener("deviceorientation", handleDeviceOrientation, true);
            }
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("deviceorientation", handleDeviceOrientation, true);
            window.removeEventListener("touchstart", requestOrientationPermission);
        };
    }, []);


    const setScene = (sceneIndex) => {
        const targets = [0.0, 0.25, 0.5, 0.75, 1.0];
        const clamped = Math.max(0, Math.min(sceneIndex, targets.length - 1));
        playUiFx("click");
        targetScroll.current = targets[clamped];
        currentScroll.current = targets[clamped];
        setActiveScene(clamped);
    };

    const t_copy = {
        en: {
            intro: "Scroll to explore the lab",
            intro_subtitle: "ECLABS designs and ships thoughtful software with a strong focus on clarity, detail, and long-term product quality.",
            atlasly_desc: "Private travel journal. Mark countries, attach notes, and keep travel memories organized.",
            saatlikayet_desc: "Daily Quran verses, precise prayer times, and Asmaul Husna in a minimal design.",
            novagaia_desc: "Post-human survival shooter currently in development. Short runs, high stakes, and score-chasing are taking shape.",
            novagaia_status: "Early development. Playtest and release details will be shared later.",
            novagaia_helper: "Get development updates by email",
            novagaia_ascend_desc: "Atmospheric tower-building game focused on balance, timing, and flow. Stack higher, protect your rhythm, and climb in Endless or Story Mode.",
            atlasly_badge: "Out Now",
            saatlikayet_badge: "Out Now",
            novagaia_badge: "In Development",
            novagaia_ascend_badge: "Out Now",
            atlasly_primary: "Download on App Store",
            saatlikayet_primary: "Download on App Store",
            novagaia_ascend_primary: "Download on App Store",
            novagaia_action: "EXPRESS INTEREST",
            novagaia_ascend_action: "DOWNLOAD ON APP STORE",
        },
        tr: {
            intro: "Laboratuvarı keşfetmek için kaydırın",
            intro_subtitle: "ECLABS, yalın deneyim, detay hassasiyeti ve uzun vadeli ürün kalitesine odaklanan bir yazılım ürün geliştiricisidir.",
            atlasly_desc: "Özel seyahat günlüğü. Ülkeleri işaretleyin, notlar ekleyin ve anılarınızı düzenleyin.",
            saatlikayet_desc: "Minimalist bir tasarımda günlük ayetler, doğru namaz vakitleri ve Esmaül Hüsna.",
            novagaia_desc: "Geliştirme aşamasındaki post-human hayatta kalma oyunu. Kısa run’lar, yüksek tempo ve rekor odaklı yapı şekilleniyor.",
            novagaia_status: "Erken geliştirme aşamasında. Playtest ve çıkış detayları daha sonra paylaşılacak.",
            novagaia_helper: "Geliştirme güncellemelerini e-postayla alın",
            novagaia_ascend_desc: "Denge, zamanlama ve akış odaklı atmosferik kule kurma oyunu. Sonsuz veya Hikâye Modu'nda daha yükseğe çık, ritmini koru ve yüksel.",
            atlasly_badge: "Yayında",
            saatlikayet_badge: "Yayında",
            novagaia_badge: "Geliştirme Aşamasında",
            novagaia_ascend_badge: "Yayında",
            atlasly_primary: "App Store'dan İndir",
            saatlikayet_primary: "App Store'dan İndir",
            novagaia_ascend_primary: "App Store'dan İndir",
            novagaia_action: "İLGİMİ BİLDİR",
            novagaia_ascend_action: "APP STORE'DAN İNDİR",
        },
    }[lang];

    const sceneAriaLabels = lang === "tr"
        ? [
            "Laboratuvar sahnesine git",
            "Atlasly sahnesine git",
            "SaatlikAyet sahnesine git",
            "Nova Gaia sahnesine git",
            "NovaGaia Ascend sahnesine git",
        ]
        : [
            "Go to lab scene",
            "Go to Atlasly scene",
            "Go to SaatlikAyet scene",
            "Go to Nova Gaia scene",
            "Go to NovaGaia Ascend scene",
        ];

    return (
        <div className="relative w-full h-screen bg-[#000] text-white overflow-hidden font-sans">
            <GlobalStyles />
            <Starfield
                targetScroll={targetScroll}
                currentScroll={currentScroll}
                mouse={mouse}
                onSceneChange={setActiveScene}
                onReady={setIsStarfieldReady}
                isLogoHovered={logoHover}
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
                {/* Mobile: Dot Navigation */}
                <div className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 z-40 pointer-events-auto select-none">
                    <div className="flex flex-col items-center gap-3">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setScene(i)}
                                aria-label={sceneAriaLabels[i]}
                                className="group flex items-center justify-center w-8 h-8"
                            >
                                <span
                                    className={`block rounded-full transition-all duration-300 border border-white/20 bg-white/10 group-hover:bg-white/20 group-hover:border-white/40 ${activeScene === i ? "w-2.5 h-2.5 opacity-100" : "w-2 h-2 opacity-50"}`}
                                />
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 h-24 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
                </div>

                {/* Desktop: Bottom Tab Navigation */}
                <div className="hidden md:flex absolute bottom-20 left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none">
                    <div className="flex items-center gap-0.5 bg-white/[0.04] border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-xl">
                        {[
                            { label: "LAB", textColor: "text-cyan-400", glowColor: "rgba(34,211,238,0.4)" },
                            { label: "ATLASLY", textColor: "text-cyan-400", glowColor: "rgba(34,211,238,0.4)" },
                            { label: "SAATLİKAYET", textColor: "text-amber-400", glowColor: "rgba(245,158,11,0.4)" },
                            { label: "NOVA GAIA", textColor: "text-purple-400", glowColor: "rgba(168,85,247,0.4)" },
                            { label: "ASCEND", textColor: "text-orange-400", glowColor: "rgba(249,115,22,0.4)" },
                        ].map((tab, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setScene(i)}
                                aria-label={sceneAriaLabels[i]}
                                className={`px-3.5 py-1.5 rounded-full text-[9px] font-bold tracking-widest transition-all duration-300 ${activeScene === i ? `${tab.textColor} bg-white/10` : "text-white/25 hover:text-white/60"}`}
                                style={activeScene === i ? { textShadow: `0 0 16px ${tab.glowColor}` } : {}}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <nav className="absolute top-0 z-40 w-full p-5 md:p-8 flex justify-between items-center opacity-40">
                    <div className="text-xs tracking-[0.5em] font-bold uppercase text-cyan-400">ECLABS</div>
                    <div className="flex items-center gap-3 pointer-events-auto">
                        <Link to="/contact" className="text-[10px] tracking-widest font-mono bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:bg-cyan-500 hover:text-black transition-all">
                            {lang === "tr" ? "İLETİŞİM" : "CONTACT"}
                        </Link>
                        <button
                            type="button"
                            onMouseEnter={() => playUiFx("hover")}
                            onClick={() => {
                                playUiFx("click");
                                toggleLanguage();
                            }}
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
                                ? (isMobile ? "translateZ(-400px) rotateY(-30deg) translateX(-20%)" : "translateZ(-800px) rotateY(-45deg) translateX(-50%)")
                                : (isMobile ? "translateZ(-200px) rotateY(15deg) translateX(10%)" : "translateZ(-400px) rotateY(20deg) translateX(30%)"),
                        filter: activeScene === 0 ? "blur(0px)" : "blur(20px)"
                    }}
                >
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-cyan-500 to-transparent mb-8 animate-pulse" />
                    <h1
                        className="text-5xl md:text-[8rem] font-display font-bold tracking-tighter mb-4 text-center select-none opacity-80"
                        onMouseEnter={() => setLogoHover(true)}
                        onMouseLeave={() => setLogoHover(false)}
                        onTouchStart={() => setLogoHover(true)}
                        onTouchEnd={() => setLogoHover(false)}
                        aria-label="ECLABS."
                    >
                        {"ECLABS.".split("").map((char, i) => (
                            <span
                                key={i}
                                ref={el => { letterRefs.current[i] = el; }}
                                onMouseEnter={() => handleLetterEnter(i)}
                                className="eclabs-letter"
                            >
                                {char}
                            </span>
                        ))}
                    </h1>
                    <p className="text-cyan-400 text-[10px] tracking-[0.3em] md:tracking-[0.6em] uppercase animate-pulse text-center px-4 mb-4">{t_copy.intro}</p>
                    <svg className="scroll-chevron text-cyan-400/60" width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L8 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="absolute bottom-24 right-6 flex flex-col items-end gap-3 pointer-events-auto md:bottom-16 md:right-10">
                        {isAboutOpen && (
                            <div className="w-[min(72vw,22rem)] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-right backdrop-blur-xl">
                                <p className="text-[11px] md:text-xs tracking-[0.08em] text-white/55 leading-relaxed">
                                    {t_copy.intro_subtitle}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Scene 1: Atlasly */}
                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center px-6 scene-card ${activeScene === 1 ? "pointer-events-auto" : "pointer-events-none"}`}
                    style={{
                        opacity: activeScene === 1 ? 1 : 0,
                        transform: activeScene === 1
                            ? "translateZ(0) rotateY(0) scale(1)"
                            : activeScene > 1
                                ? (isMobile ? "translateZ(-600px) rotateY(-40deg) translateX(-40%)" : "translateZ(-1200px) rotateY(-70deg) translateX(-120%)")
                                : (isMobile ? "translateZ(-800px) rotateY(40deg) translateX(50%)" : "translateZ(-1800px) rotateY(70deg) translateX(150%)"),
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
                        <div className="flex items-center justify-center">
                            <PrimaryCTA
                                label={t_copy.atlasly_primary}
                                href="https://apps.apple.com/tr/app/atlasly/id6759877369?l=tr"
                            />
                        </div>
                        <a
                            href="https://www.instagram.com/atlaslyapp?igsh=MTBtcjl5cXFuajRkMA%3D%3D&utm_source=qr"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 mt-4 rounded-full border border-cyan-400/15 bg-cyan-400/5 px-3 py-1.5 text-[10px] text-cyan-300/70 transition-colors hover:text-cyan-300 hover:border-cyan-400/35"
                        >
                            <Instagram size={12} />
                            @atlaslyapp
                        </a>
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
                                ? (isMobile ? "translateZ(-600px) rotateY(-40deg) translateX(-40%)" : "translateZ(-1200px) rotateY(-70deg) translateX(-120%)")
                                : (isMobile ? "translateZ(-800px) rotateY(40deg) translateX(50%)" : "translateZ(-1800px) rotateY(70deg) translateX(150%)"),
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
                        <div className="flex items-center justify-center">
                            <PrimaryCTA
                                label={t_copy.saatlikayet_primary}
                                href="https://apps.apple.com/tr/app/saatlikayet/id6759116481?l=tr"
                                theme="amber"
                            />
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                            <a
                                href="https://www.instagram.com/saatlikayetapp?igsh=MWQybGRnZG4xcHlkbQ%3D%3D&utm_source=qr"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/5 px-3 py-1.5 text-[10px] text-amber-300/70 transition-colors hover:text-amber-300 hover:border-amber-400/35"
                            >
                                <Instagram size={12} />
                                @saatlikayetapp
                            </a>
                            <a
                                href="https://x.com/saatlikayet?s=21&t=Rxy-xbcjAe8Io4ETD_kuVA"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-white/65 transition-colors hover:text-white hover:border-white/25"
                            >
                                <span className="text-[11px] font-bold">X</span>
                                @saatlikayet
                            </a>
                        </div>
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
                                ? (isMobile ? "translateZ(-600px) rotateY(-40deg) translateX(-40%)" : "translateZ(-1200px) rotateY(-70deg) translateX(-120%)")
                                : (isMobile ? "translateZ(-800px) rotateY(40deg) translateX(50%)" : "translateZ(-1800px) rotateY(70deg) translateX(150%)"),
                        filter: activeScene === 3 ? "blur(0px)" : "blur(40px)",
                        zIndex: activeScene === 3 ? 20 : 10
                    }}
                >
                    <AppIcon src="/novagaia-icon.png" alt="Nova Gaia" fallbackGradient="from-purple-600 to-indigo-800" glowColor="bg-purple-500" />
                    <div className={`text-center max-w-xs bg-white/[0.03] border border-white/5 p-6 rounded-3xl backdrop-blur-xl ${activeScene === 3 ? "pointer-events-auto" : "pointer-events-none"}`}>
                        <div className="inline-block px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[8px] text-purple-400 font-bold mb-4 uppercase tracking-[0.2em]">{t_copy.novagaia_badge}</div>
                        <h2 className="text-3xl font-display font-bold mb-2 tracking-tighter">Nova Gaia</h2>
                        <p className="text-white/40 text-xs leading-relaxed mt-4">{t_copy.novagaia_desc}</p>
                        <p className="text-white/25 text-[10px] leading-relaxed mb-4 mt-3">{t_copy.novagaia_status}</p>
                        <div className="flex items-center justify-center">
                            <SecondaryCTA href={NOVA_GAIA_NOTIFY} label={t_copy.novagaia_action} />
                        </div>
                        <a
                            href={`mailto:${WAITLIST_EMAIL}?subject=Nova%20Gaia%20Updates`}
                            className="inline-block mt-4 text-[10px] text-purple-300/60 hover:text-purple-300 underline decoration-purple-300/20 underline-offset-4 transition-colors"
                        >
                            {t_copy.novagaia_helper}
                        </a>
                    </div>
                </div>

                {/* Scene 4: NovaGaia: Ascend */}
                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center px-6 scene-card ${activeScene === 4 ? "pointer-events-auto" : "pointer-events-none"}`}
                    style={{
                        opacity: activeScene === 4 ? 1 : 0,
                        transform: activeScene === 4
                            ? "translateZ(0) rotateY(0) scale(1)"
                            : activeScene > 4
                                ? (isMobile ? "translateZ(-600px) rotateY(-40deg) translateX(-40%)" : "translateZ(-1200px) rotateY(-70deg) translateX(-120%)")
                                : (isMobile ? "translateZ(-800px) rotateY(40deg) translateX(50%)" : "translateZ(-1800px) rotateY(70deg) translateX(150%)"),
                        filter: activeScene === 4 ? "blur(0px)" : "blur(40px)",
                        zIndex: activeScene === 4 ? 20 : 10
                    }}
                >
                    <AppIcon src="/novagaia-ascend.png" alt="NovaGaia: Ascend" fallbackGradient="from-orange-600 to-red-800" glowColor="bg-orange-500" />
                    <div className={`text-center max-w-xs bg-white/[0.03] border border-white/5 p-6 rounded-3xl backdrop-blur-xl ${activeScene === 4 ? "pointer-events-auto" : "pointer-events-none"}`}>
                        <div className="inline-block px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[8px] text-emerald-400 font-bold mb-4 uppercase tracking-[0.2em]">{t_copy.novagaia_ascend_badge}</div>
                        <h2 className="text-3xl font-display font-bold mb-2 tracking-tighter">NovaGaia: Ascend</h2>
                        <p className="text-white/40 text-xs leading-relaxed mt-4 mb-4">{t_copy.novagaia_ascend_desc}</p>
                        <Link to="/privacy-novagaia-ascend" className="inline-block mb-6 text-[10px] text-emerald-400/60 hover:text-emerald-400 underline decoration-emerald-400/20 underline-offset-4 transition-colors">
                            {lang === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
                        </Link>
                        <div className="flex items-center justify-center">
                            <PrimaryCTA href={NOVAGAIA_ASCEND_NOTIFY} label={t_copy.novagaia_ascend_action} theme="green" />
                        </div>
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


                <footer className="absolute bottom-0 z-40 w-full p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 opacity-30">
                    <div className="text-[10px] tracking-[0.4em] font-mono text-white/50 pointer-events-auto">© 2026 ECLABS • <a href={`mailto:${WAITLIST_EMAIL}`} className="hover:text-cyan-400 transition-colors">{WAITLIST_EMAIL}</a></div>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[9px] tracking-widest font-bold uppercase pointer-events-auto">
                        <button
                            type="button"
                            onMouseEnter={() => playUiFx("hover")}
                            onClick={() => {
                                playUiFx("click");
                                setIsAboutOpen((current) => !current);
                            }}
                            className="hover:text-cyan-400 transition-colors"
                        >
                            {lang === "tr" ? "HAKKINDA" : "ABOUT"}
                        </button>
                        <Link to="/privacy" className="hover:text-cyan-400 transition-colors">{lang === "tr" ? "GİZLİLİK" : "PRIVACY"}</Link>
                        <Link to="/terms" className="hover:text-cyan-400 transition-colors">{lang === "tr" ? "ŞARTLAR" : "TERMS"}</Link>
                        <Link to="/contact" className="hover:text-cyan-400 transition-colors">{lang === "tr" ? "İLETİŞİM" : "CONTACT"}</Link>
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
