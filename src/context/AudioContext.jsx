import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const AudioContextState = createContext(null);

export function AudioProvider({ children }) {
    const [enabled] = useState(true);
    const webAudioRef = useRef(null);

    const ensureAudioContext = useCallback(() => {
        if (typeof window === "undefined") return null;
        if (!webAudioRef.current) {
            const ContextCtor = window.AudioContext || window.webkitAudioContext;
            if (!ContextCtor) return null;
            webAudioRef.current = new ContextCtor();
        }
        return webAudioRef.current;
    }, []);

    const playUiFx = useCallback(async (variant = "click") => {
        if (!enabled || typeof window === "undefined") return;

        const context = ensureAudioContext();
        if (!context) return;

        if (context.state === "suspended") {
            try {
                await context.resume();
            } catch (error) {
                return;
            }
        }

        const now = context.currentTime;
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const filter = context.createBiquadFilter();

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(variant === "hover" ? 2600 : 2100, now);

        oscillator.type = variant === "hover" ? "triangle" : "sine";
        oscillator.frequency.setValueAtTime(variant === "hover" ? 720 : 320, now);
        oscillator.frequency.exponentialRampToValueAtTime(variant === "hover" ? 860 : 620, now + (variant === "hover" ? 0.04 : 0.08));

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(variant === "hover" ? 0.03 : 0.07, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + (variant === "hover" ? 0.09 : 0.18));

        oscillator.connect(filter);
        filter.connect(gain);
        gain.connect(context.destination);

        oscillator.start(now);
        oscillator.stop(now + (variant === "hover" ? 0.08 : 0.18));
    }, [enabled, ensureAudioContext]);

    useEffect(() => () => {
        if (webAudioRef.current?.state !== "closed") {
            webAudioRef.current?.close();
        }
    }, []);

    const value = useMemo(() => ({
        enabled,
        playUiFx,
    }), [enabled, playUiFx]);

    return (
        <AudioContextState.Provider value={value}>
            {children}
        </AudioContextState.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContextState);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
}
