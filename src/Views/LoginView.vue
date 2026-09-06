<script setup>
import { ref } from 'vue'
import AuthTabs from '../components/AuthTabs.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

function handleSubmit() {}
</script>

<template>
  <div class="flex min-h-screen">
    <div class="hidden flex-1 bg-surface-dim md:block"></div>

    <div class="flex flex-1 items-center justify-center bg-surface px-6 py-16 md:px-16">
      <div class="w-full max-w-md">
        <AuthTabs />

        <h1 class="mt-10 font-headline text-headline-md font-medium text-on-surface">Bienvenido de nuevo</h1>
        <p class="mt-2 font-body text-body-md text-on-surface-variant">Accede para gestionar tus reservas y pedidos.</p>

        <form class="mt-8 flex flex-col gap-6" @submit.prevent="handleSubmit">
          <BaseInput
            id="email"
            v-model="email"
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            autocomplete="email"
          />
          <BaseInput
            id="password"
            v-model="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            autocomplete="current-password"
          />

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 font-body text-sm text-on-surface">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 rounded-sm border-outline text-primary focus:ring-primary"
              />
              Recordar sesión
            </label>
            <button type="button" class="font-body text-sm text-highlight hover:underline">
              ¿Recuperar contraseña?
            </button>
          </div>

          <BaseButton type="submit">Entrar</BaseButton>
        </form>

        <RouterLink
          to="/"
          class="mt-8 flex items-center justify-center gap-2 font-body text-sm text-highlight hover:underline"
        >
          <span aria-hidden="true">←</span> Volver al inicio
        </RouterLink>
      </div>
    </div>
  </div>
</template>
