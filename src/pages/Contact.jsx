import React from "react";
import LegalShell, { WAITLIST_EMAIL } from "../components/layout/LegalShell";
import { useLanguage } from "../context/LanguageContext";

import { Mail, ArrowUpRight } from "lucide-react";

const TRANSLATIONS = {
    tr: {
        title: "İletişim",
        intro: "ECLABS ile ürünler, iş birlikleri, geri bildirimler veya genel sorular için iletişime geçebilirsiniz.",
        primary: "E-posta Gönder",
        note: "Bu buton varsayılan e-posta uygulamanızı açar.",
        response: "Genellikle 2-5 iş günü içinde dönüş yapılır.",
        website: "Web sitesi",
        cards: [
            {
                title: "Destek",
                text: "Atlasly, SaatlikAyet veya diğer ürünlerle ilgili hata bildirimi, kullanım sorusu ve teknik destek talepleri için yazabilirsiniz.",
            },
            {
                title: "Geri Bildirim",
                text: "Ürün deneyimi, özellik önerileri ve iyileştirme fikirleri bizim için değerlidir.",
            },
            {
                title: "İş Birliği",
                text: "Marka ortaklıkları, yaratıcı projeler ve potansiyel iş birlikleri için doğrudan ulaşabilirsiniz.",
            },
            {
                title: "Genel İletişim",
                text: "Basın, marka, yayın takvimi veya ECLABS hakkında genel sorular için bu kanalı kullanabilirsiniz.",
            },
        ],
    },
    en: {
        title: "Contact",
        intro: "You can contact ECLABS for product questions, partnerships, feedback, or general inquiries.",
        primary: "Send Email",
        note: "This button opens your default email app.",
        response: "We typically respond within 2-5 business days.",
        website: "Website",
        cards: [
            {
                title: "Support",
                text: "Reach out for bug reports, usage questions, or technical support related to Atlasly, SaatlikAyet, or other products.",
            },
            {
                title: "Feedback",
                text: "We value product feedback, feature suggestions, and ideas that can improve the experience.",
            },
            {
                title: "Partnerships",
                text: "You can contact us directly for brand collaborations, creative projects, and potential partnerships.",
            },
            {
                title: "General Inquiries",
                text: "Use this channel for press, brand, release timeline, or general questions about ECLABS.",
            },
        ],
    }
};

function ContactPage() {
    const { lang } = useLanguage();
    const copy = TRANSLATIONS[lang] || TRANSLATIONS.en;

    return (
        <LegalShell title={copy.title}>
            <div className="space-y-8">
                <div>
                    <p>{copy.intro}</p>
                    <p className="mt-3 text-white/50 text-xs">{copy.response}</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6 backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10">
                        <div>
                            <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-400/80 font-bold">ECLABS</div>
                            <div className="mt-2 text-lg font-semibold text-white tracking-wide">{WAITLIST_EMAIL}</div>
                        </div>
                        <a
                            className="inline-flex items-center gap-2 justify-center px-6 py-3.5 rounded-2xl bg-white text-black hover:bg-cyan-400 transition-all duration-300 text-[11px] font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-105"
                            href={`mailto:${WAITLIST_EMAIL}?subject=ECLABS%20Contact`}
                        >
                            <Mail size={14} className="opacity-80" />
                            {copy.primary}
                        </a>
                    </div>
                    <p className="mt-4 text-white/50 text-xs relative z-10">{copy.note}</p>
                    <p className="mt-2 text-white/60 text-xs relative z-10 flex items-center gap-1">
                        {copy.website}: <a className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-0.5" href="https://eclabs.tr" target="_blank" rel="noreferrer">
                            eclabs.tr <ArrowUpRight size={10} className="opacity-60" />
                        </a>
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {copy.cards.map((card) => (
                        <div key={card.title} className="group rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-cyan-500/30 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(34,211,238,0.1)]">
                            <h2 className="text-white font-bold tracking-tight flex items-center gap-2 group-hover:text-cyan-300 transition-colors">
                                {card.title}
                            </h2>
                            <p className="mt-3 text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </LegalShell>
    );
}

export default ContactPage;
