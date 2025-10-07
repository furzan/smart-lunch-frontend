<template>
  <label class="block">
    <input type="radio" class="sr-only" :value="option.name" :checked="selected === option.name" @change="$emit('select')">
    <div :class="`btn-style bg-${option.color}-50 hover:bg-${option.color}-100 border border-${option.color}-200 rounded-xl p-4 cursor-pointer transition-colors ${selected === option.name ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`">
      <div class="flex justify-between items-center">
        <span class="font-medium text-sm text-gray-800">{{ option.name }}</span>
        <span :class="`text-sm font-bold text-${option.color}-700`">{{ option.price }}</span>
      </div>
      <p class="text-xs text-gray-600 mt-1">{{ option.desc }}</p>
    </div>
  </label>
</template>
<script>
export default {
  props: ['option', 'selected']
}
</script>