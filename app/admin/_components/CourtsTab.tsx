"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createCourt,
  deleteCourt,
  ForbiddenError,
  getCourts,
  updateCourt,
  UnauthorizedError,
  type Court,
} from "@/lib/api";

type CourtForm = {
  name: string;
  sportType: string;
  pricePerHour: string;
};

const EMPTY_FORM: CourtForm = { name: "", sportType: "", pricePerHour: "" };

export default function CourtsTab() {
  const router = useRouter();
  const [courts, setCourts] = useState<Court[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [createForm, setCreateForm] = useState<CourtForm>(EMPTY_FORM);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createLoading, setCreateLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<CourtForm>(EMPTY_FORM);
  const [rowError, setRowError] = useState<{ id: string; message: string } | null>(null);
  const [rowLoadingId, setRowLoadingId] = useState<string | null>(null);

  const loadCourts = useCallback(async () => {
    try {
      const data = await getCourts();
      setCourts(data);
      setLoadError(null);
    } catch (err) {
      setLoadError(
        err instanceof Error ? err.message : "No se pudieron cargar las canchas",
      );
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getCourts();
        if (cancelled) return;
        setCourts(data);
        setLoadError(null);
      } catch (err) {
        if (cancelled) return;
        setLoadError(
          err instanceof Error ? err.message : "No se pudieron cargar las canchas",
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleAuthError(err: unknown): boolean {
    if (err instanceof UnauthorizedError || err instanceof ForbiddenError) {
      router.replace("/");
      return true;
    }
    return false;
  }

  async function handleCreateSubmit(e: FormEvent) {
    e.preventDefault();
    setCreateError(null);

    const pricePerHour = Number(createForm.pricePerHour);
    if (!createForm.name.trim() || !createForm.sportType.trim() || !(pricePerHour > 0)) {
      setCreateError("Completá nombre, deporte y un precio válido");
      return;
    }

    setCreateLoading(true);

    try {
      await createCourt({
        name: createForm.name.trim(),
        sportType: createForm.sportType.trim(),
        pricePerHour,
      });
      setCreateForm(EMPTY_FORM);
      await loadCourts();
    } catch (err) {
      if (handleAuthError(err)) return;
      setCreateError(err instanceof Error ? err.message : "No se pudo crear la cancha");
    } finally {
      setCreateLoading(false);
    }
  }

  function openEdit(court: Court) {
    setEditingId(court.id);
    setEditForm({
      name: court.name,
      sportType: court.sportType,
      pricePerHour: court.pricePerHour,
    });
    setRowError(null);
  }

  function closeEdit() {
    setEditingId(null);
    setRowError(null);
  }

  async function handleEditSubmit(e: FormEvent, id: string) {
    e.preventDefault();
    setRowError(null);

    const pricePerHour = Number(editForm.pricePerHour);
    if (!editForm.name.trim() || !editForm.sportType.trim() || !(pricePerHour > 0)) {
      setRowError({ id, message: "Completá nombre, deporte y un precio válido" });
      return;
    }

    setRowLoadingId(id);

    try {
      await updateCourt(id, {
        name: editForm.name.trim(),
        sportType: editForm.sportType.trim(),
        pricePerHour,
      });
      setEditingId(null);
      await loadCourts();
    } catch (err) {
      if (handleAuthError(err)) return;
      setRowError({
        id,
        message: err instanceof Error ? err.message : "No se pudo actualizar la cancha",
      });
    } finally {
      setRowLoadingId(null);
    }
  }

  async function handleDelete(court: Court) {
    if (!window.confirm(`¿Eliminar "${court.name}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    setRowError(null);
    setRowLoadingId(court.id);

    try {
      await deleteCourt(court.id);
      await loadCourts();
    } catch (err) {
      if (handleAuthError(err)) return;
      setRowError({
        id: court.id,
        message: err instanceof Error ? err.message : "No se pudo eliminar la cancha",
      });
    } finally {
      setRowLoadingId(null);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleCreateSubmit}
        className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
      >
        <div className="space-y-1">
          <label htmlFor="new-name" className="text-sm font-medium">
            Nombre
          </label>
          <input
            id="new-name"
            type="text"
            required
            value={createForm.name}
            onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
            className="rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="new-sportType" className="text-sm font-medium">
            Deporte
          </label>
          <input
            id="new-sportType"
            type="text"
            required
            value={createForm.sportType}
            onChange={(e) => setCreateForm({ ...createForm, sportType: e.target.value })}
            className="rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="new-price" className="text-sm font-medium">
            Precio/hora
          </label>
          <input
            id="new-price"
            type="number"
            min="1"
            step="1"
            required
            value={createForm.pricePerHour}
            onChange={(e) =>
              setCreateForm({ ...createForm, pricePerHour: e.target.value })
            }
            className="w-32 rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
          />
        </div>

        <button
          type="submit"
          disabled={createLoading}
          className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800 disabled:opacity-60"
        >
          {createLoading ? "Creando..." : "Crear cancha"}
        </button>

        {createError && <p className="w-full text-sm text-red-600">{createError}</p>}
      </form>

      {loadError && <p className="mt-6 text-sm text-red-600">{loadError}</p>}

      {!loadError && courts === null && (
        <p className="mt-6 text-zinc-500">Cargando canchas...</p>
      )}

      {!loadError && courts !== null && courts.length === 0 && (
        <p className="mt-6 text-zinc-500">No hay canchas registradas.</p>
      )}

      {!loadError && courts !== null && courts.length > 0 && (
        <ul className="mt-6 space-y-4">
          {courts.map((court) => (
            <li
              key={court.id}
              className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
            >
              {editingId === court.id ? (
                <form
                  onSubmit={(e) => handleEditSubmit(e, court.id)}
                  className="flex flex-wrap items-end gap-3"
                >
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Nombre</label>
                    <input
                      type="text"
                      required
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Deporte</label>
                    <input
                      type="text"
                      required
                      value={editForm.sportType}
                      onChange={(e) =>
                        setEditForm({ ...editForm, sportType: e.target.value })
                      }
                      className="rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Precio/hora</label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      required
                      value={editForm.pricePerHour}
                      onChange={(e) =>
                        setEditForm({ ...editForm, pricePerHour: e.target.value })
                      }
                      className="w-32 rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={closeEdit}
                    className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={rowLoadingId === court.id}
                    className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800 disabled:opacity-60"
                  >
                    {rowLoadingId === court.id ? "Guardando..." : "Guardar"}
                  </button>

                  {rowError?.id === court.id && (
                    <p className="w-full text-sm text-red-600">{rowError.message}</p>
                  )}
                </form>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{court.name}</h2>
                    <p className="text-sm text-zinc-500">{court.sportType}</p>
                    <p className="mt-1 font-medium">
                      ${Number(court.pricePerHour).toLocaleString("es-CO")} / hora
                    </p>
                    {rowError?.id === court.id && (
                      <p className="mt-2 text-sm text-red-600">{rowError.message}</p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => openEdit(court)}
                      disabled={rowLoadingId === court.id}
                      className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 disabled:opacity-60 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(court)}
                      disabled={rowLoadingId === court.id}
                      className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60 dark:border-red-900 dark:hover:bg-red-950"
                    >
                      {rowLoadingId === court.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
