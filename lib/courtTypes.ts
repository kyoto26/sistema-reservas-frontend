import type { Court } from "@/lib/api";
import { dictionaries, type Dictionary } from "@/lib/i18n/translations";

export type CourtTypeInfo = {
  label: string;
  lengthM: number;
  widthM: number;
};

type CourtDimensions = { lengthM: number; widthM: number };

/**
 * Only fútbol 11 has one universal regulation size (FIFA: 105x68m).
 * 5/6/8 vary by venue — these are representative typical sizes, chosen
 * so the four pitches read at correct relative scale against each other.
 */
const KNOWN_DIMENSIONS: Record<string, CourtDimensions> = {
  futbol5: { lengthM: 25, widthM: 16 },
  futbol6: { lengthM: 34, widthM: 18 },
  futbol8: { lengthM: 58, widthM: 38 },
  futbol11: { lengthM: 105, widthM: 68 },
};

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getCourtDimensions(sportType: string): CourtDimensions {
  const key = sportType.trim().toLowerCase();
  const known = KNOWN_DIMENSIONS[key];
  if (known) return known;

  const match = key.match(/(\d+)/);
  if (match) {
    const players = Number(match[1]);
    const widthM = Math.min(70, Math.max(14, players * 3.2));
    return { lengthM: widthM * 1.55, widthM };
  }

  return { lengthM: 40, widthM: 24 };
}

/**
 * Only the 4 known sport types (futbol5/6/8/11) are translated via the
 * dictionary. Any other `sportType` is data an admin typed into the backend
 * (e.g. "Pádel") and is shown as-is, unaffected by the language toggle.
 */
export function getCourtTypeLabel(sportType: string, dict: Dictionary): string {
  const key = sportType.trim().toLowerCase();
  if (key in dict.courtType) {
    return dict.courtType[key as keyof typeof dict.courtType] as string;
  }
  return capitalize(sportType.trim()) || dict.courtType.genericFallback;
}

export function getCourtTypeInfo(sportType: string, dict: Dictionary): CourtTypeInfo {
  return {
    label: getCourtTypeLabel(sportType, dict),
    ...getCourtDimensions(sportType),
  };
}

export type CourtGroup = {
  sportType: string;
  info: CourtTypeInfo;
  courts: Court[];
};

const DISPLAY_ORDER = ["futbol5", "futbol6", "futbol8", "futbol11"];

export function groupCourtsByType(courts: Court[], dict: Dictionary): CourtGroup[] {
  const byType = new Map<string, Court[]>();

  for (const court of courts) {
    const key = court.sportType.trim().toLowerCase();
    const list = byType.get(key);
    if (list) list.push(court);
    else byType.set(key, [court]);
  }

  const keys = Array.from(byType.keys()).sort((a, b) => {
    const orderA = DISPLAY_ORDER.indexOf(a);
    const orderB = DISPLAY_ORDER.indexOf(b);
    if (orderA !== -1 && orderB !== -1) return orderA - orderB;
    if (orderA !== -1) return -1;
    if (orderB !== -1) return 1;
    return a.localeCompare(b);
  });

  return keys.map((sportType) => ({
    sportType,
    info: getCourtTypeInfo(sportType, dict),
    courts: byType.get(sportType)!,
  }));
}

/**
 * Derives a short tab label ("A", "B") from the court's own name, e.g.
 * "Cancha Fútbol 5 - A" -> "A". Court names are admin-entered data and are
 * always Spanish regardless of the UI language, so this always matches
 * against the Spanish label (dictionaries.es), never the translated one —
 * otherwise the prefix wouldn't match court.name when the UI is in English.
 */
export function instanceLabel(
  court: Court,
  sportType: string,
  index: number,
  dict: Dictionary,
): string {
  const esLabel = getCourtTypeLabel(sportType, dictionaries.es);
  const prefix = `Cancha ${esLabel}`;
  if (court.name.toLowerCase().startsWith(prefix.toLowerCase())) {
    const rest = court.name.slice(prefix.length).replace(/^[\s-]+/, "").trim();
    if (rest) return rest;
  }
  return `${dict.courtType.genericFallback} ${index + 1}`;
}
