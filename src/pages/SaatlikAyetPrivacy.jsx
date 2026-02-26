import React from "react";
import LegalShell, { WAITLIST_EMAIL } from "../components/layout/LegalShell";
import { useLanguage } from "../context/LanguageContext";

function SaatlikAyetPrivacyPage() {
    const { lang } = useLanguage();

    if (lang === "tr") {
        return (
            <LegalShell title="SaatlikAyet – Gizlilik Politikası">
                <div className="space-y-6">
                    <p className="text-white/40 text-xs">
                        Yürürlük Tarihi: 8 Şubat 2026<br />
                        Son Güncelleme: 8 Şubat 2026
                    </p>

                    <p>Bu Gizlilik Politikası, SaatlikAyet (“Uygulama”) uygulamasını kullandığınızda bilgilerinizin nasıl işlendiğini açıklar.</p>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">1. Veri Sorumlusu</h2>
                        <p>
                            Uygulama: SaatlikAyet<br />
                            Geliştirici / Veri Sorumlusu: ECLABS<br />
                            Ülke: Türkiye<br />
                            İletişim E-postası: <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${WAITLIST_EMAIL}`}>{WAITLIST_EMAIL}</a>
                        </p>
                        <p className="mt-2 text-white/70">
                            ECLABS, kişisel verilerin işlenmesinden, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve uygulanabildiği yerlerde Genel Veri Koruma Yönetmeliği (GDPR) dahil olmak üzere yürürlükteki veri koruma yasalarına uygun olarak sorumludur.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">2. Topladığımız Bilgiler</h2>
                        <h3 className="text-white/90 font-semibold mb-2">2.1 Cihazınızda Yerel Olarak Saklanan Veriler</h3>
                        <p>Uygulama öncelikle verileri cihazınızda yerel olarak saklar. Bu şunları içerir:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Seçilen dil ve çeviri tercihleri</li>
                            <li>Bildirim ayarları ve planlanan zamanlar</li>
                            <li>Favoriler ve okuma ilerlemesi</li>
                            <li>Tema ve görünüm tercihleri</li>
                            <li>Premium hak durumu (yalnızca doğrulama sonucu)</li>
                        </ul>
                        <p className="mt-2">Bu veriler ECLABS sunucularına iletilmez ve Uygulamayı sildiğinizde silinir.</p>

                        <h3 className="text-white/90 font-semibold mt-4 mb-2">2.2 Uygulama İçi Satın Almalar</h3>
                        <p>Uygulama, uygulama içi satın almalar ve abonelikler için Apple StoreKit kullanır.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Tüm ödemeler Apple tarafından işlenir.</li>
                            <li>ECLABS kredi kartı veya fatura bilgilerini toplamaz veya saklamaz.</li>
                            <li>Uygulama yalnızca Apple tarafından sağlanan abonelik veya premium hak durumunu doğrular.</li>
                        </ul>
                        <p className="mt-2 italic opacity-60">Ödeme işlemleriyle ilgili ayrıntılar için lütfen Apple'ın Gizlilik Politikasına bakın.</p>

                        <h3 className="text-white/90 font-semibold mt-4 mb-2">2.3 Reklam ve Cihaz Bilgileri</h3>
                        <p>Uygulamanın ücretsiz sürümü, Google AdMob gibi üçüncü taraf reklam hizmetleri tarafından sağlanan reklamları görüntüleyebilir.</p>
                        <p className="mt-2">Reklam sağlayıcıları şu sınırlı bilgileri işleyebilir:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>İzin verilmişse, Reklamverenler için Tanımlayıcı (IDFA)</li>
                            <li>IP adresi (genel konum tahmini ve dolandırıcılığı önleme için)</li>
                            <li>Cihaz tipi, işletim sistemi sürümü ve uygulama sürümü</li>
                            <li>Reklam etkileşim verileri (gösterimler ve tıklamalar)</li>
                            <li>Tanılama ve performans verileri</li>
                        </ul>

                        <h4 className="text-white/80 font-semibold mt-4 mb-1">Uygulama Takibi Şeffaflığı (ATT)</h4>
                        <p className="text-white/70">Uygulama, IDFA'ya erişmeden önce Apple'ın Uygulama Takibi Şeffaflığı (ATT) çerçevesi aracılığıyla izin ister. İzin verirseniz, kişiselleştirilmiş reklamlar etkinleştirilebilir. İzin vermezseniz, yalnızca kişiselleştirilmeyen reklamlar görüntülenir.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">3. İşleme Amaçları</h2>
                        <p>Bilgiler şu amaçlarla işlenir:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Temel uygulama işlevselliğini sağlamak</li>
                            <li>Kullanıcı deneyimini kişiselleştirmek</li>
                            <li>Premium ve abonelik erişimini yönetmek</li>
                            <li>Reklamları görüntülemek ve performansını ölçmek</li>
                            <li>Güvenliği, tanılamayı ve kararlılığı iyileştirmek</li>
                        </ul>
                        <p className="mt-2 italic">İşleme, meşru menfaate veya gerektiğinde kullanıcı rızasına dayanır.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">4. Veri Paylaşımı</h2>
                        <p>Bilgiler şunlarla paylaşılabilir:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Apple (App Store ve StoreKit hizmetleri)</li>
                            <li>Google AdMob (reklam hizmetleri)</li>
                            <li>Uygulama işlevselliği için gerekli teknik hizmet sağlayıcılar</li>
                            <li>Yasal olarak zorunlu olduğunda kamu otoriteleri</li>
                        </ul>
                        <p className="mt-2">ECLABS kişisel verileri satmaz.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">5. Uluslararası Veri Transferleri</h2>
                        <p className="text-white/70">Üçüncü taraf hizmet sağlayıcılar (reklam ortakları gibi) verileri ikamet ettiğiniz ülkenin dışında işleyebilir. Bu tür transferler yürürlükteki veri koruma yasalarına uygun olarak gerçekleştirilir.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">6. Veri Saklama</h2>
                        <p className="text-white/70">Yerel olarak saklanan veriler, Uygulama silinene kadar cihazınızda kalır. Üçüncü taraf hizmet sağlayıcılar verileri kendi gizlilik politikalarına göre saklar.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">7. Veri Silme</h2>
                        <p>Çoğu veri yerel olarak saklandığından, Uygulamayı kaldırarak verilerinizi her an silebilirsiniz. Kişisel verilerle ilgili ek talepleriniz için support@eclabs.tr adresinden bizimle iletişime geçebilirsiniz.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">8. Güvenlik</h2>
                        <p className="text-white/70">Bilgileri korumak için makul teknik ve idari önlemler uygulanmaktadır. Ancak hiçbir iletim veya depolama yöntemi tamamen güvenli değildir.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">9. Haklarınız</h2>
                        <p>Uygulanabilir yasaya (KVKK ve GDPR dahil) bağlı olarak şu haklara sahip olabilirsiniz:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Kişisel verilerinize erişim talep etme</li>
                            <li>Hatalı verilerin düzeltilmesini talep etme</li>
                            <li>Verilerinizin silinmesini talep etme</li>
                            <li>Belirli işleme faaliyetlerine itiraz etme</li>
                        </ul>
                        <p className="mt-2">Taleplerinizi <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${WAITLIST_EMAIL}`}>{WAITLIST_EMAIL}</a> üzerinden iletebilirsiniz.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">10. Çocukların Gizliliği</h2>
                        <p className="text-white/70">Uygulama genel bir kitleye yöneliktir ve 13 yaşın altındaki çocuklara yönelik değildir. Çocuklardan bilerek kişisel veri toplamıyoruz.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">11. Politika Değişiklikleri</h2>
                        <p className="text-white/70">Bu Gizlilik Politikası periyodik olarak güncellenebilir. En güncel sürüm her zaman yayınlanan bağlantıda mevcut olacaktır.</p>
                    </section>
                </div>
            </LegalShell>
        );
    }

    return (
        <LegalShell title="SaatlikAyet – Privacy Policy">
            <div className="space-y-6">
                <p className="text-white/40 text-xs">
                    Effective Date: February 8, 2026<br />
                    Last Updated: February 8, 2026
                </p>

                <p>This Privacy Policy explains how SaatlikAyet (“the App”) handles information when you use the application.</p>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">1. Data Controller</h2>
                    <p>
                        Application: SaatlikAyet<br />
                        Developer / Data Controller: ECLABS<br />
                        Country: Türkiye<br />
                        Contact Email: <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${WAITLIST_EMAIL}`}>{WAITLIST_EMAIL}</a>
                    </p>
                    <p className="mt-2 text-white/70">
                        ECLABS is responsible for the processing of personal data in accordance with applicable data protection laws, including the Turkish Personal Data Protection Law (KVKK) and, where applicable, the General Data Protection Regulation (GDPR).
                    </p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">2. Information We Collect</h2>
                    <h3 className="text-white/90 font-semibold mb-2">2.1 Data Stored Locally on Your Device</h3>
                    <p>The App primarily stores data locally on your device. This includes:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Selected language and translation preferences</li>
                        <li>Notification settings and scheduled times</li>
                        <li>Favorites and reading progress</li>
                        <li>Theme and appearance preferences</li>
                        <li>Premium entitlement status (verification result only)</li>
                    </ul>
                    <p className="mt-2">This data is not transmitted to ECLABS servers and is deleted when you uninstall the App.</p>

                    <h3 className="text-white/90 font-semibold mt-4 mb-2">2.2 In-App Purchases</h3>
                    <p>The App uses Apple StoreKit for in-app purchases and subscriptions.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>All payments are processed by Apple.</li>
                        <li>ECLABS does not collect or store credit card or billing information.</li>
                        <li>The App only verifies subscription or premium entitlement status provided by Apple.</li>
                    </ul>
                    <p className="mt-2 italic opacity-60">Please refer to Apple’s Privacy Policy for details on payment processing.</p>

                    <h3 className="text-white/90 font-semibold mt-4 mb-2">2.3 Advertising and Device Information</h3>
                    <p>The free version of the App may display advertisements provided by third-party advertising services such as Google AdMob.</p>
                    <p className="mt-2">Advertising providers may process limited information including:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Identifier for Advertisers (IDFA), if permission is granted</li>
                        <li>IP address (for general location estimation and fraud prevention)</li>
                        <li>Device type, operating system version, and app version</li>
                        <li>Advertising interaction data (impressions and clicks)</li>
                        <li>Diagnostic and performance data</li>
                    </ul>

                    <h4 className="text-white/80 font-semibold mt-4 mb-1">App Tracking Transparency (ATT)</h4>
                    <p className="text-white/70">The App requests permission through Apple’s App Tracking Transparency (ATT) framework before accessing the Identifier for Advertisers (IDFA). If you grant permission, personalized advertising may be enabled. If you deny permission, only non-personalized advertisements are displayed.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">3. Purpose of Processing</h2>
                    <p>Information is processed for the following purposes:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Providing core app functionality</li>
                        <li>Personalizing user experience</li>
                        <li>Managing premium and subscription access</li>
                        <li>Displaying advertisements and measuring performance</li>
                        <li>Improving security, diagnostics, and stability</li>
                    </ul>
                    <p className="mt-2 italic">Processing is based on legitimate interest or user consent where required.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">4. Data Sharing</h2>
                    <p>Information may be shared with:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Apple (App Store and StoreKit services)</li>
                        <li>Google AdMob (advertising services)</li>
                        <li>Technical service providers required for app functionality</li>
                        <li>Public authorities when legally required</li>
                    </ul>
                    <p className="mt-2">ECLABS does not sell personal data.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">5. International Data Transfers</h2>
                    <p className="text-white/70">Third-party service providers (such as advertising partners) may process data outside your country of residence. Such transfers are conducted in accordance with applicable data protection laws.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">6. Data Retention</h2>
                    <p className="text-white/70">Locally stored data remains on your device until the App is deleted. Third-party service providers retain data according to their own privacy policies.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">7. Data Deletion</h2>
                    <p>Because most data is stored locally, you may delete your data at any time by uninstalling the App. For additional requests regarding personal data, you may contact support@eclabs.tr.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">8. Security</h2>
                    <p className="text-white/70">Reasonable technical and administrative safeguards are implemented to protect information. However, no method of transmission or storage is completely secure.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">9. Your Rights</h2>
                    <p>Depending on applicable law (including KVKK and GDPR), you may have rights to:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Request access to your personal data</li>
                        <li>Request correction of inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Object to certain processing activities</li>
                    </ul>
                    <p className="mt-2">You may submit requests via <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${WAITLIST_EMAIL}`}>{WAITLIST_EMAIL}</a>.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">10. Children’s Privacy</h2>
                    <p className="text-white/70">The App is intended for a general audience and is not directed to children under the age of 13. We do not knowingly collect personal data from children.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">11. Policy Changes</h2>
                    <p className="text-white/70">This Privacy Policy may be updated periodically. The latest version will always be available at the published link.</p>
                </section>
            </div>
        </LegalShell>
    );
}

export default SaatlikAyetPrivacyPage;
