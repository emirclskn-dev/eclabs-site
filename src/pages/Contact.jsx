import React from "react";
import LegalShell, { WAITLIST_EMAIL, getLang } from "../components/layout/LegalShell";

function ContactPage() {
    const lang = getLang();
    return (
        <LegalShell title={lang === "tr" ? "İletişim" : "Contact"}>
            <p>{lang === "tr" ? "ECLABS ile iletişime geçmek için aşağıdaki butonu kullanabilirsin." : "Use the button below to contact ECLABS."}</p>
            <div className="mt-4 space-y-3">
                <a className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-black hover:bg-cyan-500 hover:text-black transition-all text-[11px] font-bold uppercase tracking-[0.25em]" href={`mailto:${WAITLIST_EMAIL}?subject=ECLABS%20Contact`}>
                    {WAITLIST_EMAIL}
                </a>
                <p className="text-white/50 text-xs">{lang === "tr" ? "(Bu buton varsayılan e-posta uygulamanı açar.)" : "(This button opens your default email app.)"}</p>
            </div>
        </LegalShell>
    );
}

export default ContactPage;