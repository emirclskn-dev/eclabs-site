export const WAITLIST_EMAIL = "support@eclabs.tr";
export const ATLASLY_NOTIFY = `mailto:${WAITLIST_EMAIL}?subject=Atlasly%20Waitlist`;
export const SAATLIKAYET_NOTIFY = `mailto:${WAITLIST_EMAIL}?subject=SaatlikAyet%20Waitlist`;
export const NOVA_GAIA_NOTIFY = `mailto:${WAITLIST_EMAIL}?subject=Nova%20Gaia%20Interest`;
export const NOVAGAIA_ASCEND_NOTIFY = "https://apps.apple.com/tr/app/novagaia-ascend/id6760511659?l=tr";
export const GYMNOVA_TESTFLIGHT = "https://testflight.apple.com/join/xxxxxx"; // Placeholder
export const SPORIO_APPSTORE = "https://apps.apple.com/tr/app/sporio/id6762560027?l=tr";

export const getLang = () => (typeof window !== "undefined" ? localStorage.getItem("eclabs_lang") || "tr" : "tr");
export const setLangPersisted = (lang) => {
    try {
        localStorage.setItem("eclabs_lang", lang);
    } catch (e) {
        // ignore
    }
};
