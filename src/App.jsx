import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Home from "./pages/Home";
import PrivacyPage from "./pages/Privacy";
import SaatlikAyetPrivacyPage from "./pages/SaatlikAyetPrivacy";
import AtlaslyPrivacyPage from "./pages/AtlaslyPrivacy";
import NovagaiaAscendPrivacyPage from "./pages/NovagaiaAscendPrivacy";
import TermsPage from "./pages/Terms";
import ContactPage from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/privacy-saatlikayet" element={<SaatlikAyetPrivacyPage />} />
        <Route path="/privacy-atlasly" element={<AtlaslyPrivacyPage />} />
        <Route path="/privacy-novagaia-ascend" element={<NovagaiaAscendPrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </ErrorBoundary>
  );
}