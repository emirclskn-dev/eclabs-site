import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const BACKGROUND_TRACK = "/The_Weight_of_Light.mp3";

const AudioContextState = createContext(null);

export function AudioProvider({ children }) {
    const [enabled] = useState(true);

    const webAudioRef = useRef(null);
    const backgroundAudioRef = useRef(null);
    const hasStartedRef = useRef(false);
    const manuallyStoppedRef = useRef(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const ensureAudioContext = useCallback(() => {
        if (typeof window === "undefined") return null;
        if (!webAudioRef.current) {
            const ContextCtor = window.AudioContext || window.webkitAudioContext;
            if (!ContextCtor) return null;
            webAudioRef.current = new ContextCtor();
        }
        return webAudioRef.current;
    }, []);

    const ensureBackgroundAudio = useCallback(() => {
        if (typeof window === "undefined") return null;
        if (!backgroundAudioRef.current) {
            const audio = new Audio(BACKGROUND_TRACK);
            audio.loop = true;
            audio.preload = "auto";
            audio.volume = 0.22;
            backgroundAudioRef.current = audio;
        }
        return backgroundAudioRef.current;
    }, []);

    const startBackgroundMusic = useCallback(async (force = false) => {
        if (!enabled || typeof window === "undefined") return;
        if (manuallyStoppedRef.current && !force) return;

        const context = ensureAudioContext();
        if (context?.state === "suspended") {
            try {
                await context.resume();
            } catch (error) {
                return;
            }
        }

        const audio = ensureBackgroundAudio();
        if (!audio) return;

        try {
            await audio.play();
            hasStartedRef.current = true;
            manuallyStoppedRef.current = false;
            setIsPlaying(true);
        } catch (error) {
            // Browser blocked autoplay until a later interaction.
        }
    }, [enabled, ensureAudioContext, ensureBackgroundAudio]);

    const stopBackgroundMusic = useCallback(() => {
        const audio = backgroundAudioRef.current;
        if (!audio) return;
        audio.pause();
        audio.currentTime = 0;
        hasStartedRef.current = false;
        manuallyStoppedRef.current = true;
        setIsPlaying(false);
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

    useEffect(() => {
        if (typeof window === "undefined") return undefined;

        const unlockAudio = () => {
            if (manuallyStoppedRef.current) return;
            startBackgroundMusic();
        };

        window.addEventListener("pointerdown", unlockAudio, { passive: true });
        window.addEventListener("keydown", unlockAudio);
        window.addEventListener("touchstart", unlockAudio, { passive: true });

        return () => {
            window.removeEventListener("pointerdown", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
            window.removeEventListener("touchstart", unlockAudio);
        };
    }, [startBackgroundMusic]);

    useEffect(() => {
        if (!enabled) {
            stopBackgroundMusic();
            return;
        }

        if (hasStartedRef.current && !manuallyStoppedRef.current) {
            startBackgroundMusic();
        }
    }, [enabled, startBackgroundMusic, stopBackgroundMusic]);

    useEffect(() => () => {
        stopBackgroundMusic();
        if (webAudioRef.current?.state !== "closed") {
            webAudioRef.current?.close();
        }
    }, [stopBackgroundMusic]);

    const value = useMemo(() => ({
        enabled,
        isPlaying,
        playUiFx,
        startBackgroundMusic,
        stopBackgroundMusic,
    }), [enabled, isPlaying, playUiFx, startBackgroundMusic, stopBackgroundMusic]);

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
