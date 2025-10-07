<template>
  <div class="bg-green-50 rounded-lg p-3 border border-green-200">
    <p class="font-medium text-sm text-gray-800">{{ contributor.name }}</p>
    <p class="text-xs text-green-600">{{ contributor.amount }}</p>
  </div>
</template>
<script>
export default {
  props: ['contributor']
}
</script>