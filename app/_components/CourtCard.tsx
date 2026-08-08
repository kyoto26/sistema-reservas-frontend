"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createReservation,
  isLoggedIn,
  UnauthorizedError,
  type Court,
} from "@/lib/api";
import { instanceLabel } from "@/lib/courtTypes";
import PitchDiagram from "./PitchDiagram";

const PETOS_OPTIONS = [
  { value: "none", label: "Sin petos" },
  { value: "red", label: "Petos rojos" },
  { value: "blue", label: "Petos azules" },
] as const;

export default function CourtCard({
  typeLabel,
  lengthM,
  widthM,
  courts,
}: {
  typeLabel: string;
  lengthM: number;
  widthM: number;
  courts: Court[];
}) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const court = courts[selectedIndex];

  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [petosColor, setPetosColor] =
    useState<(typeof PETOS_OPTIONS)[number]["value"]>("none");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleReservarClick() {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }
    setModalOpen(true);
  }

  function resetAndClose() {
    setModalOpen(false);
    setDate("");
    setStartTime("");
    setEndTime("");
    setPetosColor("none");
    setError(null);
    setSuccess(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (start >= end) {
      setError("La hora de inicio debe ser anterior a la hora de fin");
      return;
    }

    setLoading(true);

    try {
      await createReservation({
        courtId: court.id,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        petosColor,
      });
      setSuccess(true);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        setModalOpen(false);
        router.push("/login");
        return;
      }
      setError(err instanceof Error ? err.message : "No se pudo crear la reserva");
    } finally {
      setLoading(false);
    }
  }

  return (
    <li className="overflow-hidden rounded-xl border border-brand-red/30">
      <PitchDiagram lengthM={lengthM} widthM={widthM} className="block w-full" />

      <div className="p-5">
        <h2 className="font-heading text-xl">{typeLabel}</h2>
        <p className="mt-3 font-medium">
          ${Number(court.pricePerHour).toLocaleString("es-CO")} / hora
        </p>

        {courts.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {courts.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  i === selectedIndex
                    ? "bg-brand-red text-white"
                    : "border border-zinc-700 text-zinc-300 hover:bg-white/10"
                }`}
              >
                {instanceLabel(c, typeLabel, i)}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleReservarClick}
          className="mt-4 w-full rounded-full bg-brand-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-red/85"
        >
          Reservar
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 dark:bg-zinc-900">
            {success ? (
              <div className="space-y-4">
                <h3 className="font-heading text-xl">¡Reserva confirmada!</h3>
                <p className="text-sm text-zinc-500">
                  Tu reserva para {court.name} quedó registrada.
                </p>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full rounded-full bg-brand-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-red/85"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading text-xl">Reservar {court.name}</h3>

                <div className="space-y-1">
                  <label htmlFor="date" className="text-sm font-medium">
                    Fecha
                  </label>
                  <input
                    id="date"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="startTime" className="text-sm font-medium">
                      Desde
                    </label>
                    <input
                      id="startTime"
                      type="time"
                      required
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="endTime" className="text-sm font-medium">
                      Hasta
                    </label>
                    <input
                      id="endTime"
                      type="time"
                      required
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="petosColor" className="text-sm font-medium">
                    Petos
                  </label>
                  <select
                    id="petosColor"
                    value={petosColor}
                    onChange={(e) =>
                      setPetosColor(
                        e.target.value as (typeof PETOS_OPTIONS)[number]["value"],
                      )
                    }
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    {PETOS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="w-full rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-brand-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-red/85 disabled:opacity-60"
                  >
                    {loading ? "Reservando..." : "Confirmar"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
