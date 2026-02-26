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
