<template>
  <div :class="`bg-${dish.color}-100 rounded-xl p-3 border border-${dish.color}-200`">
    <div class="flex justify-between items-start">
      <div class="flex-1">
        <p class="font-medium text-sm text-gray-800">{{ dish.name }}</p>
        <p :class="`text-sm text-${dish.color}-700`">{{ dish.dish }}</p>
        <p class="text-xs text-gray-600">Serves {{ dish.serves }}</p>
      </div>
      <span :class="`bg-${dish.color}-200 text-${dish.color}-800 text-xs font-medium px-2 py-1 rounded-full`">{{ dish.status }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['dish']
}
</script>