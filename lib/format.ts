export const STATUS_LABEL: Record<string, string> = {
  confirmed: "Confirmada",
  cancelled: "Cancelada",
};

export function formatRange(startIso: string, endIso: string): string {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const dateStr = start.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const startStr = start.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endStr = end.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateStr} · ${startStr} - ${endStr}`;
}
