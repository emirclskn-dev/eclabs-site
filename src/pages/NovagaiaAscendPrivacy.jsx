import React from "react";
import LegalShell, { WAITLIST_EMAIL } from "../components/layout/LegalShell";
import { useLanguage } from "../context/LanguageContext";

function NovagaiaAscendPrivacyPage() {
    const { lang } = useLanguage();

    if (lang === "tr") {
        return (
            <LegalShell title="NovaGaia: Ascend – Gizlilik Politikası">
                <div className="space-y-6">
                    <p className="text-white/40 text-xs">Son güncelleme: 12 Mart 2026</p>

                    <p>NovaGaia: Ascend olarak kullanıcı gizliliğine önem veriyoruz. Bu Gizlilik Politikası, uygulamamızın hangi verileri işlediğini ve bu verilerin nasıl kullanıldığını açıklar.</p>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">1. Toplanan Veriler</h2>
                        <p>Uygulama aşağıdaki verileri cihaz üzerinde veya ilgili servisler aracılığıyla işleyebilir:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Yüksek skor ve oyun ilerleme verileri</li>
                            <li>Dil ve ses tercihleri gibi uygulama ayarları</li>
                            <li>Reklam uygunluğu ve reklam etkileşimiyle ilgili teknik veriler</li>
                            <li>Uygulama içi satın alma ve Pro erişim durumu</li>
                            <li>Game Center kullanılması halinde Apple hesabına bağlı skor ve başarı verileri</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">2. Verilerin Kullanım Amaçları</h2>
                        <p>Toplanan veya işlenen veriler şu amaçlarla kullanılır:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Oyun deneyimini sunmak ve kaydetmek</li>
                            <li>Yüksek skor, başarı ve ilerleme durumunu göstermek</li>
                            <li>Uygulama içi satın alımları doğrulamak ve geri yüklemek</li>
                            <li>Reklam göstermek, reklam sıklığını yönetmek ve ödüllü reklam işlevlerini çalıştırmak</li>
                            <li>Uygulama performansını ve kullanıcı deneyimini iyileştirmek</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">3. Reklam Hizmetleri</h2>
                        <p className="text-white/70">Uygulama, reklam sunumu için Google AdMob kullanabilir. AdMob; reklam gösterimi, ölçümleme ve uygun reklam sunumu amacıyla cihazla ilgili bazı teknik sinyalleri işleyebilir. Bu veri işleme Google'ın kendi gizlilik politikalarına tabidir.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">4. Game Center</h2>
                        <p className="text-white/70">Uygulama Apple Game Center ile entegre olabilir. Game Center kullanıldığında skorlar, liderlik tablosu verileri ve başarımlar Apple tarafından işlenebilir. Bu veriler Apple'ın gizlilik politikalarına tabidir.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">5. Uygulama İçi Satın Alımlar</h2>
                        <p className="text-white/70">Uygulama içi satın alma işlemleri Apple App Store üzerinden gerçekleştirilir. Ödeme bilgileri uygulama tarafından tutulmaz veya doğrudan erişilmez.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">6. Verilerin Saklanması</h2>
                        <p className="text-white/70">Oyun ayarları, skor verileri ve bazı yerel tercihler cihaz üzerinde saklanabilir. Uygulama tarafından işlenen veriler, oyun işlevselliği için gerekli olduğu süre boyunca tutulur.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">7. Çocukların Gizliliği</h2>
                        <p className="text-white/70">Uygulama, yürürlükteki yasalara aykırı şekilde çocuklardan bilerek kişisel veri toplamaz. Ebeveyn veya yasal temsilciler, veri işleme konusunda bizimle iletişime geçebilir.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">8. Üçüncü Taraf Hizmetler</h2>
                        <p>Uygulama aşağıdaki üçüncü taraf servisleri kullanabilir:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Apple Game Center</li>
                            <li>Apple App Store / StoreKit</li>
                            <li>Google AdMob</li>
                        </ul>
                        <p className="mt-2 text-white/70">Bu servislerin veri işleme faaliyetleri kendi gizlilik politikalarına tabidir.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">9. Haklarınız</h2>
                        <p className="text-white/70">Bulunduğunuz ülke veya bölgedeki geçerli yasalara göre verilerinize ilişkin erişim, düzeltme, silme veya itiraz haklarına sahip olabilirsiniz.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">10. İletişim</h2>
                        <p>
                            Bu Gizlilik Politikası ile ilgili sorularınız için bizimle iletişime geçebilirsiniz:{" "}
                            <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${WAITLIST_EMAIL}`}>{WAITLIST_EMAIL}</a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">11. Değişiklikler</h2>
                        <p className="text-white/70">Bu Gizlilik Politikası zaman zaman güncellenebilir. Güncel sürüm her zaman resmi web sitemizde yayınlanır.</p>
                    </section>
                </div>
            </LegalShell>
        );
    }

    return (
        <LegalShell title="NovaGaia: Ascend – Privacy Policy">
            <div className="space-y-6">
                <p className="text-white/40 text-xs">Last updated: March 12, 2026</p>

                <p>At NovaGaia: Ascend, we value user privacy. This Privacy Policy explains what data our application processes and how it is used.</p>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">1. Data Collected</h2>
                    <p>The application may process the following data on-device or through relevant services:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>High scores and game progress data</li>
                        <li>Application settings such as language and sound preferences</li>
                        <li>Technical data related to ad eligibility and ad interactions</li>
                        <li>In-app purchase and Pro access status</li>
                        <li>Score and achievement data linked to Apple account when Game Center is used</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">2. Purpose of Data Processing</h2>
                    <p>Collected or processed data is used for the following purposes:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Delivering and saving the game experience</li>
                        <li>Displaying high scores, achievements, and progress</li>
                        <li>Verifying and restoring in-app purchases</li>
                        <li>Showing ads, managing ad frequency, and running rewarded ad features</li>
                        <li>Improving app performance and user experience</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">3. Advertising Services</h2>
                    <p className="text-white/70">The application may use Google AdMob for ad delivery. AdMob may process certain technical device signals for ad delivery, measurement, and appropriate ad targeting. This data processing is subject to Google's own privacy policies.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">4. Game Center</h2>
                    <p className="text-white/70">The application may integrate with Apple Game Center. When Game Center is used, scores, leaderboard data, and achievements may be processed by Apple. This data is subject to Apple's privacy policies.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">5. In-App Purchases</h2>
                    <p className="text-white/70">In-app purchases are processed through the Apple App Store. Payment information is not stored or directly accessed by the application.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">6. Data Retention</h2>
                    <p className="text-white/70">Game settings, score data, and some local preferences may be stored on-device. Data processed by the application is retained for as long as necessary for game functionality.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">7. Children's Privacy</h2>
                    <p className="text-white/70">The application does not knowingly collect personal data from children in violation of applicable laws. Parents or legal guardians may contact us regarding data processing.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">8. Third-Party Services</h2>
                    <p>The application may use the following third-party services:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Apple Game Center</li>
                        <li>Apple App Store / StoreKit</li>
                        <li>Google AdMob</li>
                    </ul>
                    <p className="mt-2 text-white/70">Data processing by these services is subject to their own privacy policies.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">9. Your Rights</h2>
                    <p className="text-white/70">Depending on applicable laws in your country or region, you may have rights to access, correct, delete, or object to the processing of your data.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">10. Contact</h2>
                    <p>
                        For questions regarding this Privacy Policy, you may contact us at:{" "}
                        <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${WAITLIST_EMAIL}`}>{WAITLIST_EMAIL}</a>
                    </p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">11. Changes</h2>
                    <p className="text-white/70">This Privacy Policy may be updated from time to time. The current version is always published on our official website.</p>
                </section>
            </div>
        </LegalShell>
    );
}

export default NovagaiaAscendPrivacyPage;
