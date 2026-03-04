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

export const PrimaryCTA = ({ href, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300"
    >
        {label}
    </a>
);
