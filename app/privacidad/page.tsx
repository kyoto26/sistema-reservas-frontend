"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import LegalPage from "../_components/LegalPage";

export default function PrivacidadPage() {
  const { dict } = useLanguage();
  return <LegalPage title={dict.privacy.title} sections={dict.privacy.sections} />;
}
