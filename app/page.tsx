import { getCourts } from "@/lib/api";
import CourtCard from "./_components/CourtCard";

export default async function Home() {
  let courts: Awaited<ReturnType<typeof getCourts>> = [];
  let error = false;

  try {
    courts = await getCourts();
  } catch {
    error = true;
  }

  return (
    <main className="flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold">Canchas disponibles</h1>

      {error && (
        <p className="mt-6 text-zinc-500">
          No se pudieron cargar las canchas. Intentá de nuevo más tarde.
        </p>
      )}

      {!error && courts.length === 0 && (
        <p className="mt-6 text-zinc-500">
          No hay canchas disponibles por el momento.
        </p>
      )}

      {!error && courts.length > 0 && (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courts.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </ul>
      )}
    </main>
  );
}
