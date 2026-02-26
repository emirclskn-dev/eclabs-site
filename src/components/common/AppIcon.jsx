import React, { useState } from "react";

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

export default AppIcon;
