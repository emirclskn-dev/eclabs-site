import React from "react";
import { Link } from "react-router-dom";
import LegalShell, { WAITLIST_EMAIL, getLang } from "../components/layout/LegalShell";

function PrivacyPage() {
    const lang = getLang();

    if (lang === "en") {
        return (
            <LegalShell title="Privacy Policy">
                <p>This website (ECLABS) is a landing page for product information and contact purposes. We do not provide user accounts on this site and we do not process profile-based personal data through a login system.</p>
                <h2 className="mt-6 text-white font-bold tracking-tight">Data We Collect</h2>
                <ul className="mt-3 list-disc pl-5 space-y-2">
                    <li><span className="text-white/80 font-semibold">Contact email:</span> “Notify Me” and “Email” buttons open your email app via a mailto link.</li>
                    <li><span className="text-white/80 font-semibold">Technical logs:</span> Our hosting provider may automatically record limited technical data for security and debugging purposes.</li>
                    <li><span className="text-white/80 font-semibold">Analytics (optional):</span> Aggregated traffic and performance metrics may be collected.</li>
                </ul>
                <h2 className="mt-6 text-white font-bold tracking-tight">App-Specific Policies</h2>
                <ul className="mt-3 list-disc pl-5 space-y-2">
                    <li>
                        <Link to="/privacy-atlasly" className="text-cyan-300 hover:text-cyan-200">Atlasly Privacy Policy</Link>
                    </li>
                    <li>
                        <Link to="/privacy-saatlikayet" className="text-cyan-300 hover:text-cyan-200">SaatlikAyet Privacy Policy</Link>
                    </li>
                </ul>
                <h2 className="mt-6 text-white font-bold tracking-tight">Cookies</h2>
                <p className="mt-3">We may not use non-essential cookies on this site.</p>
                <h2 className="mt-6 text-white font-bold tracking-tight">Purpose and Legal Basis</h2>
                <ul className="mt-3 list-disc pl-5 space-y-2">
                    <li>Responding to contact requests (legitimate interests).</li>
                    <li>Site security and debugging (legitimate interests).</li>
                </ul>
                <p className="mt-6">Contact: <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${WAITLIST_EMAIL}`}>{WAITLIST_EMAIL}</a></p>
                <p className="mt-2 text-white/40 text-xs">Last updated: February 26, 2026</p>
            </LegalShell>
        );
    }

    return (
        <LegalShell title="Gizlilik Politikası">
            <p>Bu web sitesi (ECLABS) ürün tanıtımı ve iletişim amaçlı bir “landing” sayfasıdır. Bu sitede kullanıcı hesabı oluşturulmaz ve doğrudan profil/üyelik bazlı kişisel veri işleme yapılmaz.</p>
            <h2 className="mt-6 text-white font-bold tracking-tight">Toplanan Veriler</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2">
                <li><span className="text-white/80 font-semibold">İletişim e-postası:</span> “Beni Bilgilendir” ve “Email" butonları cihazındaki e-posta uygulamasını açar.</li>
                <li><span className="text-white/80 font-semibold">Teknik günlükler (log):</span> Güvenlik ve hata ayıklama amacıyla IP adresi gibi sınırlı teknik veriler kaydedilebilir.</li>
            </ul>

            <h2 className="mt-6 text-white font-bold tracking-tight">Uygulamalarımıza Özel Politikalar</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2">
                <li>
                    <Link to="/privacy-atlasly" className="text-cyan-300 hover:text-cyan-200">Atlasly Gizlilik Politikası</Link>
                </li>
                <li>
                    <Link to="/privacy-saatlikayet" className="text-cyan-300 hover:text-cyan-200">SaatlikAyet Gizlilik Politikası</Link>
                </li>
            </ul>

            <h2 className="mt-6 text-white font-bold tracking-tight">Çerezler</h2>
            <p className="mt-3">Bu sitede zorunlu olmayan çerezler kullanılmayabilir.</p>
            <p className="mt-6">İletişim: <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${WAITLIST_EMAIL}`}>{WAITLIST_EMAIL}</a></p>
            <p className="mt-2 text-white/40 text-xs">Son güncelleme: 26 Şubat 2026</p>
        </LegalShell>
    );
}

export default PrivacyPage;