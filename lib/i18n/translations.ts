export type Language = "es" | "en";

export const LANGUAGES: Language[] = ["es", "en"];
export const DEFAULT_LANGUAGE: Language = "es";
export const LANG_COOKIE = "lang";

const es = {
  header: {
    brand: "Sistema de Reservas",
    nav: {
      myReservations: "Mis reservas",
      admin: "Admin",
      logout: "Cerrar sesión",
      login: "Iniciar sesión",
      register: "Registrarse",
    },
  },
  languageSwitcher: {
    groupLabel: "Idioma",
    es: "ES",
    en: "EN",
  },
  common: {
    errors: {
      startBeforeEnd: "La hora de inicio debe ser anterior a la hora de fin",
    },
    passwordInput: {
      show: "Mostrar contraseña",
      hide: "Ocultar contraseña",
    },
  },
  landing: {
    heading: "Canchas disponibles",
  },
  filters: {
    courtType: {
      heading: "Tipo de cancha",
    },
    maxPrice: {
      heading: "Precio máximo",
      ariaLabel: "Precio máximo",
      remove: "Quitar",
    },
    availability: {
      label: "Disponibilidad",
    },
    time: {
      fromAriaLabel: "Desde",
      toAriaLabel: "Hasta",
    },
    apply: {
      idle: "Aplicar",
      loading: "Buscando...",
    },
    clear: "Limpiar",
    error: {
      scheduleFilter: "No se pudo aplicar el filtro de horario",
    },
  },
  courts: {
    loadError: "No se pudieron cargar las canchas. Intentá de nuevo más tarde.",
    emptyFiltered: "No hay canchas disponibles con esos filtros.",
  },
  courtType: {
    futbol5: "Fútbol 5",
    futbol6: "Fútbol 6",
    futbol8: "Fútbol 8",
    futbol11: "Fútbol 11",
    genericFallback: "Cancha",
  },
  courtCard: {
    priceSuffix: "/ hora",
    reserveButton: "Reservar",
    petos: {
      none: "Sin petos",
      red: "Petos rojos",
      blue: "Petos azules",
    },
  },
  reserveModal: {
    title: (court: string) => `Reservar ${court}`,
    date: { label: "Fecha" },
    from: { label: "Desde" },
    to: { label: "Hasta" },
    petos: { label: "Petos" },
    cancel: "Cancelar",
    confirm: { idle: "Confirmar", loading: "Reservando..." },
    error: { createDefault: "No se pudo crear la reserva" },
    success: {
      title: "¡Reserva confirmada!",
      body: (court: string) => `Tu reserva para ${court} quedó registrada.`,
      close: "Cerrar",
    },
  },
  login: {
    title: "Iniciar sesión",
    email: { label: "Email" },
    password: { label: "Contraseña" },
    error: { invalidCredentials: "Email o contraseña incorrectos" },
    submit: { idle: "Ingresar", loading: "Ingresando..." },
    noAccount: "¿No tenés cuenta?",
    registerLink: "Registrate",
  },
  register: {
    title: "Registrarse",
    name: { label: "Nombre" },
    email: { label: "Email" },
    password: { label: "Contraseña" },
    error: {
      default: "No se pudo completar el registro",
      emailTaken: "Ya existe un usuario con ese email",
    },
    submit: { idle: "Registrarse", loading: "Registrando..." },
    hasAccount: "¿Ya tenés cuenta?",
    loginLink: "Iniciá sesión",
  },
  myReservations: {
    title: "Mis reservas",
    loading: "Cargando tus reservas...",
    empty: "Todavía no tenés reservas.",
    error: {
      load: "No se pudieron cargar tus reservas",
      cancel: "No se pudo cancelar la reserva",
      pay: "No se pudo procesar el pago",
      reschedule: "No se pudo reagendar la reserva",
    },
    pay: { idle: "Pagar", loading: "Pagando..." },
    rescheduleButton: "Reagendar",
    cancel: { idle: "Cancelar", loading: "Cancelando..." },
  },
  status: {
    confirmed: "Confirmada",
    cancelled: "Cancelada",
  },
  petosLabel: {
    none: "Sin petos",
    red: "Rojo",
    blue: "Azul",
  },
  paymentLabel: {
    pending: "Pendiente",
    paid: "Pagado",
  },
  rescheduleModal: {
    title: (court: string) => `Reagendar ${court}`,
    date: { label: "Fecha" },
    from: { label: "Desde" },
    to: { label: "Hasta" },
    cancel: "Cancelar",
    confirm: { idle: "Confirmar", loading: "Guardando..." },
  },
  admin: {
    title: "Panel de administración",
    tabs: { reservations: "Reservas", courts: "Canchas" },
  },
  adminReservations: {
    loading: "Cargando reservas...",
    empty: "No hay reservas registradas.",
    error: {
      load: "No se pudieron cargar las reservas",
      cancel: "No se pudo cancelar la reserva",
    },
    cancel: { idle: "Cancelar", loading: "Cancelando..." },
  },
  adminCourts: {
    form: {
      name: { label: "Nombre" },
      sportType: { label: "Deporte" },
      price: { label: "Precio/hora" },
      submit: { idle: "Crear cancha", loading: "Creando..." },
      error: { invalid: "Completá nombre, deporte y un precio válido" },
    },
    loading: "Cargando canchas...",
    empty: "No hay canchas registradas.",
    error: {
      load: "No se pudieron cargar las canchas",
      create: "No se pudo crear la cancha",
      update: "No se pudo actualizar la cancha",
      delete: "No se pudo eliminar la cancha",
    },
    edit: {
      cancel: "Cancelar",
      save: { idle: "Guardar", loading: "Guardando..." },
    },
    row: {
      priceSuffix: "/ hora",
      edit: "Editar",
      delete: { idle: "Eliminar", loading: "Eliminando..." },
    },
    confirmDelete: (name: string) =>
      `¿Eliminar "${name}"? Esta acción no se puede deshacer.`,
  },
  meta: {
    title: "Sistema de Reservas",
    description: "Reservá canchas en línea",
  },
  notFound: {
    code: "404",
    title: "Fuera de juego",
    message: "Esta página no existe. El árbitro ya cantó offside.",
    backButton: "Volver a la cancha",
  },
  footer: {
    tagline: "Proyecto de portafolio",
    privacyLink: "Política de Privacidad",
    termsLink: "Términos de Uso",
  },
  privacy: {
    title: "Política de Privacidad",
    sections: [
      {
        heading: "Sobre este proyecto",
        body: "Sistema de Reservas es un proyecto de demostración técnica (portafolio), no un servicio comercial real. No hay una empresa detrás de esta aplicación: es un ejercicio de desarrollo full-stack pensado para mostrar habilidades técnicas. Esta política existe para ser transparente sobre qué pasa con los datos que ingresás, aunque el propósito de la app sea educativo/demostrativo.",
      },
      {
        heading: "Qué datos recolectamos",
        body: "Para que la demo funcione, guardamos tu nombre, tu email, tu contraseña (nunca en texto plano: se guarda hasheada con bcrypt, un algoritmo diseñado para que ni siquiera nosotros podamos leerla) y los datos de las reservas que hagas (cancha elegida, horario, estado de la reserva y del pago).",
      },
      {
        heading: "Para qué los usamos",
        body: "Únicamente para que la demo funcione: identificarte al iniciar sesión, mostrarte tus propias reservas, y que el panel de administración pueda gestionar el catálogo de canchas. No vendemos ni compartimos tus datos con terceros, no hacemos marketing, no armamos perfiles publicitarios.",
      },
      {
        heading: "Dónde se almacenan",
        body: "La base de datos (PostgreSQL) está alojada en Neon, un proveedor de infraestructura en la nube para bases de datos Postgres. No administramos servidores propios: usamos su plataforma como lo haría cualquier proyecto que necesite una base de datos gestionada.",
      },
      {
        heading: "Persistencia de los datos",
        body: "Como es un entorno de demostración y no un servicio permanente, los datos de prueba pueden borrarse periódicamente sin previo aviso (por ejemplo, al reiniciar la base para una nueva versión del proyecto). No uses esta app para reservas reales ni información sensible.",
      },
      {
        heading: "Tus derechos",
        body: "Podés pedir que eliminemos tu cuenta y tus datos en cualquier momento escribiendo a kyoto2617@gmail.com.",
      },
      {
        heading: "Sesión y JWT",
        body: "Al iniciar sesión se genera un token JWT que se guarda en el localStorage de tu navegador para mantenerte identificado entre páginas. Ese token no se comparte con terceros ni se usa para nada fuera de esta app.",
      },
    ],
  },
  terms: {
    title: "Términos de Uso",
    sections: [
      {
        heading: "Qué es esto",
        body: "Este sitio es un proyecto de demostración técnica (portafolio), no un servicio comercial. Se ofrece \"tal cual\", sin garantías de disponibilidad, de que los datos mostrados sean precisos, ni de continuidad del servicio en el tiempo.",
      },
      {
        heading: "Las reservas son simuladas",
        body: "Las reservas que creás acá no representan compromisos reales con ninguna cancha física: no hay canchas de verdad esperándote. Los pagos también son simulados — no se procesa dinero real en ningún momento.",
      },
      {
        heading: "Veracidad de tus datos",
        body: "Sos responsable de la información que cargás (nombre, email, etc.). No uses datos de terceros ni información sensible real.",
      },
      {
        heading: "Terminación",
        body: "Tu cuenta y tus datos pueden eliminarse en cualquier momento sin previo aviso, como parte del mantenimiento normal de un proyecto de demostración.",
      },
    ],
  },
  api: {
    error: {
      loadCourts: "No se pudieron cargar las canchas",
      invalidCredentials: "Email o contraseña incorrectos",
      emailTaken: "Ya existe un usuario con ese email",
      registerDefault: "No se pudo completar el registro",
      sessionExpired: "Tu sesión expiró, iniciá sesión de nuevo",
      reservationConflict: "Ya existe una reserva para esa cancha en ese horario",
      createReservation: "No se pudo crear la reserva",
      loadMyReservations: "No se pudieron cargar tus reservas",
      cancelReservation: "No se pudo cancelar la reserva",
      payReservation: "No se pudo procesar el pago",
      rescheduleReservation: "No se pudo reagendar la reserva",
      loadAllReservations: "No se pudieron cargar las reservas",
      forbidden: "No tenés permisos de administrador",
      createCourt: "No se pudo crear la cancha",
      updateCourt: "No se pudo actualizar la cancha",
      deleteCourt: "No se pudo eliminar la cancha",
      notAuthenticated: "No autenticado",
    },
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  header: {
    brand: "Sistema de Reservas",
    nav: {
      myReservations: "My Reservations",
      admin: "Admin",
      logout: "Log Out",
      login: "Log In",
      register: "Sign Up",
    },
  },
  languageSwitcher: {
    groupLabel: "Language",
    es: "ES",
    en: "EN",
  },
  common: {
    errors: {
      startBeforeEnd: "Start time must be before end time",
    },
    passwordInput: {
      show: "Show password",
      hide: "Hide password",
    },
  },
  landing: {
    heading: "Available Courts",
  },
  filters: {
    courtType: {
      heading: "Court Type",
    },
    maxPrice: {
      heading: "Max Price",
      ariaLabel: "Max Price",
      remove: "Clear",
    },
    availability: {
      label: "Availability",
    },
    time: {
      fromAriaLabel: "From",
      toAriaLabel: "To",
    },
    apply: {
      idle: "Apply",
      loading: "Searching...",
    },
    clear: "Clear",
    error: {
      scheduleFilter: "Couldn't apply the schedule filter",
    },
  },
  courts: {
    loadError: "Couldn't load the courts. Please try again later.",
    emptyFiltered: "No courts available with these filters.",
  },
  courtType: {
    futbol5: "5-a-side",
    futbol6: "6-a-side",
    futbol8: "8-a-side",
    futbol11: "11-a-side",
    genericFallback: "Court",
  },
  courtCard: {
    priceSuffix: "/ hour",
    reserveButton: "Book",
    petos: {
      none: "No pinnies",
      red: "Red pinnies",
      blue: "Blue pinnies",
    },
  },
  reserveModal: {
    title: (court: string) => `Book ${court}`,
    date: { label: "Date" },
    from: { label: "From" },
    to: { label: "To" },
    petos: { label: "Pinnies" },
    cancel: "Cancel",
    confirm: { idle: "Confirm", loading: "Booking..." },
    error: { createDefault: "Couldn't create the reservation" },
    success: {
      title: "Reservation confirmed!",
      body: (court: string) => `Your reservation for ${court} is confirmed.`,
      close: "Close",
    },
  },
  login: {
    title: "Log In",
    email: { label: "Email" },
    password: { label: "Password" },
    error: { invalidCredentials: "Incorrect email or password" },
    submit: { idle: "Log In", loading: "Logging in..." },
    noAccount: "Don't have an account?",
    registerLink: "Sign up",
  },
  register: {
    title: "Sign Up",
    name: { label: "Name" },
    email: { label: "Email" },
    password: { label: "Password" },
    error: {
      default: "Couldn't complete registration",
      emailTaken: "An account with this email already exists",
    },
    submit: { idle: "Sign Up", loading: "Signing up..." },
    hasAccount: "Already have an account?",
    loginLink: "Log in",
  },
  myReservations: {
    title: "My Reservations",
    loading: "Loading your reservations...",
    empty: "You don't have any reservations yet.",
    error: {
      load: "Couldn't load your reservations",
      cancel: "Couldn't cancel the reservation",
      pay: "Couldn't process the payment",
      reschedule: "Couldn't reschedule the reservation",
    },
    pay: { idle: "Pay", loading: "Paying..." },
    rescheduleButton: "Reschedule",
    cancel: { idle: "Cancel", loading: "Cancelling..." },
  },
  status: {
    confirmed: "Confirmed",
    cancelled: "Cancelled",
  },
  petosLabel: {
    none: "No pinnies",
    red: "Red",
    blue: "Blue",
  },
  paymentLabel: {
    pending: "Pending",
    paid: "Paid",
  },
  rescheduleModal: {
    title: (court: string) => `Reschedule ${court}`,
    date: { label: "Date" },
    from: { label: "From" },
    to: { label: "To" },
    cancel: "Cancel",
    confirm: { idle: "Confirm", loading: "Saving..." },
  },
  admin: {
    title: "Admin Panel",
    tabs: { reservations: "Reservations", courts: "Courts" },
  },
  adminReservations: {
    loading: "Loading reservations...",
    empty: "No reservations yet.",
    error: {
      load: "Couldn't load reservations",
      cancel: "Couldn't cancel the reservation",
    },
    cancel: { idle: "Cancel", loading: "Cancelling..." },
  },
  adminCourts: {
    form: {
      name: { label: "Name" },
      sportType: { label: "Sport" },
      price: { label: "Price/hour" },
      submit: { idle: "Add Court", loading: "Creating..." },
      error: { invalid: "Enter a name, sport, and a valid price" },
    },
    loading: "Loading courts...",
    empty: "No courts yet.",
    error: {
      load: "Couldn't load courts",
      create: "Couldn't create the court",
      update: "Couldn't update the court",
      delete: "Couldn't delete the court",
    },
    edit: {
      cancel: "Cancel",
      save: { idle: "Save", loading: "Saving..." },
    },
    row: {
      priceSuffix: "/ hour",
      edit: "Edit",
      delete: { idle: "Delete", loading: "Deleting..." },
    },
    confirmDelete: (name: string) =>
      `Delete "${name}"? This action cannot be undone.`,
  },
  meta: {
    title: "Sistema de Reservas",
    description: "Book courts online",
  },
  notFound: {
    code: "404",
    title: "Offside",
    message: "This page doesn't exist. The ref already called it.",
    backButton: "Back to the pitch",
  },
  footer: {
    tagline: "Portfolio project",
    privacyLink: "Privacy Policy",
    termsLink: "Terms of Use",
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        heading: "About this project",
        body: "Sistema de Reservas is a technical demo project (portfolio piece), not a real commercial service. There's no company behind this app — it's a full-stack development exercise meant to showcase technical skills. This policy exists to be transparent about what happens to the data you enter, even though the app's purpose is educational/demonstrative.",
      },
      {
        heading: "What data we collect",
        body: "To make the demo work, we store your name, your email, your password (never in plain text — it's hashed with bcrypt, an algorithm designed so that not even we can read it), and your reservation data (chosen court, time slot, reservation and payment status).",
      },
      {
        heading: "What we use it for",
        body: "Only to make the demo work: identifying you on login, showing you your own reservations, and letting the admin panel manage the court catalog. We don't sell or share your data with third parties, we don't do marketing, we don't build advertising profiles.",
      },
      {
        heading: "Where it's stored",
        body: "The database (PostgreSQL) is hosted on Neon, a cloud infrastructure provider for Postgres databases. We don't run our own servers — we use their platform the way any project needing a managed database would.",
      },
      {
        heading: "Data persistence",
        body: "Since this is a demo environment, not a permanent service, test data may be wiped periodically without notice (for example, when resetting the database for a new version of the project). Don't use this app for real bookings or sensitive information.",
      },
      {
        heading: "Your rights",
        body: "You can ask us to delete your account and your data at any time by writing to kyoto2617@gmail.com.",
      },
      {
        heading: "Session and JWT",
        body: "Logging in generates a JWT token stored in your browser's localStorage to keep you identified across pages. That token isn't shared with third parties or used for anything outside this app.",
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    sections: [
      {
        heading: "What this is",
        body: "This site is a technical demo project (portfolio piece), not a commercial service. It's provided \"as is\", with no guarantees of availability, data accuracy, or continuity of service over time.",
      },
      {
        heading: "Reservations are simulated",
        body: "The reservations you create here don't represent real commitments with any physical court — there are no real courts waiting for you. Payments are also simulated — no real money is ever processed.",
      },
      {
        heading: "Accuracy of your data",
        body: "You're responsible for the information you enter (name, email, etc.). Don't use third parties' data or real sensitive information.",
      },
      {
        heading: "Termination",
        body: "Your account and data may be deleted at any time without notice, as part of normal maintenance of a demo project.",
      },
    ],
  },
  api: {
    error: {
      loadCourts: "Couldn't load courts",
      invalidCredentials: "Incorrect email or password",
      emailTaken: "An account with this email already exists",
      registerDefault: "Couldn't complete registration",
      sessionExpired: "Your session expired, please log in again",
      reservationConflict: "There's already a reservation for that court at that time",
      createReservation: "Couldn't create the reservation",
      loadMyReservations: "Couldn't load your reservations",
      cancelReservation: "Couldn't cancel the reservation",
      payReservation: "Couldn't process the payment",
      rescheduleReservation: "Couldn't reschedule the reservation",
      loadAllReservations: "Couldn't load reservations",
      forbidden: "You don't have admin permissions",
      createCourt: "Couldn't create the court",
      updateCourt: "Couldn't update the court",
      deleteCourt: "Couldn't delete the court",
      notAuthenticated: "Not authenticated",
    },
  },
};

export const dictionaries: Record<Language, Dictionary> = { es, en };
