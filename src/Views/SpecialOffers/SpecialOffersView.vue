<script setup>
import { onMounted } from 'vue'
import { useOffers } from '@/composables/useOffers'
import { formatCurrency } from '@/utils/formatCurrency'

/*
 * Página "Privilegios Exclusivos".
 * Las ofertas se piden al back (GET /api/offers) a través del composable useOffers.
 * La oferta principal es la que llega con featured = true; el resto son las de temporada.
 */
const { featuredOffer, seasonalOffers, cargando, errorCarga, cargarOfertas } = useOffers()

/* Al montar la vista, se piden las ofertas al back */
onMounted(cargarOfertas)
</script>

<template>
  <main class="min-h-screen py-16 px-6 lg:px-16" style="background-color: var(--color-inverse-surface)">
    <div class="max-w-6xl mx-auto">
      <h1
        class="text-on-primary text-4xl md:text-5xl leading-tight m-0"
        style="font-family: 'Cormorant Garamond', serif"
      >
        Privilegios Exclusivos
      </h1>
      <p class="text-on-primary text-base mt-3 max-w-2xl" style="font-family: 'Manrope', sans-serif">
        Una selección especial de experiencias gastronómicas para nuestros clientes más
        valiosos. Disfrute las ventajas de formar parte de la comunidad GoXu, donde la cocina
        tradicional asturiana se transforma en alta gastronomía.
      </p>

      <!-- Estado de carga -->
      <p v-if="cargando" class="font-ui text-sm text-on-primary mt-12">
        Cargando ofertas...
      </p>

      <!-- Error al conectar con el back -->
      <p v-else-if="errorCarga" class="font-ui text-sm text-error mt-12">
        No se han podido cargar las ofertas. Inténtelo de nuevo más tarde.
      </p>

      <template v-else>
        <!-- Oferta principal (featured = true) -->
        <div v-if="featuredOffer" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 items-center">
          <img
            :src="featuredOffer.image"
            :alt="featuredOffer.title"
            class="w-full h-80 object-cover rounded-2xl"
          />
          <div>
            <p class="text-highlight text-xs font-semibold uppercase tracking-wide">
              {{ featuredOffer.badge }}
            </p>
            <h2
              class="text-on-primary text-2xl md:text-3xl mt-2"
              style="font-family: 'Cormorant Garamond', serif"
            >
              {{ featuredOffer.title }}
            </h2>
            <p class="text-on-primary text-sm mt-3">{{ featuredOffer.description }}</p>
            <div class="flex items-center gap-4 mt-6">
              <!-- El precio es opcional: solo se muestra si la oferta lo tiene -->
              <span v-if="featuredOffer.price != null" class="text-on-primary text-lg font-semibold">
                {{ formatCurrency(featuredOffer.price) }} / persona
              </span>
              <RouterLink
                to="/reservation"
                class="bg-primary text-on-primary text-xs font-semibold uppercase tracking-wide px-6 py-3 rounded-lg transition hover:opacity-90"
              >
                RESERVA AHORA
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Ofertas de temporada (featured = false) -->
        <template v-if="seasonalOffers.length">
          <h2
            class="text-on-primary text-2xl md:text-3xl mt-16 mb-6"
            style="font-family: 'Cormorant Garamond', serif"
          >
            Selección de Temporada
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article
              v-for="offer in seasonalOffers"
              :key="offer.id"
              class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg flex flex-col"
            >
              <div class="relative">
                <img :src="offer.image" :alt="offer.title" class="w-full h-40 object-cover" />
                <span
                  class="absolute top-3 left-3 bg-highlight/20 text-highlight text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {{ offer.badge }}
                </span>
              </div>
              <div class="p-5 flex flex-col gap-3 flex-1">
                <h3 class="text-lg font-semibold m-0 text-on-surface" style="font-family: 'Manrope', sans-serif">
                  {{ offer.title }}
                </h3>
                <p class="text-on-surface-variant text-sm m-0">{{ offer.description }}</p>
                <RouterLink
                  to="/reservation"
                  class="mt-auto bg-primary text-on-primary text-xs font-semibold uppercase tracking-wide py-2.5 rounded-lg transition hover:opacity-90 text-center"
                >
                  RESERVA AHORA
                </RouterLink>
              </div>
            </article>
          </div>
        </template>
      </template>
    </div>
  </main>
</template>