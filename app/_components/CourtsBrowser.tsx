"use client";

import { useMemo, useState, type FormEvent } from "react";
import { getCourts, type Court } from "@/lib/api";
import { groupCourtsByType, getCourtTypeLabel } from "@/lib/courtTypes";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import CourtCard from "./CourtCard";

const DISPLAY_ORDER = ["futbol5", "futbol6", "futbol8", "futbol11"];

function availableTypes(courts: Court[]): string[] {
  const keys = Array.from(new Set(courts.map((c) => c.sportType.trim().toLowerCase())));
  return keys.sort((a, b) => {
    const orderA = DISPLAY_ORDER.indexOf(a);
    const orderB = DISPLAY_ORDER.indexOf(b);
    if (orderA !== -1 && orderB !== -1) return orderA - orderB;
    if (orderA !== -1) return -1;
    if (orderB !== -1) return 1;
    return a.localeCompare(b);
  });
}

export default function CourtsBrowser({
  initialCourts,
  initialError,
}: {
  initialCourts: Court[];
  initialError: boolean;
}) {
  const { dict } = useLanguage();
  const [courts, setCourts] = useState(initialCourts);
  const [error, setError] = useState(initialError);

  const types = useMemo(() => availableTypes(initialCourts), [initialCourts]);
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set(types));

  const maxPossiblePrice = useMemo(
    () =>
      initialCourts.length > 0
        ? Math.max(...initialCourts.map((c) => Number(c.pricePerHour)))
        : 0,
    [initialCourts],
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const [date, setDate] = useState("");
  const [scheduleStart, setScheduleStart] = useState("");
  const [scheduleEnd, setScheduleEnd] = useState("");
  const [scheduleApplied, setScheduleApplied] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleError, setScheduleError] = useState<string | null>(null);

  function toggleType(type: string) {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

  async function handleScheduleSubmit(e: FormEvent) {
    e.preventDefault();
    setScheduleError(null);

    const start = new Date(`${date}T${scheduleStart}`);
    const end = new Date(`${date}T${scheduleEnd}`);

    if (start >= end) {
      setScheduleError(dict.common.errors.startBeforeEnd);
      return;
    }

    setScheduleLoading(true);
    try {
      const result = await getCourts({
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      });
      setCourts(result);
      setError(false);
      setScheduleApplied(true);
    } catch {
      setScheduleError(dict.filters.error.scheduleFilter);
    } finally {
      setScheduleLoading(false);
    }
  }

  function clearSchedule() {
    setDate("");
    setScheduleStart("");
    setScheduleEnd("");
    setScheduleError(null);
    setScheduleApplied(false);
    setCourts(initialCourts);
    setError(initialError);
  }

  const filteredCourts = useMemo(
    () =>
      courts.filter((c) => {
        if (!selectedTypes.has(c.sportType.trim().toLowerCase())) return false;
        if (maxPrice !== null && Number(c.pricePerHour) > maxPrice) return false;
        return true;
      }),
    [courts, selectedTypes, maxPrice],
  );

  const groups = groupCourtsByType(filteredCourts, dict);

  return (
    <>
      <div className="mt-6 rounded-xl border border-brand-violet/30 bg-brand-black/5 p-4 dark:bg-white/5">
        <div className="flex flex-wrap gap-6">
          <div>
            <h2 className="text-sm font-semibold">{dict.filters.courtType.heading}</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {types.map((type) => {
                const label = getCourtTypeLabel(type, dict);
                const active = selectedTypes.has(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      active
                        ? "bg-brand-violet text-white"
                        : "border border-zinc-700 text-zinc-300 hover:bg-white/10"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold">
              {dict.filters.maxPrice.heading}
              {maxPrice !== null && (
                <span className="ml-1 font-normal text-zinc-500">
                  ${maxPrice.toLocaleString("es-CO")}
                </span>
              )}
            </h2>
            <input
              type="range"
              min={0}
              max={maxPossiblePrice}
              step={1000}
              value={maxPrice ?? maxPossiblePrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label={dict.filters.maxPrice.ariaLabel}
              className="mt-3 w-48 accent-brand-violet"
            />
            {maxPrice !== null && (
              <button
                type="button"
                onClick={() => setMaxPrice(null)}
                className="ml-2 text-xs text-zinc-500 underline"
              >
                {dict.filters.maxPrice.remove}
              </button>
            )}
          </div>

          <form onSubmit={handleScheduleSubmit} className="flex flex-wrap items-end gap-2">
            <div>
              <label htmlFor="filter-date" className="block text-sm font-semibold">
                {dict.filters.availability.label}
              </label>
              <input
                id="filter-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 rounded-lg border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
            <input
              type="time"
              required
              aria-label={dict.filters.time.fromAriaLabel}
              value={scheduleStart}
              onChange={(e) => setScheduleStart(e.target.value)}
              className="rounded-lg border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
            <input
              type="time"
              required
              aria-label={dict.filters.time.toAriaLabel}
              value={scheduleEnd}
              onChange={(e) => setScheduleEnd(e.target.value)}
              className="rounded-lg border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
            <button
              type="submit"
              disabled={scheduleLoading}
              className="rounded-full bg-brand-violet px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-violet/85 disabled:opacity-60"
            >
              {scheduleLoading ? dict.filters.apply.loading : dict.filters.apply.idle}
            </button>
            {scheduleApplied && (
              <button
                type="button"
                onClick={clearSchedule}
                className="rounded-full border border-zinc-700 px-4 py-1.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10"
              >
                {dict.filters.clear}
              </button>
            )}
          </form>
        </div>
        {scheduleError && <p className="mt-2 text-sm text-red-600">{scheduleError}</p>}
      </div>

      {error && (
        <p className="mt-6 text-zinc-500">{dict.courts.loadError}</p>
      )}

      {!error && filteredCourts.length === 0 && (
        <p className="mt-6 text-zinc-500">{dict.courts.emptyFiltered}</p>
      )}

      {!error && filteredCourts.length > 0 && (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <CourtCard
              key={group.sportType}
              sportType={group.sportType}
              typeLabel={group.info.label}
              lengthM={group.info.lengthM}
              widthM={group.info.widthM}
              courts={group.courts}
            />
          ))}
        </ul>
      )}
    </>
  );
}
