<script setup>
defineProps({
  type: { type: String, default: 'button' },
})
</script>

<template>
  <button
    :type="type"
    class="w-full rounded bg-primary px-6 py-3 font-ui text-button font-semibold uppercase tracking-wide text-on-primary transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/40"
  >
    <slot />
  </button>
</template>
