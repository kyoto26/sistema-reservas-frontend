import type { Language } from "./i18n/translations";

/**
 * Date/time formatting follows the UI language. Money stays fixed to es-CO
 * everywhere (the business charges in Colombian pesos regardless of the
 * language the interface is shown in) — see CourtCard.tsx / CourtsTab.tsx.
 */
function localeFor(language: Language): string {
  return language === "en" ? "en-US" : "es-CO";
}

export function formatRange(startIso: string, endIso: string, language: Language): string {
  const locale = localeFor(language);
  const start = new Date(startIso);
  const end = new Date(endIso);
  const dateStr = start.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const startStr = start.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endStr = end.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateStr} · ${startStr} - ${endStr}`;
}
