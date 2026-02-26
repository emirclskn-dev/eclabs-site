export const WAITLIST_EMAIL = "support@eclabs.tr";
export const ATLASLY_NOTIFY = `mailto:${WAITLIST_EMAIL}?subject=Atlasly%20Waitlist`;
export const SAATLIKAYET_NOTIFY = `mailto:${WAITLIST_EMAIL}?subject=SaatlikAyet%20Waitlist`;
export const NOVA_GAIA_NOTIFY = `mailto:${WAITLIST_EMAIL}?subject=Nova%20Gaia%20Interest`;

export const getLang = () => (typeof window !== "undefined" ? localStorage.getItem("eclabs_lang") || "tr" : "tr");
export const setLangPersisted = (lang) => {
    try {
        localStorage.setItem("eclabs_lang", lang);
    } catch (e) {
        // ignore
    }
};
