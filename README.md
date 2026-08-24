# Sistema de Reservas

Sistema de reservas de canchas deportivas (fútbol 5/6/8/11), full-stack. Un
usuario ve la disponibilidad, reserva un horario, elige color de petos para
su equipo y paga (simulado); puede reagendar o cancelar después. Un admin
gestiona el catálogo de canchas y tiene visibilidad de todas las reservas
del sistema.

Este repositorio es el **frontend**. El backend vive en un repositorio
separado, `sistema-reservas-backend`.

## Stack técnico

- **Frontend** (este repo): Next.js 16 (App Router) + React 19 +
  TypeScript + Tailwind CSS v4.
- **Backend** (repo separado): NestJS 11 + TypeORM + PostgreSQL 16,
  autenticación JWT, DTOs validados con `class-validator`, rate limiting
  con `@nestjs/throttler`, build Docker multi-stage.

## Cómo levantarlo localmente

### Frontend (este repo)

```bash
npm install
npm run dev   # http://localhost:3001
```

Necesita `NEXT_PUBLIC_API_URL` apuntando al backend corriendo (si no se
define, usa `http://localhost:3000` por default). Esa misma variable
determina también el `connect-src` permitido por la Content-Security-Policy
(ver `next.config.ts`), así que no hace falta configurarla dos veces.

### Backend (repo separado)

**Opción A — Docker (recomendado):**

```bash
docker compose up --build
# levanta Postgres (host :5433) + backend (:3000)

docker compose exec backend node dist/seed.js
# carga el catálogo real de canchas — idempotente, no duplica si ya corrió
```

**Opción B — Node directo**, con un Postgres propio ya corriendo:

```bash
npm install
npm run start:dev
npm run seed   # carga el catálogo de canchas
```

Variables de entorno requeridas en el backend (`.env`, no versionado):
`DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`,
`JWT_EXPIRES_IN`, opcional `PORT` (default `3000`).

## Features implementadas

- Autenticación con JWT (login, `GET /auth/me`); passwords hasheadas con
  bcrypt en el backend.
- Roles `client`/`admin` con autorización real aplicada en el backend
  (guards + chequeo de dueño en cada operación) — no es solo ocultar
  botones en la UI, un request directo sin permisos se rechaza igual.
- Reservas con lock de concurrencia por cancha en el backend (advisory
  lock de Postgres) para que dos requests simultáneos no dupliquen un
  horario, elección de color de petos, pago simulado, reagendado y
  cancelación.
- Historial de reservas propio (`/mis-reservas`) y panel admin
  (`/admin`) con vista global de reservas y CRUD de canchas.
- Recuperación de contraseña vía API (`/auth/forgot-password` +
  `/auth/reset-password`) — el flujo de backend está completo, todavía sin
  pantalla en este frontend (ver Roadmap).
- Rate limiting (5 intentos / 60s por IP) en el login del backend para
  mitigar fuerza bruta de contraseñas.
- Diseño responsive: grid de canchas adaptable (1/2/3 columnas según
  ancho), formularios y header que se ajustan a mobile.
- Identidad visual propia: paleta rojo/negro (`brand-red` / `brand-black`),
  tipografía dedicada para headings (Ma Shan Zheng) y cuerpo (Space
  Grotesk), diagramas de cancha a escala real por tipo de fútbol.
- Selector de idioma ES/EN en el header, con Context de React + diccionario
  tipado (`lib/i18n`, sin librerías de i18n externas) — cubre toda la UI,
  los mensajes de error del cliente y el formato de fecha/hora; la
  preferencia se persiste en cookie para que el servidor la lea antes del
  primer render (sin flash de idioma).
- Página 404 propia (`app/not-found.tsx`) con copy del dominio del
  proyecto en vez del 404 genérico de Next, también traducida.
- Headers de seguridad HTTP (`next.config.ts`): Content-Security-Policy,
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`. El `connect-src` de
  la CSP se deriva de `NEXT_PUBLIC_API_URL` en build time, así siempre
  coincide con el backend real sin hardcodear el dominio.
- Páginas de Política de Privacidad y Términos de Uso (`/privacidad`,
  `/terminos`), enlazadas desde un footer nuevo, con copy honesto sobre
  ser un proyecto de demo/portafolio y no una empresa real.

## Roadmap (mejoras no implementadas a propósito)

- Pantalla de recuperación de contraseña en este frontend (el backend ya
  soporta el flujo completo).
- Migraciones formales de base de datos en el backend (hoy
  `synchronize: true` de TypeORM).
- Tests automatizados (Jest) — unit y e2e, en ambos repos.
- WebSockets / actualizaciones en tiempo real.
- Canchas favoritas.
- Notificaciones (email/push) — el reset de contraseña hoy devuelve el
  token directo en la respuesta de la API en vez de enviarlo por email.
- Modo oscuro/claro con toggle manual (hoy solo se sigue
  `prefers-color-scheme` del sistema operativo).
- Filtros de búsqueda de canchas (tipo, precio, horario).
- Duración mínima/máxima de reservas: el backend solo valida formato ISO
  y que `startTime < endTime`, sin acotar cuán corta/larga puede ser una
  reserva ni impedir fechas en el pasado.
- Pruebas Gherkin/BDD.
- Pruebas de mutación.
- Serialización centralizada de entidades con `class-transformer` en el
  backend — hoy el scrub de campos sensibles se hace a mano, campo por
  campo.
