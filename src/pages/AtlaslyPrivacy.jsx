import React from "react";
import LegalShell, { WAITLIST_EMAIL } from "../components/layout/LegalShell";

function AtlaslyPrivacyPage() {
    return (
        <LegalShell title="Atlasly – Privacy Policy">
            <p>Atlasly is a private travel journal application designed to help you organize your travel memories. We prioritize your privacy and transparency regarding data usage.</p>

            <h2 className="mt-6 text-white font-bold tracking-tight">Data Collection</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2">
                <li><span className="text-white/80 font-semibold">Location Data:</span> The app may request access to your location to help you mark countries and cities on your map. This data is processed locally on your device.</li>
                <li><span className="text-white/80 font-semibold">Photos and Media:</span> If you choose to attach photos to your travel entries, the app will request access to your photo library. These photos remain on your device or your personal cloud storage.</li>
                <li><span className="text-white/80 font-semibold">User Content:</span> Your notes and travel history are stored locally. We do not maintain a central database of your personal travel entries.</li>
            </ul>

            <h2 className="mt-6 text-white font-bold tracking-tight">Third-Party Services</h2>
            <p className="mt-3">Atlasly may use standard platform services (like iCloud for sync) which are governed by Apple's privacy policy.</p>

            <p className="mt-6">Contact: <a className="text-cyan-300 hover:text-cyan-200" href={`mailto:${WAITLIST_EMAIL}`}>{WAITLIST_EMAIL}</a></p>
            <p className="mt-2 text-white/40 text-xs">Last updated: February 26, 2026</p>
        </LegalShell>
    );
}

export default AtlaslyPrivacyPage;
