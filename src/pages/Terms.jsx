import React from "react";
import { Link } from "react-router-dom";
import LegalShell, { WAITLIST_EMAIL } from "../components/layout/LegalShell";
import { useLanguage } from "../context/LanguageContext";

function TermsPage() {
    const { lang } = useLanguage();

    if (lang === "en") {
        return (
            <LegalShell title="Terms and Conditions">
                <div className="space-y-6">
                    <p className="text-white/40 text-xs">
                        Last updated: March 1, 2026<br />
                        Effective date: March 1, 2026
                    </p>

                    <p>These Terms and Conditions govern your use of the ECLABS website and related product pages. By accessing or using this site, you agree to these terms.</p>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">1. Use of the Site</h2>
                        <p>This site is provided for informational, promotional, and contact purposes. You may use it only in compliance with applicable law and these terms.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>No user account registration or direct purchase is completed on this website unless explicitly stated.</li>
                            <li>Site content is provided for general information about ECLABS and its products.</li>
                            <li>You may not use the site in a way that disrupts, harms, or attempts to gain unauthorized access to the site or related systems.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">2. Product Information</h2>
                        <p>The site may reference products that are in development, under review, in testing, or not yet publicly available.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Product descriptions, features, visuals, and availability may change at any time without notice.</li>
                            <li>Statements such as &quot;In Development,&quot; &quot;Coming Soon,&quot; or similar labels do not constitute a binding commitment to release on any specific date.</li>
                            <li>ECLABS may modify, suspend, discontinue, or delay any product, feature, or release plan at its discretion.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">3. Intellectual Property</h2>
                        <p>Unless otherwise stated, all content on this site, including the ECLABS name, logos, product names, text, layout, visuals, and design elements, is owned by or licensed to ECLABS and protected under applicable intellectual property laws.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>You may not copy, reproduce, republish, distribute, modify, or commercially exploit site content without prior written permission.</li>
                            <li>Nothing on this site grants any license or right to use ECLABS intellectual property except as necessary for ordinary personal viewing of the site.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">4. Third-Party Platforms and Links</h2>
                        <p>This site may link to third-party services or platforms, including app marketplaces, external websites, or email applications.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Your use of third-party services is governed by their own terms, privacy policies, and rules.</li>
                            <li>ECLABS is not responsible for the content, availability, or practices of third-party services.</li>
                            <li>References to Apple App Store, TestFlight, or other platforms do not mean ECLABS controls those platforms.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">5. Disclaimer</h2>
                        <p>The site and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>ECLABS does not guarantee uninterrupted availability, error-free operation, or complete accuracy of site content.</li>
                            <li>To the fullest extent permitted by law, ECLABS disclaims warranties of merchantability, fitness for a particular purpose, and non-infringement.</li>
                            <li>Information on the site should not be interpreted as a guarantee regarding product release dates, feature sets, compatibility, or performance.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">6. Limitation of Liability</h2>
                        <p>To the fullest extent permitted by applicable law, ECLABS shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of, or inability to use, the site.</p>
                        <p className="mt-2 text-white/70">This includes, without limitation, loss of data, interruption, loss of business opportunity, or reliance on product information displayed on the site.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">7. Privacy</h2>
                        <p>Your use of the site is also subject to our <Link to="/privacy" className="text-cyan-300 hover:text-cyan-200">Privacy Policy</Link>. App-specific privacy terms may also apply to individual products.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">8. Changes to These Terms</h2>
                        <p>ECLABS may update these Terms and Conditions at any time. The revised version will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the site after changes are posted constitutes acceptance of the revised terms.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">9. Governing Law</h2>
                        <p>These terms shall be governed by and interpreted in accordance with the laws of the Republic of Turkiye, without regard to conflict of law principles.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">10. Contact</h2>
                        <p>If you have questions about these terms, you may contact ECLABS at <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${WAITLIST_EMAIL}`}>{WAITLIST_EMAIL}</a>.</p>
                    </section>
                </div>
            </LegalShell>
        );
    }

    return (
        <LegalShell title="Şartlar ve Koşullar">
            <div className="space-y-6">
                <p className="text-white/40 text-xs">
                    Son güncelleme: 1 Mart 2026<br />
                    Yürürlük tarihi: 1 Mart 2026
                </p>

                <p>Bu Şartlar ve Koşullar, ECLABS web sitesini ve ilgili ürün sayfalarını kullanımınızı düzenler. Bu siteye erişerek veya siteyi kullanarak bu şartları kabul etmiş olursunuz.</p>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">1. Sitenin Kullanımı</h2>
                    <p>Bu site bilgilendirme, tanıtım ve iletişim amaçlarıyla sunulmaktadır. Siteyi yalnızca yürürlükteki hukuka ve bu şartlara uygun şekilde kullanabilirsiniz.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Bu web sitesi üzerinden, açıkça belirtilmedikçe, kullanıcı hesabı oluşturma veya doğrudan satın alma işlemi gerçekleştirilmez.</li>
                        <li>Site içeriği, ECLABS ve ürünleri hakkında genel bilgi sağlamak amacıyla sunulur.</li>
                        <li>Siteyi bozacak, zarar verecek veya siteye ya da ilişkili sistemlere yetkisiz erişim sağlamaya çalışacak şekilde kullanamazsınız.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">2. Ürün Bilgileri</h2>
                    <p>Bu sitede geliştirme aşamasında olan, incelemede bulunan, test edilen veya henüz kamuya açık olmayan ürünlere yer verilebilir.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Ürün açıklamaları, özellikler, görseller ve erişilebilirlik durumu herhangi bir zamanda önceden bildirim yapılmaksızın değişebilir.</li>
                        <li>&quot;Geliştirme Aşamasında&quot;, &quot;Yakında&quot; veya benzeri ifadeler, belirli bir tarihte yayın yapılacağına dair bağlayıcı bir taahhüt oluşturmaz.</li>
                        <li>ECLABS, herhangi bir ürünü, özelliği veya yayın planını kendi takdirine bağlı olarak değiştirebilir, askıya alabilir, durdurabilir veya erteleyebilir.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">3. Fikri Mülkiyet</h2>
                    <p>Aksi belirtilmedikçe, bu sitede yer alan ECLABS adı, logolar, ürün adları, metinler, yerleşim, görseller ve tasarım unsurları ECLABS&apos;a aittir veya ECLABS tarafından lisanslı olarak kullanılmaktadır ve ilgili fikri mülkiyet mevzuatı kapsamında korunmaktadır.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Site içeriğini önceden yazılı izin almadan kopyalayamaz, çoğaltamaz, yeniden yayımlayamaz, dağıtamaz, değiştiremez veya ticari olarak kullanamazsınız.</li>
                        <li>Bu sitede yer alan hiçbir içerik, siteyi kişisel olarak görüntülemek için gerekli olan kullanım dışında, ECLABS fikri mülkiyetini kullanmanız için size herhangi bir lisans veya hak vermez.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">4. Üçüncü Taraf Platformlar ve Bağlantılar</h2>
                    <p>Bu site, uygulama mağazaları, harici web siteleri veya e-posta uygulamaları dahil olmak üzere üçüncü taraf hizmetlere ya da platformlara bağlantılar içerebilir.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Üçüncü taraf hizmetleri kullanmanız, ilgili hizmetlerin kendi şartlarına, gizlilik politikalarına ve kurallarına tabidir.</li>
                        <li>ECLABS, üçüncü taraf hizmetlerin içeriğinden, erişilebilirliğinden veya uygulamalarından sorumlu değildir.</li>
                        <li>Apple App Store, TestFlight veya diğer platformlara yapılan referanslar, bu platformların ECLABS tarafından kontrol edildiği anlamına gelmez.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">5. Garanti Reddi</h2>
                    <p>Site ve içeriği &quot;olduğu gibi&quot; ve &quot;mevcut olduğu ölçüde&quot; sunulmaktadır.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>ECLABS, sitenin kesintisiz erişilebilir olacağını, hatasız çalışacağını veya site içeriğinin tamamen doğru olacağını garanti etmez.</li>
                        <li>Hukukun izin verdiği en geniş ölçüde, ECLABS ticari elverişlilik, belirli bir amaca uygunluk ve ihlal etmeme dahil olmak üzere açık veya zımni tüm garantileri reddeder.</li>
                        <li>Sitede yer alan bilgiler, ürün çıkış tarihleri, özellik setleri, uyumluluk veya performans hakkında garanti olarak yorumlanmamalıdır.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">6. Sorumluluğun Sınırlandırılması</h2>
                    <p>Yürürlükteki hukukun izin verdiği en geniş ölçüde, ECLABS; siteyi kullanımınızdan veya kullanamamanızdan kaynaklanan ya da bununla bağlantılı dolaylı, arızi, özel, sonuçsal veya cezai zararlardan sorumlu tutulamaz.</p>
                    <p className="mt-2 text-white/70">Buna, veri kaybı, kesinti, iş fırsatı kaybı veya sitede yer alan ürün bilgilerine güvenilmesi nedeniyle doğan zararlar da dahildir.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">7. Gizlilik</h2>
                    <p>Siteyi kullanımınız ayrıca <Link to="/privacy" className="text-cyan-300 hover:text-cyan-200">Gizlilik Politikamıza</Link> tabidir. Uygulamalara özel ek gizlilik koşulları da ilgili ürünler için geçerli olabilir.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">8. Bu Şartlardaki Değişiklikler</h2>
                    <p>ECLABS, bu Şartlar ve Koşullar&apos;ı herhangi bir zamanda güncelleyebilir. Güncellenmiş sürüm, yeni &quot;Son güncelleme&quot; tarihiyle bu sayfada yayımlanır. Değişiklikler yayımlandıktan sonra siteyi kullanmaya devam etmeniz, güncellenmiş şartları kabul ettiğiniz anlamına gelir.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">9. Uygulanacak Hukuk</h2>
                    <p>Bu şartlar, kanunlar ihtilafı kuralları dikkate alınmaksızın Türkiye Cumhuriyeti hukukuna tabi olacak ve buna göre yorumlanacaktır.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">10. İletişim</h2>
                    <p>Bu şartlar hakkında sorularınız varsa ECLABS ile <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${WAITLIST_EMAIL}`}>{WAITLIST_EMAIL}</a> adresi üzerinden iletişime geçebilirsiniz.</p>
                </section>
            </div>
        </LegalShell>
    );
}

export default TermsPage;
