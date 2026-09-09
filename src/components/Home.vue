<script setup>
// TODO(GC-82): cuando el equipo instale vue-router (lo lleva Jenny, Épica 2),
// sustituir el <a href="#"> del CTA por un <router-link to="/carta">,
// o usar useRouter() para navegar con router.push('/carta').

// NOTE: colores aproximados de la paleta estándar de Tailwind, pendientes
// de sustituir por los definitivos cuando Iker comparta su configuración.

import cardCarrillera from '@/assets/home-card-carrillera.jpeg'
import cardPanbao from '@/assets/home-card-panbao.jpeg'
import cardPitu from '@/assets/home-card-pitu.jpeg'
import cardCroquetas from '@/assets/home-card-croquetas.jpeg'
import eventoMaridaje from '@/assets/eventos-maridaje.jpeg'
import eventoChosco from '@/assets/eventos-chosco.jpeg'
import eventoMesaRedonda from '@/assets/eventos-mesa-redonda.jpeg'

/*
 * TODO: contenido de relleno (placeholder) razonable por plato, a falta de
 * los datos reales y definitivos que llegarán con la Épica de Carta
 * (nombre exacto, precio, descripción y alérgenos confirmados por cocina).
 */
const especialidades = [
  {
    id: 1,
    image: cardCarrillera,
    badge: 'Recomendado',
    available: true,
    name: 'Carrillera de Goxu a la Sidra',
    price: '24,50 €',
    description: 'Guiso tradicional a fuego lento con reducción de sidra natural DOP de Asturias.',
    allergens: ['Gluten', 'Sulfitos'],
  },
  {
    id: 2,
    image: cardPanbao,
    badge: null,
    available: true,
    name: 'Pan Bao de Goxu',
    price: '14,00 €',
    description: 'Bao esponjoso relleno de goxu deshilachado, encurtidos y salsa asturiana.',
    allergens: ['Gluten'],
  },
  {
    id: 3,
    image: cardPitu,
    badge: null,
    available: true,
    name: 'Pitu Asturcelta Asado',
    price: '19,50 €',
    description: 'Pitu de raza asturcelta asado lentamente, con salsa de sidra y hierbas de la huerta.',
    allergens: ['Sulfitos'],
  },
  {
    id: 4,
    image: cardCroquetas,
    badge: 'Agotado',
    available: false,
    name: 'Croquetas de Goxu',
    price: '9,50 €',
    description: 'Croquetas caseras cremosas de goxu ibérico, fritas al momento.',
    allergens: ['Gluten', 'Lácteos'],
  },
]

/*
 * TODO: contenido tal y como aparece en el diseño de Figma. Sustituir
 * por los datos reales de eventos cuando exista esa fuente de datos
 * (probablemente backend, épica de Administración/Eventos).
 */
const eventos = [
  {
    id: 1,
    image: eventoMaridaje,
    date: '28 MARZO · 20:30H',
    title: 'Cena Maridaje: Sidras de Espalme & Cortes Nobles',
    description:
      'Un recorrido por 6 llagares históricos guiado por nuestra sumiller María Fernández, maridando cada paso con piezas singulares de goxu asturiano a baja temperatura.',
    meta: ['18 plazas exclusivas', '75 € / persona'],
  },
  {
    id: 2,
    image: eventoChosco,
    date: '2 ABRIL · 14:00H',
    title: 'Jornadas Gastronómicas del Chosco y la Carrillera',
    description:
      'Tres días dedicados a la reinterpretación de dos grandes pilares de la cocina de montaña. Recetas tradicionales encontrándose con técnicas moleculares y texturas crujientes.',
    meta: ['Menú degustación 5 pases', '48 € / persona'],
  },
  {
    id: 3,
    image: eventoMesaRedonda,
    date: '24 ABRIL · 19:00H',
    title: 'Mesa Redonda: De la Dehesa al plato',
    description:
      'Diálogo abierto entre criadores de goxu asturcelta, llagareros artesanales y nuestro equipo de cocina sobre la preservación de razas autóctonas y sostenibilidad rural.',
    meta: ['Coloquio & Cóctel de cierre', 'Entrada gratuita'],
  },
]
</script>

<template>
  <main class="home flex flex-col w-full animate-[fade-in-up_0.6s_ease-out]">
    <!-- Envoltorio con la imagen de fondo continua (hero + especialidades + eventos + contacto) -->
    <div class="atmosphere-wrapper relative">
      <!-- GC-79: Hero Section -->
      <section class="relative flex items-center justify-center min-h-120 md:min-h-150 px-5">
        <div class="absolute inset-0 bg-black/40"></div>

        <div class="relative z-10 flex flex-col items-center text-center max-w-4xl gap-4">
          <h1
            class="text-white text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight m-0"
            style="font-family: 'DM Serif Display', serif"
          >
            ¡Fartucos de sabor!
          </h1>

          <p
            class="text-stone-100 text-base md:text-lg leading-relaxed m-0 max-w-140"
            style="font-family: 'Manrope', sans-serif"
          >
            Una experiencia gastronómica que une el mar Cantábrico y los Picos
            de Europa en cada bocado.
          </p>

          <!-- GC-82: pendiente de conectar a la ruta real de la Carta -->
          <a href="#" class="inline-flex items-center justify-center bg-green-600 text-white text-xs font-semibold tracking-wide uppercase no-underline px-7 py-3.5 rounded-xl transition hover:opacity-90 hover:-translate-y-0.5" style="font-family: 'Inter', sans-serif">Ver la carta</a>
        </div>
      </section>

      <!-- Especialidades de la casa (pendiente de crear ticket en Jira) -->
      <section class="relative px-6 py-16 lg:px-16 lg:py-24">
        <div class="absolute inset-0 bg-black/50"></div>

        <div class="relative max-w-6xl mx-auto">
          <div class="mb-10">
            <h2
              class="text-white text-3xl md:text-4xl lg:text-5xl leading-tight m-0"
              style="font-family: 'Cormorant Garamond', serif"
            >
              Especialidades de la casa
            </h2>
            <p class="text-stone-200 text-base mt-2" style="font-family: 'Manrope', sans-serif">
              El goxu es nuestro protagonista indiscutible.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <article
              v-for="dish in especialidades"
              :key="dish.id"
              class="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col"
            >
              <div class="relative">
                <img :src="dish.image" :alt="dish.name" class="w-full h-48 object-cover" />
                <span
                  v-if="dish.badge"
                  class="absolute top-3 left-3 bg-white text-stone-800 text-xs font-semibold uppercase px-3 py-1 rounded-full"
                >
                  {{ dish.badge }}
                </span>
                <span
                  v-if="!dish.available"
                  class="absolute top-3 right-3 bg-stone-800 text-white text-xs font-semibold px-3 py-1 rounded-full"
                >
                  No disponible
                </span>
              </div>

              <div class="p-5 flex flex-col gap-3 flex-1">
                <div class="flex items-start justify-between gap-2">
                  <h3 class="text-lg font-semibold m-0" style="font-family: 'Manrope', sans-serif">
                    {{ dish.name }}
                  </h3>
                  <span class="text-green-700 font-semibold whitespace-nowrap">{{ dish.price }}</span>
                </div>

                <p class="text-stone-600 text-sm m-0">{{ dish.description }}</p>

                <div class="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                  <span class="w-2 h-2 rounded-full bg-pink-400"></span>
                  <span>Alérgenos:</span>
                  <span
                    v-for="allergen in dish.allergens"
                    :key="allergen"
                    class="border border-stone-300 rounded-full px-2 py-0.5"
                  >
                    {{ allergen }}
                  </span>
                </div>

                <button
                  type="button"
                  class="mt-auto bg-green-600 text-white text-xs font-semibold uppercase tracking-wide py-2.5 rounded-lg transition disabled:bg-stone-300 disabled:cursor-not-allowed hover:enabled:opacity-90"
                  :disabled="!dish.available"
                >
                  Añadir al carrito
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Próximos eventos (pendiente de crear ticket en Jira) -->
      <section class="relative px-6 py-16 lg:px-16 lg:py-24">
        <div class="absolute inset-0 bg-black/50"></div>

        <div class="relative max-w-6xl mx-auto">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p
                class="text-pink-400 text-xs font-semibold uppercase tracking-wide m-0"
                style="font-family: 'Inter', sans-serif"
              >
                Experiencias gastronómicas
              </p>
              <h2
                class="text-white text-3xl md:text-4xl lg:text-5xl leading-tight m-0"
                style="font-family: 'Cormorant Garamond', serif"
              >
                Próximos eventos
              </h2>
              <p class="text-stone-200 text-base mt-2" style="font-family: 'Manrope', sans-serif">
                Cenas maridaje, jornadas del goxu y experiencias exclusivas.
              </p>
            </div>

            <!-- TODO(GC-?): pendiente de conectar a la ruta real del calendario -->
            <a href="#" class="text-white text-sm font-semibold no-underline whitespace-nowrap">Ver calendario anual →</a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article
              v-for="evento in eventos"
              :key="evento.id"
              class="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col"
            >
              <div class="relative">
                <img :src="evento.image" :alt="evento.title" class="w-full h-40 object-cover" />
                <span
                  class="absolute top-3 left-3 bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {{ evento.date }}
                </span>
              </div>

              <div class="p-5 flex flex-col gap-3 flex-1">
                <h3 class="text-lg font-semibold m-0" style="font-family: 'Manrope', sans-serif">
                  {{ evento.title }}
                </h3>

                <p class="text-stone-600 text-sm m-0">{{ evento.description }}</p>

                <ul class="flex flex-col gap-1 text-xs text-stone-500 list-none p-0 m-0">
                  <li v-for="item in evento.meta" :key="item">{{ item }}</li>
                </ul>

                <!-- TODO(GC-?): pendiente de conectar a la ruta real de reserva de evento -->
                <button
                  type="button"
                  class="mt-auto bg-green-600 text-white text-xs font-semibold uppercase tracking-wide py-2.5 rounded-lg transition hover:opacity-90"
                >
                  Ver disponibilidad
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Contacto (pendiente de crear ticket en Jira) -->
      <section class="relative px-6 py-16 lg:px-16 flex justify-center">
        <div class="absolute inset-0 bg-black/30"></div>

        <div class="relative bg-white rounded-3xl shadow-xl w-full max-w-2xl p-8 md:p-12">
         <div class="text-center mb-8">
  <h2
    class="text-stone-900 text-3xl md:text-4xl leading-tight m-0 font-semibold"
    style="font-family: 'Cormorant Garamond', serif; color: #1c1917"
  >
    ¿Hablamos?
  </h2>
  <p class="text-stone-600 text-sm mt-2" style="font-family: 'Manrope', sans-serif">
    Cuéntanos qué necesitas y nos ponemos en contacto contigo.
  </p>
</div>

          <!-- TODO(GC-?): pendiente de conectar el envío del formulario al backend -->
          <form class="flex flex-col gap-4" @submit.prevent>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <label for="contact-name" class="text-xs font-semibold uppercase text-stone-500">
                  Nombre completo *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="p. ej. Pelayo Álvarez"
                  class="border border-stone-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div class="flex flex-col gap-1">
                <label for="contact-email" class="text-xs font-semibold uppercase text-stone-500">
                  Correo electrónico *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="pelayo@ejemplo.com"
                  class="border border-stone-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label for="contact-phone" class="text-xs font-semibold uppercase text-stone-500">
                Teléfono de contacto
              </label>
              <input
                id="contact-phone"
                type="tel"
                placeholder="+34 600 000 000"
                class="border border-stone-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div class="flex flex-col gap-1">
              <label for="contact-message" class="text-xs font-semibold uppercase text-stone-500">
                ¿En qué podemos ayudarte? *
              </label>
              <textarea
                id="contact-message"
                required
                rows="3"
                placeholder="Reserva para grupo especial, menú para celiacos, eventos privados..."
                class="border border-stone-300 rounded-lg px-3 py-2 text-sm resize-none"
              ></textarea>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                type="button"
                class="flex-1 border border-pink-400 text-pink-600 text-xs font-semibold uppercase tracking-wide py-3 rounded-lg transition hover:bg-pink-50"
              >
                Quiero que me llaméis
              </button>
              <button
                type="submit"
                class="flex-1 bg-green-600 text-white text-xs font-semibold uppercase tracking-wide py-3 rounded-lg transition hover:opacity-90"
              >
                Enviar email
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.atmosphere-wrapper {
  background-image: url('@/assets/home-background.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 150% auto;
  background-position: 88% center;
}

/* GC-83: animación de entrada (estilos mobile-first) */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>