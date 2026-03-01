import React from "react";
import LegalShell from "../components/layout/LegalShell";
import { useLanguage } from "../context/LanguageContext";

function AtlaslyPrivacyPage() {
    const { lang } = useLanguage();

    if (lang === "tr") {
        return (
            <LegalShell title="Atlasly – Gizlilik Politikası">
                <div className="space-y-6">
                    <p className="text-white/40 text-xs">
                        Son güncelleme: 1 Mart 2025<br />
                        Yürürlük tarihi: 1 Mart 2025
                    </p>

                    <p>Bu Gizlilik Politikası, ECLABS tarafından geliştirilen Atlasly mobil uygulamasının kişisel verilerinizi nasıl işlediğini açıklamaktadır.</p>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">1. Genel Bakış</h2>
                        <p>Atlasly, bir seyahat defteri uygulamasıdır. Tasarım ilkemiz gizlilik önceliklidir: uygulamayı kullanmak için hesap oluşturmanız gerekmez, verileriniz yalnızca sizin cihazınızda saklanır ve herhangi bir sunucuya gönderilmez.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">2. Topladığımız Veriler</h2>
                        <h3 className="text-white/90 font-semibold mb-2">2.1 Cihazda Saklanan Veriler (Sunucuya Gönderilmez)</h3>
                        <p>Atlasly, aşağıdaki verileri yalnızca cihazınızda, yerel olarak depolar:</p>

                        <div className="mt-3 overflow-x-auto">
                            <table className="w-full text-left text-sm text-white/70">
                                <thead>
                                    <tr className="border-b border-white/10 text-white/90">
                                        <th className="py-2 pr-4 font-semibold">Veri</th>
                                        <th className="py-2 pr-4 font-semibold">Amaç</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/5">
                                        <td className="py-2 pr-4">Ziyaret ettiğiniz ülkeler ve şehirler</td>
                                        <td className="py-2 pr-4">Seyahat haritanızı oluşturmak</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-2 pr-4">Rota planlarınız</td>
                                        <td className="py-2 pr-4">Rota planlama özelliği</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-2 pr-4">Uygulama tercihleri</td>
                                        <td className="py-2 pr-4">Ayarlarınızı hatırlamak</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 pr-4">Pro satın alma durumu</td>
                                        <td className="py-2 pr-4">Uygulama içi satın alma doğrulaması</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-3">Bu veriler cihazınızda SwiftData ve UserDefaults teknolojileri kullanılarak saklanır. ECLABS&apos;ın bu verilere erişimi yoktur.</p>

                        <h3 className="text-white/90 font-semibold mt-4 mb-2">2.2 Toplamadığımız Veriler</h3>
                        <p>Atlasly şu verileri kesinlikle toplamaz:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Kimlik bilgileri (ad, soyad, e-posta, telefon numarası)</li>
                            <li>Konum verisi (GPS veya IP bazlı)</li>
                            <li>Cihaz tanımlayıcıları (IDFA, IDFV vb.)</li>
                            <li>Çerezler veya izleme pikselleri</li>
                            <li>Kullanım analitikleri veya kilitlenme raporları</li>
                            <li>Kamera veya mikrofon kaydı</li>
                            <li>Rehber veya kişi bilgileri</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">3. Fotoğraf Erişimi</h2>
                        <p>Atlasly, paylaşım kartı oluşturmak istediğinizde iOS&apos;un yerleşik PhotosPicker aracını kullanır. Bu süreçte:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Seçtiğiniz fotoğraf yalnızca paylaşım kartı görseli oluşturmak için kullanılır.</li>
                            <li>Fotoğraflarınız ECLABS sunucularına yüklenmez.</li>
                            <li>Uygulama fotoğraf kütüphanenize sürekli erişim izni talep etmez; yalnızca siz seçim yaparken anlık erişim sağlanır.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">4. Uygulama İçi Satın Alma</h2>
                        <p>Atlasly Pro satın alma işlemi tamamen Apple App Store altyapısı üzerinden gerçekleşir. Bu işlem sırasında:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Ödeme bilgileriniz (kart numarası, banka bilgileri vb.) ECLABS tarafından görülmez veya işlenmez.</li>
                            <li>Satın alma doğrulaması Apple&apos;ın StoreKit 2 hizmeti aracılığıyla yapılır ve sonuç cihazınızda saklanır.</li>
                            <li>Apple&apos;ın kendi gizlilik politikası geçerlidir: <a className="text-cyan-300 hover:text-cyan-200" href="https://apple.com/tr/legal/privacy" target="_blank" rel="noreferrer">apple.com/tr/legal/privacy</a></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">5. Üçüncü Taraflar</h2>
                        <p>Atlasly, aşağıdaki tek üçüncü tarafla etkileşime girer:</p>

                        <div className="mt-3 overflow-x-auto">
                            <table className="w-full text-left text-sm text-white/70">
                                <thead>
                                    <tr className="border-b border-white/10 text-white/90">
                                        <th className="py-2 pr-4 font-semibold">Taraf</th>
                                        <th className="py-2 pr-4 font-semibold">Amaç</th>
                                        <th className="py-2 pr-4 font-semibold">Politika</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 pr-4">Apple Inc.</td>
                                        <td className="py-2 pr-4">App Store dağıtımı ve uygulama içi satın alma (StoreKit)</td>
                                        <td className="py-2 pr-4">
                                            <a className="text-cyan-300 hover:text-cyan-200" href="https://apple.com/tr/legal/privacy" target="_blank" rel="noreferrer">
                                                apple.com/tr/legal/privacy
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-3">Uygulamada Google Analytics, Firebase, Facebook SDK, Mixpanel, Amplitude, Adjust veya benzeri herhangi bir analitik ya da reklam SDK&apos;sı kullanılmamaktadır.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">6. Veri Güvenliği</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Tüm uygulama verileri yalnızca cihazınızda saklanır.</li>
                            <li>Cihazınızın kendi güvenlik mekanizmaları (şifreleme, biyometrik kilit vb.) verilerinizi korur.</li>
                            <li>İnternet bağlantısı yalnızca satın alma doğrulaması için gereklidir; diğer tüm özellikler çevrimdışı çalışır.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">7. Çocukların Gizliliği</h2>
                        <p>Atlasly, 13 yaşın altındaki çocuklardan bilerek kişisel veri toplamaz. Uygulama hesap gerektirmediğinden ve hiçbir kişisel veri sunucuya gönderilmediğinden, COPPA ve benzeri düzenlemeler kapsamında ek bir risk oluşturmamaktadır.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">8. Haklarınız</h2>
                        <p>Verileriniz yalnızca cihazınızda saklandığından:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                            <li>Erişim hakkı: Verilerinize uygulama içinden istediğiniz zaman erişebilirsiniz.</li>
                            <li>Silme hakkı: Uygulamayı cihazınızdan sildiğinizde tüm veriler otomatik olarak silinir. Ayrıca uygulama içindeki &quot;Veri Sıfırla&quot; özelliğini (Pro) kullanabilirsiniz.</li>
                            <li>Taşınabilirlik: Veriler cihazınızda olduğundan dilediğiniz gibi yönetebilirsiniz.</li>
                        </ul>
                        <p className="mt-2">KVKK (Kişisel Verilerin Korunması Kanunu) kapsamındaki haklarınız için aşağıdaki iletişim adresini kullanabilirsiniz.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">9. Değişiklikler</h2>
                        <p>Bu politikayı zaman zaman güncelleyebiliriz. Önemli değişikliklerde güncellenen politika bu sayfada yayınlanacak ve &quot;Son güncelleme&quot; tarihi değiştirilecektir. Atlasly herhangi bir veri sunucusu işletmediğinden, değişiklikler sizi doğrudan etkilemez.</p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold tracking-tight mb-3">10. İletişim</h2>
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
        <LegalShell title="Atlasly – Privacy Policy">
            <div className="space-y-6">
                <p className="text-white/40 text-xs">
                    Last updated: March 1, 2025<br />
                    Effective date: March 1, 2025
                </p>

                <p>This Privacy Policy describes how Atlasly, developed by ECLABS, handles your information.</p>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">1. Overview</h2>
                    <p>Atlasly is a travel journal app built on a privacy-first principle: no account is required to use the app, your data is stored only on your device, and nothing is sent to any server.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">2. Data We Collect</h2>
                    <h3 className="text-white/90 font-semibold mb-2">2.1 On-Device Data (Never Sent to Any Server)</h3>
                    <p>Atlasly stores the following data locally on your device only:</p>

                    <div className="mt-3 overflow-x-auto">
                        <table className="w-full text-left text-sm text-white/70">
                            <thead>
                                <tr className="border-b border-white/10 text-white/90">
                                    <th className="py-2 pr-4 font-semibold">Data</th>
                                    <th className="py-2 pr-4 font-semibold">Purpose</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/5">
                                    <td className="py-2 pr-4">Countries and cities you&apos;ve visited</td>
                                    <td className="py-2 pr-4">Building your travel map</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-2 pr-4">Route plans</td>
                                    <td className="py-2 pr-4">Route planning feature</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-2 pr-4">App preferences</td>
                                    <td className="py-2 pr-4">Remembering your settings</td>
                                </tr>
                                <tr>
                                    <td className="py-2 pr-4">Pro purchase status</td>
                                    <td className="py-2 pr-4">In-app purchase verification</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-3">This data is stored using SwiftData and UserDefaults on your device. ECLABS has no access to this data.</p>

                    <h3 className="text-white/90 font-semibold mt-4 mb-2">2.2 Data We Do Not Collect</h3>
                    <p>Atlasly does not collect:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Personal identifiers (name, email, phone number)</li>
                        <li>Location data (GPS or IP-based)</li>
                        <li>Device identifiers (IDFA, IDFV, etc.)</li>
                        <li>Cookies or tracking pixels</li>
                        <li>Usage analytics or crash reports</li>
                        <li>Camera or microphone recordings</li>
                        <li>Contacts or address book data</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">3. Photo Access</h2>
                    <p>When you create a share card, Atlasly uses iOS&apos;s built-in PhotosPicker. During this process:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>The selected photo is used only to generate the share card image.</li>
                        <li>Your photos are never uploaded to ECLABS servers.</li>
                        <li>The app does not request persistent access to your photo library; access is granted momentarily only when you make a selection.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">4. In-App Purchases</h2>
                    <p>Atlasly Pro purchases are processed entirely through the Apple App Store. During this process:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Your payment information is never seen or processed by ECLABS.</li>
                        <li>Purchase verification is handled through Apple&apos;s StoreKit 2 and the result is stored on your device.</li>
                        <li>Apple&apos;s own privacy policy applies: <a className="text-cyan-300 hover:text-cyan-200" href="https://apple.com/legal/privacy" target="_blank" rel="noreferrer">apple.com/legal/privacy</a></li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">5. Third Parties</h2>
                    <p>Atlasly interacts with one third party:</p>

                    <div className="mt-3 overflow-x-auto">
                        <table className="w-full text-left text-sm text-white/70">
                            <thead>
                                <tr className="border-b border-white/10 text-white/90">
                                    <th className="py-2 pr-4 font-semibold">Party</th>
                                    <th className="py-2 pr-4 font-semibold">Purpose</th>
                                    <th className="py-2 pr-4 font-semibold">Policy</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 pr-4">Apple Inc.</td>
                                    <td className="py-2 pr-4">App Store distribution and in-app purchases (StoreKit)</td>
                                    <td className="py-2 pr-4">
                                        <a className="text-cyan-300 hover:text-cyan-200" href="https://apple.com/legal/privacy" target="_blank" rel="noreferrer">
                                            apple.com/legal/privacy
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-3">The app does not include Google Analytics, Firebase, Facebook SDK, Mixpanel, Amplitude, Adjust, or any other analytics or advertising SDK.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">6. Data Security</h2>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>All app data is stored exclusively on your device.</li>
                        <li>Your device&apos;s built-in security mechanisms (encryption, biometric lock, etc.) protect your data.</li>
                        <li>An internet connection is only required for purchase verification; all other features work offline.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">7. Children&apos;s Privacy</h2>
                    <p>Atlasly does not knowingly collect personal data from children under 13. Since the app requires no account and sends no personal data to any server, it presents no additional risk under COPPA or similar regulations.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">8. Your Rights</h2>
                    <p>Since all data is stored on your device:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                        <li>Access: You can access your data within the app at any time.</li>
                        <li>Deletion: Deleting the app from your device removes all data automatically. You can also use the in-app &quot;Reset Data&quot; feature (Pro).</li>
                        <li>Portability: Since data is on your device, you are in full control.</li>
                    </ul>
                    <p className="mt-2">For rights under applicable privacy laws (GDPR, CCPA, KVKK, etc.), please use the contact information below.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">9. Changes to This Policy</h2>
                    <p>We may update this policy occasionally. For significant changes, the updated policy will be published on this page with a revised &quot;Last updated&quot; date. Since Atlasly operates no data servers, changes do not directly affect your data.</p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-tight mb-3">10. Contact</h2>
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

export default AtlaslyPrivacyPage;
