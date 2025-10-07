<template>
  <div :class="`bg-${bg}-100 rounded-xl min-h-[80px] p-4 flex flex-col justify-between`">
    <div class="text-xs text-gray-600 font-medium">{{ label }}</div>
    <div :class="`text-xl font-bold text-${bg}-800`">{{ value }}</div>
  </div>
</template>
<script>
export default {
  props: ['label', 'value', 'bg']
}
</script>