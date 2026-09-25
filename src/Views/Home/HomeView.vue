<script setup>
import { onMounted } from 'vue'
import { useEvents } from '@/composables/useEvents'

/*
 * Calendario anual de eventos.
 * Los eventos se piden al back (GET /api/events) a través del composable useEvents,
 * que ya los devuelve adaptados y agrupados por mes.
 */
const { eventsByMonth, cargando, errorCarga, cargarEventos } = useEvents()

/* Al montar la vista, se piden los eventos al back */
onMounted(cargarEventos)
</script>

<template>
  <main class="min-h-screen py-16 px-6 lg:px-16" style="background-color: var(--color-inverse-surface)">
    <div class="max-w-4xl mx-auto">
      <p class="text-highlight text-xs font-semibold uppercase tracking-wide">
        Experiencias gastronómicas
      </p>
      <h1
        class="text-on-primary text-4xl md:text-5xl leading-tight m-0"
        style="font-family: 'Cormorant Garamond', serif"
      >
        Calendario anual de eventos
      </h1>
      <p class="text-on-primary text-base mt-3 max-w-2xl" style="font-family: 'Manrope', sans-serif">
        Todas nuestras cenas maridaje, jornadas gastronómicas y experiencias exclusivas a lo largo del año.
      </p>

      <!-- Estado de carga -->
      <p v-if="cargando" class="font-ui text-sm text-on-primary mt-12">
        Cargando eventos...
      </p>

      <!-- Error al conectar con el back -->
      <p v-else-if="errorCarga" class="font-ui text-sm text-error mt-12">
        No se han podido cargar los eventos. Inténtelo de nuevo más tarde.
      </p>

      <!-- Eventos agrupados por mes -->
      <template v-else>
        <div v-for="group in eventsByMonth" :key="group.key" class="mt-12">
          <h2
            class="text-on-primary text-xl md:text-2xl mb-4 pb-2 border-b border-outline-variant/30"
            style="font-family: 'Cormorant Garamond', serif"
          >
            {{ group.month }}
          </h2>

          <div class="flex flex-col divide-y divide-outline-variant/20">
            <div
              v-for="event in group.events"
              :key="event.id"
              class="flex items-center gap-4 py-4"
            >
              <img
                :src="event.image"
                :alt="event.title"
                class="w-16 h-16 rounded-lg object-cover shrink-0"
              />

              <div class="flex-1 min-w-0">
                <p class="text-highlight text-xs font-semibold uppercase tracking-wide m-0">
                  {{ event.date }}
                </p>
                <h3
                  class="text-on-primary text-base md:text-lg font-semibold m-0 truncate"
                  style="font-family: 'Manrope', sans-serif"
                >
                  {{ event.title }}
                </h3>
                <p class="text-on-primary/70 text-xs mt-1">
                  {{ event.meta.join(' · ') }}
                </p>
              </div>

              <RouterLink
                :to="`/ofertas-eventos`"
                class="mt-auto bg-primary text-on-primary text-xs font-semibold uppercase tracking-wide py-2.5 rounded-lg transition hover:opacity-90 text-center"
              >
                Ver disponibilidad
              </RouterLink>
            </div>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>