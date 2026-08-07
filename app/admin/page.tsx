"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  ForbiddenError,
  getAllReservations,
  isAdmin,
  subscribeToAuthChanges,
  UnauthorizedError,
  type AdminReservation,
} from "@/lib/api";
import { STATUS_LABEL, formatRange } from "@/lib/format";

function getServerSnapshot() {
  return false;
}

export default function AdminPage() {
  const router = useRouter();
  const admin = useSyncExternalStore(
    subscribeToAuthChanges,
    isAdmin,
    getServerSnapshot,
  );

  const [reservations, setReservations] = useState<AdminReservation[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!admin) {
      router.replace("/");
      return;
    }

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
  }, [admin, router]);

  return (
    <main className="flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold">Panel de administración</h1>

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
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
