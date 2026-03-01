import React from "react";
import LegalShell, { WAITLIST_EMAIL } from "../components/layout/LegalShell";
import { useLanguage } from "../context/LanguageContext";

function ContactPage() {
    const { lang } = useLanguage();

    const copy = lang === "tr"
        ? {
            title: "İletişim",
            intro: "ECLABS ile ürünler, iş birlikleri, geri bildirimler veya genel sorular için iletişime geçebilirsiniz.",
            primary: "E-posta Gönder",
            note: "Bu buton varsayılan e-posta uygulamanızı açar.",
            response: "Genellikle 2-5 iş günü içinde dönüş yaparız.",
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
        }
        : {
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
        };

    return (
        <LegalShell title={copy.title}>
            <div className="space-y-8">
                <div>
                    <p>{copy.intro}</p>
                    <p className="mt-3 text-white/50 text-xs">{copy.response}</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-400/80 font-bold">ECLABS</div>
                            <div className="mt-2 text-lg font-semibold text-white">{WAITLIST_EMAIL}</div>
                        </div>
                        <a
                            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-black hover:bg-cyan-500 hover:text-black transition-all text-[11px] font-bold uppercase tracking-[0.25em]"
                            href={`mailto:${WAITLIST_EMAIL}?subject=ECLABS%20Contact`}
                        >
                            {copy.primary}
                        </a>
                    </div>
                    <p className="mt-3 text-white/50 text-xs">{copy.note}</p>
                    <p className="mt-2 text-white/60 text-xs">
                        {copy.website}: <a className="text-cyan-300 hover:text-cyan-200" href="https://eclabs.tr" target="_blank" rel="noreferrer">eclabs.tr</a>
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {copy.cards.map((card) => (
                        <div key={card.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                            <h2 className="text-white font-bold tracking-tight">{card.title}</h2>
                            <p className="mt-2 text-sm text-white/70 leading-relaxed">{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </LegalShell>
    );
}

export default ContactPage;
