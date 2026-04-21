import React from "react";
import { Link } from "react-router-dom";
import LegalShell, { WAITLIST_EMAIL } from "../components/layout/LegalShell";
import { useLanguage } from "../context/LanguageContext";
import { Calendar, ArrowUpRight, Mail } from "lucide-react";

const TRANSLATIONS = {
    tr: {
        title: "Gizlilik Politikası",
        updated: "Son güncelleme: 21 Nisan 2026",
        intro: "Bu web sitesi (ECLABS) ürün tanıtımı ve iletişim amaçlı bir 'landing' sayfasıdır. Bu sitede kullanıcı hesabı oluşturulmaz ve doğrudan profil/üyelik bazlı kişisel veri işleme yapılmaz.",
        sections: [
            {
                title: "Toplanan Veriler",
                items: [
                    { label: "İletişim e-postası:", text: "\"Beni Bilgilendir\" ve \"Email\" butonları cihazındaki e-posta uygulamasını açar." },
                    { label: "Teknik günlükler (log):", text: "Güvenlik ve hata ayıklama amacıyla IP adresi gibi sınırlı teknik veriler kaydedilebilir." },
                ],
            },
            {
                title: "Uygulamalarımıza Özel Politikalar",
                links: [
                    { label: "Atlasly Gizlilik Politikası", to: "/privacy-atlasly" },
                    { label: "SaatlikAyet Gizlilik Politikası", to: "/privacy-saatlikayet" },
                    { label: "NovaGaia: Ascend Gizlilik Politikası", to: "/privacy-novagaia-ascend" },
                    { label: "GymNova Gizlilik Politikası", to: "/privacy-gymnova" },
                ],
            },
            {
                title: "Çerezler",
                text: "Bu sitede zorunlu olmayan çerezler kullanılmayabilir.",
            },
        ],
        contact: "İletişim",
    },
    en: {
        title: "Privacy Policy",
        updated: "Last updated: April 21, 2026",
        intro: "This website (ECLABS) is a landing page for product information and contact purposes. We do not provide user accounts on this site and we do not process profile-based personal data through a login system.",
        sections: [
            {
                title: "Data We Collect",
                items: [
                    { label: "Contact email:", text: "\"Notify Me\" and \"Email\" buttons open your email app via a mailto link." },
                    { label: "Technical logs:", text: "Our hosting provider may automatically record limited technical data for security and debugging purposes." },
                    { label: "Analytics (optional):", text: "Aggregated traffic and performance metrics may be collected." },
                ],
            },
            {
                title: "App-Specific Policies",
                links: [
                    { label: "Atlasly Privacy Policy", to: "/privacy-atlasly" },
                    { label: "SaatlikAyet Privacy Policy", to: "/privacy-saatlikayet" },
                    { label: "NovaGaia: Ascend Privacy Policy", to: "/privacy-novagaia-ascend" },
                    { label: "GymNova Privacy Policy", to: "/privacy-gymnova" },
                ],
            },
            {
                title: "Cookies",
                text: "We may not use non-essential cookies on this site.",
            },
            {
                title: "Purpose and Legal Basis",
                items: [
                    { text: "Responding to contact requests (legitimate interests)." },
                    { text: "Site security and debugging (legitimate interests)." },
                ],
            },
        ],
        contact: "Contact",
    },
};

function PrivacyPage() {
    const { lang } = useLanguage();
    const copy = TRANSLATIONS[lang] || TRANSLATIONS.en;

    return (
        <LegalShell title={copy.title}>
            <div className="max-w-2xl space-y-8">
                {/* Date badge */}
                <div className="inline-flex items-center gap-2 text-white/40 text-xs">
                    <Calendar size={12} className="opacity-60" />
                    {copy.updated}
                </div>

                <p className="leading-relaxed text-white/80">{copy.intro}</p>

                {copy.sections.map((section) => (
                    <section key={section.title} className="space-y-3">
                        <h2 className="text-white font-bold tracking-tight border-l-2 border-cyan-500 pl-3">
                            {section.title}
                        </h2>

                        {section.text && (
                            <p className="leading-relaxed pl-3 text-white/70">{section.text}</p>
                        )}

                        {section.items && (
                            <ul className="space-y-2 pl-3">
                                {section.items.map((item, i) => (
                                    <li key={i} className="flex gap-2 text-white/70 leading-relaxed">
                                        {item.label && (
                                            <span className="text-white/90 font-semibold shrink-0">{item.label}</span>
                                        )}
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {section.links && (
                            <ul className="space-y-2 pl-3">
                                {section.links.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                                        >
                                            {link.label}
                                            <ArrowUpRight size={12} className="opacity-60" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}

                <p className="pt-2 flex items-center gap-2 text-white/70">
                    {copy.contact}:{" "}
                    <a
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                        href={`mailto:${WAITLIST_EMAIL}`}
                    >
                        <Mail size={12} className="opacity-60" />
                        {WAITLIST_EMAIL}
                    </a>
                </p>
            </div>
        </LegalShell>
    );
}

export default PrivacyPage;