import React from "react";
import { Link } from "react-router-dom";
import LegalShell, { WAITLIST_EMAIL } from "../components/layout/LegalShell";
import { useLanguage } from "../context/LanguageContext";
import { Calendar, Mail } from "lucide-react";

const TRANSLATIONS = {
    tr: {
        title: "Şartlar ve Koşullar",
        updated: "Son güncelleme: 1 Mart 2026 · Yürürlük: 1 Mart 2026",
        intro: "Bu Şartlar ve Koşullar, ECLABS web sitesini ve ilgili ürün sayfalarını kullanımınızı düzenler. Bu siteye erişerek veya siteyi kullanarak bu şartları kabul etmiş olursunuz.",
        sections: [
            {
                title: "1. Sitenin Kullanımı",
                text: "Bu site bilgilendirme, tanıtım ve iletişim amaçlarıyla sunulmaktadır. Siteyi yalnızca yürürlükteki hukuka ve bu şartlara uygun şekilde kullanabilirsiniz.",
                items: [
                    "Bu web sitesi üzerinden, açıkça belirtilmedikçe, kullanıcı hesabı oluşturma veya doğrudan satın alma işlemi gerçekleştirilmez.",
                    "Site içeriği, ECLABS ve ürünleri hakkında genel bilgi sağlamak amacıyla sunulur.",
                    "Siteyi bozacak, zarar verecek veya siteye ya da ilişkili sistemlere yetkisiz erişim sağlamaya çalışacak şekilde kullanamazsınız.",
                ],
            },
            {
                title: "2. Ürün Bilgileri",
                text: "Bu sitede geliştirme aşamasında olan, incelemede bulunan, test edilen veya henüz kamuya açık olmayan ürünlere yer verilebilir.",
                items: [
                    "Ürün açıklamaları, özellikler, görseller ve erişilebilirlik durumu herhangi bir zamanda önceden bildirim yapılmaksızın değişebilir.",
                    "\"Geliştirme Aşamasında\", \"Yakında\" veya benzeri ifadeler, belirli bir tarihte yayın yapılacağına dair bağlayıcı bir taahhüt oluşturmaz.",
                    "ECLABS, herhangi bir ürünü, özelliği veya yayın planını kendi takdirine bağlı olarak değiştirebilir, askıya alabilir, durdurabilir veya erteleyebilir.",
                ],
            },
            {
                title: "3. Fikri Mülkiyet",
                text: "Aksi belirtilmedikçe, bu sitede yer alan ECLABS adı, logolar, ürün adları, metinler, yerleşim, görseller ve tasarım unsurları ECLABS'a aittir veya ECLABS tarafından lisanslı olarak kullanılmaktadır.",
                items: [
                    "Site içeriğini önceden yazılı izin almadan kopyalayamaz, çoğaltamaz, yeniden yayımlayamaz, dağıtamaz, değiştiremez veya ticari olarak kullanamazsınız.",
                    "Bu sitede yer alan hiçbir içerik, siteyi kişisel olarak görüntülemek için gerekli olan kullanım dışında herhangi bir lisans veya hak vermez.",
                ],
            },
            {
                title: "4. Üçüncü Taraf Platformlar ve Bağlantılar",
                text: "Bu site, uygulama mağazaları, harici web siteleri veya e-posta uygulamaları dahil olmak üzere üçüncü taraf hizmetlere ya da platformlara bağlantılar içerebilir.",
                items: [
                    "Üçüncü taraf hizmetleri kullanmanız, ilgili hizmetlerin kendi şartlarına, gizlilik politikalarına ve kurallarına tabidir.",
                    "ECLABS, üçüncü taraf hizmetlerin içeriğinden, erişilebilirliğinden veya uygulamalarından sorumlu değildir.",
                    "Apple App Store, TestFlight veya diğer platformlara yapılan referanslar, bu platformların ECLABS tarafından kontrol edildiği anlamına gelmez.",
                ],
            },
            {
                title: "5. Garanti Reddi",
                text: "Site ve içeriği \"olduğu gibi\" ve \"mevcut olduğu ölçüde\" sunulmaktadır.",
                items: [
                    "ECLABS, sitenin kesintisiz erişilebilir olacağını, hatasız çalışacağını veya site içeriğinin tamamen doğru olacağını garanti etmez.",
                    "Hukukun izin verdiği en geniş ölçüde, ECLABS ticari elverişlilik, belirli bir amaca uygunluk ve ihlal etmeme dahil olmak üzere tüm garantileri reddeder.",
                    "Sitede yer alan bilgiler, ürün çıkış tarihleri, özellik setleri, uyumluluk veya performans hakkında garanti olarak yorumlanmamalıdır.",
                ],
            },
            {
                title: "6. Sorumluluğun Sınırlandırılması",
                text: "Yürürlükteki hukukun izin verdiği en geniş ölçüde, ECLABS; siteyi kullanımınızdan veya kullanamamanızdan kaynaklanan dolaylı, arızi, özel, sonuçsal veya cezai zararlardan sorumlu tutulamaz.",
                extra: "Buna, veri kaybı, kesinti, iş fırsatı kaybı veya sitede yer alan ürün bilgilerine güvenilmesi nedeniyle doğan zararlar da dahildir.",
            },
            {
                title: "7. Gizlilik",
                linkSection: true,
                tr: true,
            },
            {
                title: "8. Bu Şartlardaki Değişiklikler",
                text: "ECLABS, bu Şartlar ve Koşullar'ı herhangi bir zamanda güncelleyebilir. Güncellenmiş sürüm, yeni \"Son güncelleme\" tarihiyle bu sayfada yayımlanır. Değişiklikler yayımlandıktan sonra siteyi kullanmaya devam etmeniz, güncellenmiş şartları kabul ettiğiniz anlamına gelir.",
            },
            {
                title: "9. Uygulanacak Hukuk",
                text: "Bu şartlar, kanunlar ihtilafı kuralları dikkate alınmaksızın Türkiye Cumhuriyeti hukukuna tabi olacak ve buna göre yorumlanacaktır.",
            },
            {
                title: "10. İletişim",
                contact: true,
                contactText: "Bu şartlar hakkında sorularınız varsa ECLABS ile iletişime geçebilirsiniz:",
            },
        ],
    },
    en: {
        title: "Terms and Conditions",
        updated: "Last updated: March 1, 2026 · Effective: March 1, 2026",
        intro: "These Terms and Conditions govern your use of the ECLABS website and related product pages. By accessing or using this site, you agree to these terms.",
        sections: [
            {
                title: "1. Use of the Site",
                text: "This site is provided for informational, promotional, and contact purposes. You may use it only in compliance with applicable law and these terms.",
                items: [
                    "No user account registration or direct purchase is completed on this website unless explicitly stated.",
                    "Site content is provided for general information about ECLABS and its products.",
                    "You may not use the site in a way that disrupts, harms, or attempts to gain unauthorized access to the site or related systems.",
                ],
            },
            {
                title: "2. Product Information",
                text: "The site may reference products that are in development, under review, in testing, or not yet publicly available.",
                items: [
                    "Product descriptions, features, visuals, and availability may change at any time without notice.",
                    "Statements such as \"In Development,\" \"Coming Soon,\" or similar labels do not constitute a binding commitment to release on any specific date.",
                    "ECLABS may modify, suspend, discontinue, or delay any product, feature, or release plan at its discretion.",
                ],
            },
            {
                title: "3. Intellectual Property",
                text: "Unless otherwise stated, all content on this site, including the ECLABS name, logos, product names, text, layout, visuals, and design elements, is owned by or licensed to ECLABS.",
                items: [
                    "You may not copy, reproduce, republish, distribute, modify, or commercially exploit site content without prior written permission.",
                    "Nothing on this site grants any license or right to use ECLABS intellectual property except as necessary for ordinary personal viewing of the site.",
                ],
            },
            {
                title: "4. Third-Party Platforms and Links",
                text: "This site may link to third-party services or platforms, including app marketplaces, external websites, or email applications.",
                items: [
                    "Your use of third-party services is governed by their own terms, privacy policies, and rules.",
                    "ECLABS is not responsible for the content, availability, or practices of third-party services.",
                    "References to Apple App Store, TestFlight, or other platforms do not mean ECLABS controls those platforms.",
                ],
            },
            {
                title: "5. Disclaimer",
                text: "The site and its content are provided on an \"as is\" and \"as available\" basis.",
                items: [
                    "ECLABS does not guarantee uninterrupted availability, error-free operation, or complete accuracy of site content.",
                    "To the fullest extent permitted by law, ECLABS disclaims warranties of merchantability, fitness for a particular purpose, and non-infringement.",
                    "Information on the site should not be interpreted as a guarantee regarding product release dates, feature sets, compatibility, or performance.",
                ],
            },
            {
                title: "6. Limitation of Liability",
                text: "To the fullest extent permitted by applicable law, ECLABS shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of, or inability to use, the site.",
                extra: "This includes, without limitation, loss of data, interruption, loss of business opportunity, or reliance on product information displayed on the site.",
            },
            {
                title: "7. Privacy",
                linkSection: true,
                tr: false,
            },
            {
                title: "8. Changes to These Terms",
                text: "ECLABS may update these Terms and Conditions at any time. The revised version will be posted on this page with an updated \"Last updated\" date. Continued use of the site after changes are posted constitutes acceptance of the revised terms.",
            },
            {
                title: "9. Governing Law",
                text: "These terms shall be governed by and interpreted in accordance with the laws of the Republic of Turkiye, without regard to conflict of law principles.",
            },
            {
                title: "10. Contact",
                contact: true,
                contactText: "If you have questions about these terms, you may contact ECLABS at:",
            },
        ],
    },
};

function TermsPage() {
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

                        {section.extra && (
                            <p className="leading-relaxed pl-3 text-white/60 text-sm">{section.extra}</p>
                        )}

                        {section.items && (
                            <ul className="space-y-2 pl-3">
                                {section.items.map((item, i) => (
                                    <li key={i} className="flex gap-2 text-white/60 leading-relaxed text-[0.9rem]">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-500/60 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {section.linkSection && (
                            <p className="pl-3 leading-relaxed text-white/70">
                                {section.tr
                                    ? <>Siteyi kullanımınız ayrıca <Link to="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2">Gizlilik Politikamıza</Link> tabidir. Uygulamalara özel ek gizlilik koşulları da ilgili ürünler için geçerli olabilir.</>
                                    : <>Your use of the site is also subject to our <Link to="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2">Privacy Policy</Link>. App-specific privacy terms may also apply to individual products.</>
                                }
                            </p>
                        )}

                        {section.contact && (
                            <div className="pl-3 space-y-2">
                                <p className="text-white/70">{section.contactText}</p>
                                <a
                                    href={`mailto:${WAITLIST_EMAIL}`}
                                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                                >
                                    <Mail size={13} className="opacity-70" />
                                    {WAITLIST_EMAIL}
                                </a>
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </LegalShell>
    );
}

export default TermsPage;
