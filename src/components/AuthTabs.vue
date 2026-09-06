<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLogin = computed(() => route.path !== '/register')
</script>

<template>
  <div>
    <nav class="flex gap-8">
      <RouterLink
        to="/login"
        class="border-b-2 pb-3 font-ui text-base font-semibold"
        :class="isLogin ? 'border-highlight text-primary' : 'border-transparent text-on-surface-variant'"
      >
        Iniciar Sesión
      </RouterLink>
      <RouterLink
        to="/register"
        class="border-b-2 pb-3 font-ui text-base font-semibold"
        :class="!isLogin ? 'border-highlight text-primary' : 'border-transparent text-on-surface-variant'"
      >
        Crear Cuenta
      </RouterLink>
    </nav>
    <div class="h-px w-full bg-outline-variant"></div>
  </div>
</template>
