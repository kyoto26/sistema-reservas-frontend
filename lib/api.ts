export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export type Court = {
  id: string;
  name: string;
  sportType: string;
  pricePerHour: string;
};

export async function getCourts(): Promise<Court[]> {
  const res = await fetch(`${API_URL}/courts`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("No se pudieron cargar las canchas");
  }

  return res.json();
}

const TOKEN_KEY = "access_token";
const AUTH_CHANGE_EVENT = "auth-change";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function subscribeToAuthChanges(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
  };
}

function decodeJwtPayload(token: string): { exp: number; role: string } | null {
  try {
    const [, payload] = token.split(".");
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  const token = getToken();
  if (!token) return false;

  const payload = decodeJwtPayload(token);
  if (!payload || payload.exp * 1000 <= Date.now()) {
    clearToken();
    return false;
  }

  return true;
}

export function isAdmin(): boolean {
  const token = getToken();
  if (!token) return false;

  const payload = decodeJwtPayload(token);
  if (!payload || payload.exp * 1000 <= Date.now()) {
    clearToken();
    return false;
  }

  return payload.role === "admin";
}

export async function login(email: string, password: string): Promise<void> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Email o contraseña incorrectos");
  }

  const data: { access_token: string } = await res.json();
  setToken(data.access_token);
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<void> {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (res.status === 409) {
    throw new Error("Ya existe un usuario con ese email");
  }

  if (!res.ok) {
    throw new Error("No se pudo completar el registro");
  }
}

export class UnauthorizedError extends Error {}
export class ForbiddenError extends Error {}

export type Reservation = {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  petosColor: string;
  paymentStatus: string;
  court: Court;
};

export async function createReservation(input: {
  courtId: string;
  startTime: string;
  endTime: string;
  petosColor?: "red" | "blue" | "none";
}): Promise<Reservation> {
  const token = getToken();
  if (!token) {
    throw new UnauthorizedError("No autenticado");
  }

  const res = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (res.status === 401) {
    clearToken();
    throw new UnauthorizedError("Tu sesión expiró, iniciá sesión de nuevo");
  }

  if (res.status === 409) {
    throw new Error("Ya existe una reserva para esa cancha en ese horario");
  }

  if (!res.ok) {
    const data: { message?: string } | null = await res.json().catch(() => null);
    throw new Error(data?.message ?? "No se pudo crear la reserva");
  }

  return res.json();
}

export async function getMyReservations(): Promise<Reservation[]> {
  const token = getToken();
  if (!token) {
    throw new UnauthorizedError("No autenticado");
  }

  const res = await fetch(`${API_URL}/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 401) {
    clearToken();
    throw new UnauthorizedError("Tu sesión expiró, iniciá sesión de nuevo");
  }

  if (!res.ok) {
    throw new Error("No se pudieron cargar tus reservas");
  }

  return res.json();
}

export async function cancelReservation(id: string): Promise<void> {
  const token = getToken();
  if (!token) {
    throw new UnauthorizedError("No autenticado");
  }

  const res = await fetch(`${API_URL}/reservations/${id}/cancel`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) {
    clearToken();
    throw new UnauthorizedError("Tu sesión expiró, iniciá sesión de nuevo");
  }

  if (!res.ok) {
    const data: { message?: string } | null = await res.json().catch(() => null);
    throw new Error(data?.message ?? "No se pudo cancelar la reserva");
  }
}

export async function payReservation(id: string): Promise<void> {
  const token = getToken();
  if (!token) {
    throw new UnauthorizedError("No autenticado");
  }

  const res = await fetch(`${API_URL}/reservations/${id}/pay`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) {
    clearToken();
    throw new UnauthorizedError("Tu sesión expiró, iniciá sesión de nuevo");
  }

  if (!res.ok) {
    const data: { message?: string } | null = await res.json().catch(() => null);
    throw new Error(data?.message ?? "No se pudo procesar el pago");
  }
}

export async function rescheduleReservation(
  id: string,
  startTime: string,
  endTime: string,
): Promise<void> {
  const token = getToken();
  if (!token) {
    throw new UnauthorizedError("No autenticado");
  }

  const res = await fetch(`${API_URL}/reservations/${id}/reschedule`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ startTime, endTime }),
  });

  if (res.status === 401) {
    clearToken();
    throw new UnauthorizedError("Tu sesión expiró, iniciá sesión de nuevo");
  }

  if (res.status === 409) {
    throw new Error("Ya existe una reserva para esa cancha en ese horario");
  }

  if (!res.ok) {
    const data: { message?: string } | null = await res.json().catch(() => null);
    throw new Error(data?.message ?? "No se pudo reagendar la reserva");
  }
}

export type AdminReservation = Reservation & {
  user: { id: string; name: string; email: string; role: string };
};

export async function getAllReservations(): Promise<AdminReservation[]> {
  const token = getToken();
  if (!token) {
    throw new UnauthorizedError("No autenticado");
  }

  const res = await fetch(`${API_URL}/reservations/all`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 401) {
    clearToken();
    throw new UnauthorizedError("Tu sesión expiró, iniciá sesión de nuevo");
  }

  if (res.status === 403) {
    throw new ForbiddenError("No tenés permisos de administrador");
  }

  if (!res.ok) {
    throw new Error("No se pudieron cargar las reservas");
  }

  return res.json();
}

export async function createCourt(input: {
  name: string;
  sportType: string;
  pricePerHour: number;
}): Promise<Court> {
  const token = getToken();
  if (!token) {
    throw new UnauthorizedError("No autenticado");
  }

  const res = await fetch(`${API_URL}/courts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (res.status === 401) {
    clearToken();
    throw new UnauthorizedError("Tu sesión expiró, iniciá sesión de nuevo");
  }

  if (res.status === 403) {
    throw new ForbiddenError("No tenés permisos de administrador");
  }

  if (!res.ok) {
    const data: { message?: string } | null = await res.json().catch(() => null);
    throw new Error(data?.message ?? "No se pudo crear la cancha");
  }

  return res.json();
}

export async function updateCourt(
  id: string,
  input: Partial<{ name: string; sportType: string; pricePerHour: number }>,
): Promise<Court> {
  const token = getToken();
  if (!token) {
    throw new UnauthorizedError("No autenticado");
  }

  const res = await fetch(`${API_URL}/courts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (res.status === 401) {
    clearToken();
    throw new UnauthorizedError("Tu sesión expiró, iniciá sesión de nuevo");
  }

  if (res.status === 403) {
    throw new ForbiddenError("No tenés permisos de administrador");
  }

  if (!res.ok) {
    const data: { message?: string } | null = await res.json().catch(() => null);
    throw new Error(data?.message ?? "No se pudo actualizar la cancha");
  }

  return res.json();
}

export async function deleteCourt(id: string): Promise<void> {
  const token = getToken();
  if (!token) {
    throw new UnauthorizedError("No autenticado");
  }

  const res = await fetch(`${API_URL}/courts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) {
    clearToken();
    throw new UnauthorizedError("Tu sesión expiró, iniciá sesión de nuevo");
  }

  if (res.status === 403) {
    throw new ForbiddenError("No tenés permisos de administrador");
  }

  if (!res.ok) {
    const data: { message?: string } | null = await res.json().catch(() => null);
    throw new Error(data?.message ?? "No se pudo eliminar la cancha");
  }
}
