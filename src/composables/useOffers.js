import { ref, computed } from 'vue'

/*
 * Ruta del back para las ofertas.
 * Está en un único sitio para que, si el equipo cambia la forma de conectar
 * (proxy o URL completa), solo haya que tocar esta línea.
 */
const OFFERS_URL = '/api/offers'

/*
 * Composable de ofertas: pide las ofertas al back y las separa
 * en la oferta principal (featured = true) y las de temporada.
 * Sigue el mismo patrón de carga que AdminProductsView (cargando / errorCarga).
 */
export function useOffers() {
  const offers = ref([])
  const cargando = ref(true)
  const errorCarga = ref(false)

  /* Oferta principal: la primera marcada como featured (o null si no hay) */
  const featuredOffer = computed(() => offers.value.find((o) => o.featured) ?? null)

  /* Ofertas de temporada: todas las que no son la principal */
  const seasonalOffers = computed(() => offers.value.filter((o) => !o.featured))

  /*
   * Pide las ofertas al back.
   * fetch no lanza error si el servidor responde 404 o 500,
   * por eso se comprueba response.ok a mano.
   */
  async function cargarOfertas() {
    cargando.value = true
    errorCarga.value = false
    try {
      const response = await fetch(OFFERS_URL)
      if (!response.ok) throw new Error('Error al cargar las ofertas')
      offers.value = await response.json()
    } catch (err) {
      console.warn('No se pudo conectar con el backend de ofertas:', err)
      errorCarga.value = true
    } finally {
      /* Se ejecuta siempre, haya ido bien o mal */
      cargando.value = false
    }
  }

  return {
    offers,
    featuredOffer,
    seasonalOffers,
    cargando,
    errorCarga,
    cargarOfertas,
  }
}
