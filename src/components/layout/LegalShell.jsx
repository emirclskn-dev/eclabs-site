import React from "react";
import { Link } from "react-router-dom";
import { WAITLIST_EMAIL } from "../../constants";
import { useLanguage } from "../../context/LanguageContext";

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

function LegalShell({ title, children }) {
    const { lang, toggleLanguage } = useLanguage();

    return (
        <div
            className="relative h-screen overflow-y-auto bg-black text-white"
            style={{ WebkitOverflowScrolling: "touch" }}
        >
            <GlobalStyles />
            <div className="fixed inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
            <div className="relative z-10 max-w-3xl mx-auto px-6 py-14">
                <div className="flex items-center justify-between mb-10">
                    <Link to="/" className="text-xs tracking-[0.5em] font-bold uppercase text-cyan-400 opacity-70 hover:opacity-100">
                        ECLABS
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link to="/contact" className="text-[10px] uppercase tracking-widest font-mono bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:bg-cyan-500 hover:text-black transition-all">
                            {lang === "tr" ? "İLETİŞİM" : "CONTACT"}
                        </Link>
                        <button
                            onClick={toggleLanguage}
                            className="text-[10px] uppercase tracking-widest font-mono bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:bg-cyan-500 hover:text-black transition-all"
                        >
                            {lang === "en" ? "TR" : "EN"}
                        </button>
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{title}</h1>
                <div className="mt-6 bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
                    <div className="text-sm text-white/70 leading-relaxed">{children}</div>
                </div>

                <div className="mt-10 flex gap-6 text-[10px] tracking-widest uppercase font-bold opacity-60">
                    <Link className="hover:opacity-100" to="/privacy">{lang === "tr" ? "Gizlilik" : "Privacy"}</Link>
                    <Link className="hover:opacity-100" to="/terms">{lang === "tr" ? "Şartlar" : "Terms"}</Link>
                    <Link className="hover:opacity-100" to="/contact">{lang === "tr" ? "İletişim" : "Contact"}</Link>
                </div>
            </div>
        </div>
    );
}

export default LegalShell;
export { WAITLIST_EMAIL, GlobalStyles };
