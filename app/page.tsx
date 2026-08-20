import { getCourts } from "@/lib/api";
import CourtsBrowser from "./_components/CourtsBrowser";

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
      <CourtsBrowser initialCourts={courts} initialError={error} />
    </main>
  );
}
