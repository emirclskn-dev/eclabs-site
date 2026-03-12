import React from "react";

export const DisabledCTA = ({ label }) => (
    <button
        type="button"
        aria-disabled="true"
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 text-white/70 text-[10px] font-bold rounded-full uppercase tracking-widest cursor-not-allowed border border-white/10"
        onClick={(e) => e.preventDefault()}
    >
        {label}
    </button>
);

export const SecondaryCTA = ({ href, label }) => (
    <a
        href={href}
        className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition-colors"
    >
        {label}
    </a>
);

export const PrimaryCTA = ({ href, label, theme = "cyan" }) => {
    const themeStyles = {
        cyan: "bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]",
        amber: "bg-amber-500 hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]",
        purple: "bg-purple-500 hover:bg-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",
        green: "bg-emerald-500 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 ${themeStyles[theme]}`}
        >
            {label}
        </a>
    );
};
