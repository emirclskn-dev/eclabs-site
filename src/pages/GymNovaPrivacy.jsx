import React from "react";
import LegalShell from "../components/layout/LegalShell";
import { useLanguage } from "../context/LanguageContext";

function GymNovaPrivacyPage() {
    const { lang } = useLanguage();

    if (lang === "tr") {
        return (
            <LegalShell title="GymNova – Gizlilik Politikası">
                <div className="space-y-6">
                    <p className="text-white/40 text-xs">
                        Son güncelleme: 21 Nisan 2026<br />
                        Yürürlük tarihi: 21 Nisan 2026
                    </p>

                    <p>GymNova olarak gizliliğinize önem veriyoruz. Bu Gizlilik Politikası, uygulamamızı kullandığınızda hangi bilgilerin işlendiğini, bunların nasıl kullanıldığını ve nasıl korunduğunu açıklar.</p>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">1. Toplanan Bilgiler</h2>
                        <p>GymNova, sunduğu özelliklere bağlı olarak aşağıdaki bilgileri işleyebilir:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Kullanıcının uygulama içinde girdiği bilgiler (ör. isim, boy, kilo, hedef, antrenman planı, seçilen hareketler, set/tekrar bilgileri)</li>
                            <li>Uygulama kullanım verileri (ör. antrenman tamamlama durumu, uygulama içi etkileşimler, istatistik verileri)</li>
                            <li>Sağlık verileri: Eğer kullanıcı açık izin verirse, GymNova Apple Health / HealthKit üzerinden belirli sağlık ve aktivite verilerine erişebilir. Bu veriler yalnızca uygulama işlevlerini sunmak ve kullanıcı deneyimini geliştirmek amacıyla kullanılır.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">2. Bilgilerin Kullanımı</h2>
                        <p>Toplanan bilgiler şu amaçlarla kullanılabilir:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Kullanıcının antrenman planını oluşturmasına ve takip etmesine yardımcı olmak</li>
                            <li>İlerleme, istatistik ve performans ekranlarını sunmak</li>
                            <li>Hatırlatma ve bildirim özelliklerini çalıştırmak</li>
                            <li>Uygulamanın performansını, kararlılığını ve kullanıcı deneyimini iyileştirmek</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">3. Sağlık Verileri</h2>
                        <p>Sağlık verileri, yalnızca kullanıcının açık izniyle ve Apple’ın izin mekanizmaları kapsamında erişilir.</p>
                        <p className="mt-2 text-white/70">GymNova, HealthKit verilerini reklam amacıyla kullanmaz ve üçüncü taraflarla satmaz.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">4. Veri Paylaşımı</h2>
                        <p>GymNova, kişisel verilerinizi satmaz. Verileriniz yalnızca aşağıdaki durumlarda paylaşılabilir:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Yasal yükümlülüklerin yerine getirilmesi gerektiğinde</li>
                            <li>Hizmet sağlayıcılarla, yalnızca uygulamanın çalışması için gerekli olduğu ölçüde</li>
                            <li>Kullanıcının açık onayı bulunduğunda</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">5. Veri Saklama</h2>
                        <p>Veriler, uygulamanın işlevlerini yerine getirmek için gerekli olduğu süre boyunca saklanır. Kullanıcı uygulamayı silerse veya ilgili verileri kaldırırsa, yerel olarak saklanan bilgiler cihazdan kaldırılabilir. Sunucuda tutulan veriler varsa bunlar makul süre içinde silinir veya anonim hale getirilir.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">6. Veri Güvenliği</h2>
                        <p>GymNova, kullanıcı verilerini korumak için makul teknik ve idari önlemler uygular. Ancak hiçbir dijital sistemin tamamen risksiz olduğu garanti edilemez.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">7. Çocukların Gizliliği</h2>
                        <p>GymNova, çocuklardan bilerek kişisel veri toplamak üzere tasarlanmamıştır. Eğer bir ebeveyn veya yasal temsilci, çocuğa ait verilerin uygulama tarafından işlendiğini düşünüyorsa bizimle iletişime geçebilir.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">8. Üçüncü Taraf Hizmetler</h2>
                        <p>GymNova, uygulamanın işleyişi için Apple Health / HealthKit, analiz, hata raporlama veya benzeri üçüncü taraf hizmetleri kullanabilir. Bu hizmetlerin veri işleme yöntemleri kendi gizlilik politikalarına tabidir.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">9. Haklarınız</h2>
                        <p>Bulunduğunuz ülke veya bölgeye bağlı olarak, kişisel verilerinize erişme, bunları düzeltme, silme veya işlenmesine itiraz etme hakkına sahip olabilirsiniz.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">10. Bu Politikanın Güncellenmesi</h2>
                        <p>Bu Gizlilik Politikası zaman zaman güncellenebilir. Güncellenmiş sürüm uygulama içinde, web sitesinde veya ilgili ürün sayfasında yayınlandığı anda yürürlüğe girer.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">11. İletişim</h2>
                        <p>Gizlilik politikamız hakkında sorularınız için:</p>
                        <p className="mt-3 text-white/70">
                            ECLABS<br />
                            <a className="text-cyan-300 hover:text-cyan-200" href="https://eclabs.tr" target="_blank" rel="noreferrer">eclabs.tr</a><br />
                            <a className="text-cyan-300 hover:text-cyan-200" href="mailto:support@eclabs.tr">support@eclabs.tr</a>
                        </p>
                    </section>
                </div>
            </LegalShell>
        );
    }

    return (
        <LegalShell title="GymNova – Privacy Policy">
            <div className="space-y-6">
                <p className="text-white/40 text-xs">
                    Last updated: April 21, 2026<br />
                    Effective date: April 21, 2026
                </p>

                <p>At GymNova, we value your privacy. This Privacy Policy explains what information may be processed when you use our app, how it is used, and how it is protected.</p>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">1. Information We Collect</h2>
                    <p>Depending on the features you use, GymNova may process the following information:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Information entered by the user within the app (such as name, height, weight, goals, workout plans, selected exercises, set/rep data)</li>
                        <li>App usage data (such as workout completion status, in-app interactions, and statistics)</li>
                        <li>Health data: If the user grants permission, GymNova may access certain health and activity data through Apple Health / HealthKit. This data is used only to provide app functionality and improve the user experience.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">2. How We Use Information</h2>
                    <p>Collected information may be used to:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Help users create and track workout plans</li>
                        <li>Provide progress, statistics, and performance features</li>
                        <li>Enable reminders and notifications</li>
                        <li>Improve app performance, stability, and overall user experience</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">3. Health Data</h2>
                    <p>Health data is accessed only with the user&apos;s explicit permission and through Apple&apos;s authorization mechanisms.</p>
                    <p className="mt-2 text-white/70">GymNova does not use HealthKit data for advertising purposes and does not sell it to third parties.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">4. Data Sharing</h2>
                    <p>GymNova does not sell personal data. Your data may only be shared in the following cases:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>When required to comply with legal obligations</li>
                        <li>With service providers, only to the extent necessary for operating the app</li>
                        <li>When the user has given explicit consent</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">5. Data Retention</h2>
                    <p>Data is retained for as long as necessary to provide the app&apos;s functionality. If the user deletes the app or removes relevant data, locally stored information may be removed from the device. If any data is stored on servers, it will be deleted or anonymized within a reasonable period.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">6. Data Security</h2>
                    <p>GymNova uses reasonable technical and organizational measures to protect user data. However, no digital system can be guaranteed to be completely secure.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">7. Children&apos;s Privacy</h2>
                    <p>GymNova is not designed to knowingly collect personal data from children. If a parent or legal guardian believes that data relating to a child has been processed by the app, they may contact us.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">8. Third-Party Services</h2>
                    <p>GymNova may use third-party services such as Apple Health / HealthKit, analytics, crash reporting, or similar services to operate the app. These services may process data in accordance with their own privacy policies.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">9. Your Rights</h2>
                    <p>Depending on your country or region, you may have rights regarding your personal data, including the right to access, correct, delete, or object to its processing.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">10. Changes to This Policy</h2>
                    <p>This Privacy Policy may be updated from time to time. The updated version becomes effective once posted within the app, on the website, or on the relevant product page.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">11. Contact</h2>
                    <p>For questions about our privacy policy:</p>
                    <p className="mt-3 text-white/70">
                        ECLABS<br />
                        <a className="text-cyan-300 hover:text-cyan-200" href="https://eclabs.tr" target="_blank" rel="noreferrer">eclabs.tr</a><br />
                        <a className="text-cyan-300 hover:text-cyan-200" href="mailto:support@eclabs.tr">support@eclabs.tr</a>
                    </p>
                </section>
            </div>
        </LegalShell>
    );
}

export default GymNovaPrivacyPage;
