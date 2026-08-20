"use client";

import { useCallback, useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  cancelReservation,
  getMyReservations,
  isLoggedIn,
  payReservation,
  rescheduleReservation,
  subscribeToAuthChanges,
  UnauthorizedError,
  type Reservation,
} from "@/lib/api";
import { STATUS_LABEL, formatRange } from "@/lib/format";

const PETOS_LABEL: Record<string, string> = {
  none: "Sin petos",
  red: "Rojo",
  blue: "Azul",
};

const PAYMENT_LABEL: Record<string, string> = {
  pending: "Pendiente",
  paid: "Pagado",
};

function getServerSnapshot() {
  return false;
}

function toDateInputValue(d: Date) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toTimeInputValue(d: Date) {
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default function MisReservasPage() {
  const router = useRouter();
  const loggedIn = useSyncExternalStore(
    subscribeToAuthChanges,
    isLoggedIn,
    getServerSnapshot,
  );

  const [reservations, setReservations] = useState<Reservation[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [rowError, setRowError] = useState<{ id: string; message: string } | null>(null);

  const [rescheduleTarget, setRescheduleTarget] = useState<Reservation | null>(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);
  const [rescheduleLoading, setRescheduleLoading] = useState(false);

  const loadReservations = useCallback(async () => {
    try {
      const data = await getMyReservations();
      setReservations(data);
      setLoadError(null);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        router.replace("/login");
        return;
      }
      setLoadError(
        err instanceof Error ? err.message : "No se pudieron cargar tus reservas",
      );
    }
  }, [router]);

  useEffect(() => {
    if (!loggedIn) {
      router.replace("/login");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const data = await getMyReservations();
        if (cancelled) return;
        setReservations(data);
        setLoadError(null);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof UnauthorizedError) {
          router.replace("/login");
          return;
        }
        setLoadError(
          err instanceof Error ? err.message : "No se pudieron cargar tus reservas",
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loggedIn, router]);

  async function handleCancel(id: string) {
    setActionLoadingId(id);
    setRowError(null);

    try {
      await cancelReservation(id);
      await loadReservations();
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        router.replace("/login");
        return;
      }
      setRowError({
        id,
        message: err instanceof Error ? err.message : "No se pudo cancelar la reserva",
      });
    } finally {
      setActionLoadingId(null);
    }
  }

  async function handlePay(id: string) {
    setActionLoadingId(id);
    setRowError(null);

    try {
      await payReservation(id);
      await loadReservations();
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        router.replace("/login");
        return;
      }
      setRowError({
        id,
        message: err instanceof Error ? err.message : "No se pudo procesar el pago",
      });
    } finally {
      setActionLoadingId(null);
    }
  }

  function openReschedule(reservation: Reservation) {
    const start = new Date(reservation.startTime);
    const end = new Date(reservation.endTime);
    setRescheduleTarget(reservation);
    setDate(toDateInputValue(start));
    setStartTime(toTimeInputValue(start));
    setEndTime(toTimeInputValue(end));
    setRescheduleError(null);
  }

  function closeReschedule() {
    setRescheduleTarget(null);
    setRescheduleError(null);
  }

  async function handleRescheduleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!rescheduleTarget) return;
    setRescheduleError(null);

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (start >= end) {
      setRescheduleError("La hora de inicio debe ser anterior a la hora de fin");
      return;
    }

    setRescheduleLoading(true);

    try {
      await rescheduleReservation(
        rescheduleTarget.id,
        start.toISOString(),
        end.toISOString(),
      );
      setRescheduleTarget(null);
      await loadReservations();
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        router.replace("/login");
        return;
      }
      setRescheduleError(
        err instanceof Error ? err.message : "No se pudo reagendar la reserva",
      );
    } finally {
      setRescheduleLoading(false);
    }
  }

  return (
    <main className="flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold">Mis reservas</h1>

      {loadError && <p className="mt-6 text-sm text-red-600">{loadError}</p>}

      {!loadError && reservations === null && (
        <p className="mt-6 text-zinc-500">Cargando tus reservas...</p>
      )}

      {!loadError && reservations !== null && reservations.length === 0 && (
        <p className="mt-6 text-zinc-500">Todavía no tenés reservas.</p>
      )}

      {!loadError && reservations !== null && reservations.length > 0 && (
        <ul className="mt-6 space-y-4">
          {reservations.map((reservation) => (
            <li
              key={reservation.id}
              className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">{reservation.court.name}</h2>
                  <p className="text-sm text-zinc-500">
                    {formatRange(reservation.startTime, reservation.endTime)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-medium">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">
                    {STATUS_LABEL[reservation.status] ?? reservation.status}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">
                    {PETOS_LABEL[reservation.petosColor] ?? reservation.petosColor}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">
                    {PAYMENT_LABEL[reservation.paymentStatus] ?? reservation.paymentStatus}
                  </span>
                </div>
              </div>

              {rowError?.id === reservation.id && (
                <p className="mt-3 text-sm text-red-600">{rowError.message}</p>
              )}

              {reservation.status !== "cancelled" && (
                <div className="mt-4 flex gap-3">
                  {reservation.status === "confirmed" &&
                    reservation.paymentStatus === "pending" && (
                      <button
                        type="button"
                        onClick={() => handlePay(reservation.id)}
                        disabled={actionLoadingId === reservation.id}
                        className="rounded-full bg-brand-violet px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-violet/85 disabled:opacity-60"
                      >
                        {actionLoadingId === reservation.id ? "Pagando..." : "Pagar"}
                      </button>
                    )}
                  <button
                    type="button"
                    onClick={() => openReschedule(reservation)}
                    disabled={actionLoadingId === reservation.id}
                    className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 disabled:opacity-60 dark:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    Reagendar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCancel(reservation.id)}
                    disabled={actionLoadingId === reservation.id}
                    className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60 dark:border-red-900 dark:hover:bg-red-950"
                  >
                    {actionLoadingId === reservation.id ? "Cancelando..." : "Cancelar"}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {rescheduleTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 dark:bg-zinc-900">
            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold">
                Reagendar {rescheduleTarget.court.name}
              </h3>

              <div className="space-y-1">
                <label htmlFor="reschedule-date" className="text-sm font-medium">
                  Fecha
                </label>
                <input
                  id="reschedule-date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="reschedule-start" className="text-sm font-medium">
                    Desde
                  </label>
                  <input
                    id="reschedule-start"
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="reschedule-end" className="text-sm font-medium">
                    Hasta
                  </label>
                  <input
                    id="reschedule-end"
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
                  />
                </div>
              </div>

              {rescheduleError && (
                <p className="text-sm text-red-600">{rescheduleError}</p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeReschedule}
                  className="w-full rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={rescheduleLoading}
                  className="w-full rounded-full bg-brand-violet px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-violet/85 disabled:opacity-60"
                >
                  {rescheduleLoading ? "Guardando..." : "Confirmar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
