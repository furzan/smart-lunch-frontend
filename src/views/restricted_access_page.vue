<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">

      <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </div>

      <h1 class="text-3xl font-extrabold text-slate-800 mb-3">
        Access Denied
      </h1>

      <p class="text-lg text-slate-600 mb-8 leading-relaxed">
        It appears your verification failed. You do not have the necessary permissions to access this page.
      </p>

      <button
        @click="goLogin"
        class="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Go to Login Page
      </button>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// Get the router instance
const router = useRouter();

const goLogin = () => {
      sessionStorage.clear();
      localStorage.clear();
      router.push('/login');
};
</script>

<style scoped>
/*
 * Tailwind CSS is assumed to be available and handles most styling.
 * The `scoped` attribute ensures these styles only apply to this component.
 * No custom CSS is needed for this example as Tailwind provides everything.
 */
</style>
