"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  cancelReservation,
  ForbiddenError,
  getAllReservations,
  UnauthorizedError,
  type AdminReservation,
} from "@/lib/api";
import { STATUS_LABEL, formatRange } from "@/lib/format";

export default function ReservationsTab() {
  const router = useRouter();
  const [reservations, setReservations] = useState<AdminReservation[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [rowError, setRowError] = useState<{ id: string; message: string } | null>(null);

  const loadReservations = useCallback(async () => {
    try {
      const data = await getAllReservations();
      setReservations(data);
      setLoadError(null);
    } catch (err) {
      if (err instanceof UnauthorizedError || err instanceof ForbiddenError) {
        router.replace("/");
        return;
      }
      setLoadError(
        err instanceof Error ? err.message : "No se pudieron cargar las reservas",
      );
    }
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getAllReservations();
        if (cancelled) return;
        setReservations(data);
        setLoadError(null);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof UnauthorizedError || err instanceof ForbiddenError) {
          router.replace("/");
          return;
        }
        setLoadError(
          err instanceof Error ? err.message : "No se pudieron cargar las reservas",
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleCancel(id: string) {
    setActionLoadingId(id);
    setRowError(null);

    try {
      await cancelReservation(id);
      await loadReservations();
    } catch (err) {
      if (err instanceof UnauthorizedError || err instanceof ForbiddenError) {
        router.replace("/");
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

  return (
    <div>
      {loadError && <p className="mt-6 text-sm text-red-600">{loadError}</p>}

      {!loadError && reservations === null && (
        <p className="mt-6 text-zinc-500">Cargando reservas...</p>
      )}

      {!loadError && reservations !== null && reservations.length === 0 && (
        <p className="mt-6 text-zinc-500">No hay reservas registradas.</p>
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
                    {reservation.user.name} · {reservation.user.email}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {formatRange(reservation.startTime, reservation.endTime)}
                  </p>
                </div>

                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-800">
                  {STATUS_LABEL[reservation.status] ?? reservation.status}
                </span>
              </div>

              {rowError?.id === reservation.id && (
                <p className="mt-3 text-sm text-red-600">{rowError.message}</p>
              )}

              {reservation.status !== "cancelled" && (
                <div className="mt-4">
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
    </div>
  );
}
