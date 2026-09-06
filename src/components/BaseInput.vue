<script setup>
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: '' },
})

const model = defineModel({ type: String, default: '' })
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="font-ui text-label-caps font-semibold uppercase tracking-caps text-on-surface">
      {{ label }}
    </label>
    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="rounded border border-highlight bg-surface-container-lowest px-4 py-3 font-body text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
    />
  </div>
</template>
