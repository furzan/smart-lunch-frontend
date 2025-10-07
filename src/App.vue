<template>
  <!-- Hide navbar on login, collector, and superadmin routes -->
  <Navigation v-if="!['/login', '/collector', '/superadmin'].includes(route.path)" />

  <!-- Main route content -->
  <router-view />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Navigation from './components/navigation.vue'

const route = useRoute()
</script>
