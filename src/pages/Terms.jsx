import React from "react";
import LegalShell, { WAITLIST_EMAIL, getLang } from "../components/layout/LegalShell";

function TermsPage() {
    const lang = getLang();

    if (lang === "en") {
        return (
            <LegalShell title="Terms and Conditions">
                <p>This website (ECLABS) is for informational and promotional purposes. By using the site, you agree to the terms below.</p>
                <h2 className="mt-6 text-white font-bold tracking-tight">Use</h2>
                <ul className="mt-3 list-disc pl-5 space-y-2">
                    <li>No purchases or account registrations are performed on this site.</li>
                    <li>Content is provided for general information.</li>
                    <li>You may not misuse the site (attacks, spam, etc.).</li>
                </ul>
                <p className="mt-6">Contact: <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${WAITLIST_EMAIL}`}>{WAITLIST_EMAIL}</a></p>
                <p className="mt-2 text-white/40 text-xs">Last updated: February 26, 2026</p>
            </LegalShell>
        );
    }

    return (
        <LegalShell title="Şartlar ve Koşullar">
            <p>Bu web sitesi (ECLABS) bilgilendirme ve tanıtım amaçlıdır. Siteyi kullanarak aşağıdaki şartları kabul etmiş sayılırsın.</p>
            <h2 className="mt-6 text-white font-bold tracking-tight">Kullanım</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2">
                <li>Bu site üzerinden satın alma/üyelik işlemi yapılmaz.</li>
                <li>İçerikler genel bilgilendirme amaçlıdır.</li>
                <li>Siteyi kötüye kullanacak şekilde (saldırı, spam vb.) kullanamazsın.</li>
            </ul>
            <p className="mt-6">İletişim: <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${WAITLIST_EMAIL}`}>{WAITLIST_EMAIL}</a></p>
            <p className="mt-2 text-white/40 text-xs">Son güncelleme: 26 Şubat 2026</p>
        </LegalShell>
    );
}

export default TermsPage;