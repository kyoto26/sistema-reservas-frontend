"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LANGUAGES, type Language } from "@/lib/i18n/translations";

export default function LanguageSwitcher() {
  const { language, setLanguage, dict } = useLanguage();

  return (
    <div
      role="group"
      aria-label={dict.languageSwitcher.groupLabel}
      className="flex items-center gap-1 rounded-full border border-zinc-700 p-1 text-sm font-medium"
    >
      {LANGUAGES.map((lang: Language) => {
        const active = lang === language;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 transition-colors ${
              active
                ? "bg-brand-violet text-white"
                : "text-zinc-300 hover:bg-white/10"
            }`}
          >
            {dict.languageSwitcher[lang]}
          </button>
        );
      })}
    </div>
  );
}
