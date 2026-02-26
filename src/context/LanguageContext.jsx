import React, { createContext, useContext, useState, useEffect } from "react";
import { getLang, setLangPersisted } from "../constants";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => getLang());

    const toggleLanguage = () => {
        const next = lang === "en" ? "tr" : "en";
        setLang(next);
        setLangPersisted(next);
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
