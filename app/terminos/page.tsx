"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import LegalPage from "../_components/LegalPage";

export default function TerminosPage() {
  const { dict } = useLanguage();
  return <LegalPage title={dict.terms.title} sections={dict.terms.sections} />;
}
