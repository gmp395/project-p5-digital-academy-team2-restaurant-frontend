import { ref, computed } from 'vue'
import { formatCurrency } from '@/utils/formatCurrency'

/*
 * Ruta del back para los eventos.
 * Está en un único sitio para que, si el equipo cambia la forma de conectar,
 * solo haya que tocar esta línea.
 */
const EVENTS_URL = '/api/events'

/*
 * Estado compartido: está fuera de la función para que la Home y el calendario
 * usen la misma lista de eventos (igual que en la versión anterior con datos fijos).
 */
const events = ref([])
const cargando = ref(false)
const errorCarga = ref(false)

/*
 * Convierte la fecha del back ("2026-03-28T20:30:00")
 * al formato que usan las vistas ("28 MARZO · 20:30H").
 */
function formatEventDate(isoDate) {
  const date = new Date(isoDate)
  const day = date.getDate()
  const month = date.toLocaleDateString('es-ES', { month: 'long' }).toUpperCase()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day} ${month} · ${hours}:${minutes}H`
}

/*
 * Construye la lista "meta" que muestran las vistas:
 * los detalles (si los hay) y el precio, o "Entrada gratuita" si el precio es null.
 */
function buildMeta(event) {
  const meta = []
  if (event.details) meta.push(event.details)
  meta.push(event.price != null ? `${formatCurrency(event.price)} / persona` : 'Entrada gratuita')
  return meta
}

/*
 * Adaptador: traduce un evento del back al formato que esperan
 * EventsSection y el calendario, sin tener que cambiar esos componentes.
 */
function adaptEvent(event) {
  return {
    id: event.id,
    image: event.image,
    title: event.title,
    description: event.description,
    featured: event.featured,
    eventDate: event.eventDate,
    date: formatEventDate(event.eventDate),
    meta: buildMeta(event),
  }
}

/*
 * Agrupa los eventos por mes para el calendario anual.
 * El back ya los devuelve ordenados por fecha, así que los grupos salen en orden.
 * La clave incluye el año para no mezclar el mismo mes de años distintos.
 */
const eventsByMonth = computed(() => {
  const groups = []
  for (const event of events.value) {
    const date = new Date(event.eventDate)
    const key = `${date.getFullYear()}-${date.getMonth()}`
    let group = groups.find((g) => g.key === key)
    if (!group) {
      const monthName = date.toLocaleDateString('es-ES', { month: 'long' })
      group = {
        key,
        month: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        events: [],
      }
      groups.push(group)
    }
    group.events.push(event)
  }
  return groups
})

/*
 * Pide los eventos al back y los adapta.
 * fetch no lanza error si el servidor responde 404 o 500,
 * por eso se comprueba response.ok a mano.
 */
async function cargarEventos() {
  cargando.value = true
  errorCarga.value = false
  try {
    const response = await fetch(EVENTS_URL)
    if (!response.ok) throw new Error('Error al cargar los eventos')
    const data = await response.json()
    events.value = data.map(adaptEvent)
  } catch (err) {
    console.warn('No se pudo conectar con el backend de eventos:', err)
    errorCarga.value = true
  } finally {
    /* Se ejecuta siempre, haya ido bien o mal */
    cargando.value = false
  }
}

/* Event management (create/edit, toggle featured) lives in Andrea's Admin
 * panel, same pattern as products (AdminProductsView.vue).
 */
export function useEvents() {
  function toggleFeatured(eventId) {
    const event = events.value.find((e) => e.id === eventId)
    if (event) event.featured = !event.featured
  }

  return {
    events,
    eventsByMonth,
    cargando,
    errorCarga,
    cargarEventos,
    toggleFeatured,
  }
}