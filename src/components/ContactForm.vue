<script setup>
import { reactive, ref } from 'vue'

/*
 * Ruta del back para los mensajes de contacto.
 * Está en un único sitio para que, si el equipo cambia la forma de conectar,
 * solo haya que tocar esta línea.
 */
const CONTACT_URL = '/api/contact-messages'

/*
 * Datos del formulario, conectados a los inputs con v-model.
 * Los nombres coinciden con los de ContactMessageDTORequest del back.
 */
const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  message: '',
})

/*
 * Preferencia de contacto: la marca el botón que se pulsa
 * ("Quiero que me llaméis" = CALL, "Enviar email" = EMAIL).
 */
const contactPreference = ref('EMAIL')

/* Estados del envío, para desactivar los botones y mostrar el resultado */
const enviando = ref(false)
const enviado = ref(false)
const errorEnvio = ref(false)

/*
 * Envía el mensaje al back.
 * Solo se ejecuta si el navegador ha dado por válidos los campos
 * (required, type="email", pattern del teléfono).
 * fetch no lanza error si el servidor responde 400 o 500,
 * por eso se comprueba response.ok a mano.
 */
async function enviarMensaje() {
  enviando.value = true
  enviado.value = false
  errorEnvio.value = false
  try {
    const response = await fetch(CONTACT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, contactPreference: contactPreference.value }),
    })
    if (!response.ok) throw new Error('Error al enviar el mensaje')
    enviado.value = true
    /* Vacía el formulario tras un envío correcto */
    Object.assign(form, { fullName: '', email: '', phone: '', message: '' })
  } catch (err) {
    console.warn('No se pudo enviar el mensaje de contacto:', err)
    errorEnvio.value = true
  } finally {
    /* Se ejecuta siempre, haya ido bien o mal */
    enviando.value = false
  }
}
</script>

<template>
  <section id="contacto" class="relative px-6 py-16 lg:px-16 flex justify-center">
    <div class="absolute inset-0 bg-black/30"></div>

    <div class="relative bg-surface-container-lowest rounded-3xl shadow-xl w-full max-w-2xl p-8 md:p-12">
      <div class="text-center mb-8">
        <h2
          class="text-on-surface text-3xl md:text-4xl leading-tight m-0 font-semibold"
          style="font-family: 'Cormorant Garamond', serif"
        >
          ¿Hablamos?
        </h2>
        <p class="text-on-surface-variant text-sm mt-2" style="font-family: 'Manrope', sans-serif">
          Cuéntanos qué necesitas y nos ponemos en contacto contigo.
        </p>
      </div>

      <!-- @submit.prevent evita que la página se recargue y llama a enviarMensaje -->
      <form class="flex flex-col gap-4" @submit.prevent="enviarMensaje">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <label for="contact-name" class="text-xs font-semibold uppercase text-on-surface-variant">
              Nombre completo *
            </label>
            <input
              id="contact-name"
              v-model="form.fullName"
              type="text"
              required
              placeholder="p. ej. Pelayo Álvarez"
              class="border border-outline-variant rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="contact-email" class="text-xs font-semibold uppercase text-on-surface-variant">
              Correo electrónico *
            </label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              required
              placeholder="pelayo@ejemplo.com"
              class="border border-outline-variant rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label for="contact-phone" class="text-xs font-semibold uppercase text-on-surface-variant">
            Teléfono de contacto *
          </label>
          <input
            id="contact-phone"
            v-model="form.phone"
            type="tel"
            required
            pattern="^\+?[0-9\s]{9,15}$"
            title="Introduce un número de teléfono válido (solo dígitos, espacios y prefijo opcional con +)"
            placeholder="+34 600 000 000"
            class="border border-outline-variant rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="contact-message" class="text-xs font-semibold uppercase text-on-surface-variant">
            ¿En qué podemos ayudarte? *
          </label>
          <!-- maxlength coincide con el @Size(max = 1000) del back -->
          <textarea
            id="contact-message"
            v-model="form.message"
            required
            maxlength="1000"
            rows="3"
            placeholder="Reserva para grupo especial, menú para celiacos, eventos privados..."
            class="border border-outline-variant rounded-lg px-3 py-2 text-sm resize-none"
          ></textarea>
        </div>

        <!-- Los dos botones envían el formulario; cada uno marca antes su preferencia -->
        <div class="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            type="submit"
            :disabled="enviando"
            @click="contactPreference = 'CALL'"
            class="flex-1 border border-highlight text-highlight text-xs font-semibold uppercase tracking-wide py-3 rounded-lg transition hover:bg-highlight/10 disabled:opacity-50"
          >
            Quiero que me llaméis
          </button>
          <button
            type="submit"
            :disabled="enviando"
            @click="contactPreference = 'EMAIL'"
            class="flex-1 bg-primary text-on-primary text-xs font-semibold uppercase tracking-wide py-3 rounded-lg transition hover:opacity-90 disabled:opacity-50"
          >
            Enviar email
          </button>
        </div>

        <!-- Resultado del envío -->
        <p v-if="enviado" class="text-sm text-center text-on-surface" role="status">
          ¡Gracias! Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.
        </p>
        <p v-if="errorEnvio" class="text-sm text-center text-error" role="alert">
          No se ha podido enviar el mensaje. Inténtalo de nuevo más tarde.
        </p>
      </form>
    </div>
  </section>
</template>