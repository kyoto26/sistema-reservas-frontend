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
