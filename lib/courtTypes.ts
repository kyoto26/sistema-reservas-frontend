import type { Court } from "@/lib/api";

export type CourtTypeInfo = {
  label: string;
  lengthM: number;
  widthM: number;
};

/**
 * Only fútbol 11 has one universal regulation size (FIFA: 105x68m).
 * 5/6/8 vary by venue — these are representative typical sizes, chosen
 * so the four pitches read at correct relative scale against each other.
 */
const KNOWN_TYPES: Record<string, CourtTypeInfo> = {
  futbol5: { label: "Fútbol 5", lengthM: 25, widthM: 16 },
  futbol6: { label: "Fútbol 6", lengthM: 34, widthM: 18 },
  futbol8: { label: "Fútbol 8", lengthM: 58, widthM: 38 },
  futbol11: { label: "Fútbol 11", lengthM: 105, widthM: 68 },
};

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getCourtTypeInfo(sportType: string): CourtTypeInfo {
  const key = sportType.trim().toLowerCase();
  const known = KNOWN_TYPES[key];
  if (known) return known;

  const match = key.match(/(\d+)/);
  const label = capitalize(sportType.trim()) || "Cancha";

  if (match) {
    const players = Number(match[1]);
    const widthM = Math.min(70, Math.max(14, players * 3.2));
    return { label, lengthM: widthM * 1.55, widthM };
  }

  return { label, lengthM: 40, widthM: 24 };
}

export type CourtGroup = {
  sportType: string;
  info: CourtTypeInfo;
  courts: Court[];
};

const DISPLAY_ORDER = ["futbol5", "futbol6", "futbol8", "futbol11"];

export function groupCourtsByType(courts: Court[]): CourtGroup[] {
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
    info: getCourtTypeInfo(sportType),
    courts: byType.get(sportType)!,
  }));
}

/** Derives a short tab label ("A", "B") from the court's own name. */
export function instanceLabel(court: Court, typeLabel: string, index: number): string {
  const prefix = `Cancha ${typeLabel}`;
  if (court.name.toLowerCase().startsWith(prefix.toLowerCase())) {
    const rest = court.name.slice(prefix.length).replace(/^[\s-]+/, "").trim();
    if (rest) return rest;
  }
  return `Cancha ${index + 1}`;
}
