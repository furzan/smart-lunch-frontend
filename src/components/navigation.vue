<template>
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Lunch App
            </h1>
          </div>
        </div>

        <!-- Dropdown -->
        <div class="ml-4 flex items-center md:ml-6">
          <div class="relative" ref="dropdownRef">
            <button
              @click="toggleDropdown"
              class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-full hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              <User class="h-5 w-5" />
            </button>

            <div
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-80 origin-top-right z-50 sm:w-80 w-full sm:right-0 right-0 sm:top-full top-16"
            >
              <div
                class="max-w-xs w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08),0_15px_15px_-6px_rgba(0,0,0,0.06)] transition-all duration-300"
              >
                <div class="px-4 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-700 to-blue-600">
                  <p class="text-xs font-medium text-blue-200 uppercase tracking-wider">Signed in as</p>
                  <div class="flex items-center mt-1">
                    <div
                      class="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-2"
                    >
                      <User class="h-4 w-4" />
                    </div>
                    <p
                      class="text-sm font-medium text-white truncate relative hover:after:w-full after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#2b6cb0] after:transition-all after:duration-300"
                    >
                      {{ username }}
                    </p>
                  </div>
                </div>

                <div class="py-1.5">
                  <router-link
                    to="/profile"
                     @click.native="isDropdownOpen = false"
                    class="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div
                      class="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"
                    ></div>
                    <div
                      class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-200"
                    >
                      <User class="h-5 w-5 text-blue-600 group-hover:text-[#2b6cb0]" />
                    </div>
                    <span class="font-medium text-gray-700 group-hover:text-[#1a365d]">Profile</span>
                    <ChevronRight class="h-3 w-3 text-gray-400 ml-auto group-hover:text-[#2b6cb0]" />
                  </router-link>
                  <router-link
                    to="/"
                     @click.native="isDropdownOpen = false"
                    class="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div
                      class="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"
                    ></div>
                    <div
                      class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-200"
                    >
                      <User class="h-5 w-5 text-blue-600 group-hover:text-[#2b6cb0]" />
                    </div>
                    <span class="font-medium text-gray-700 group-hover:text-[#1a365d]">Dashboard</span>
                    <ChevronRight class="h-3 w-3 text-gray-400 ml-auto group-hover:text-[#2b6cb0]" />
                  </router-link>




                  <!-- ✅ Logout Button -->
                  <a
                    href="#"
                    @click.prevent="logout"
                    class="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition-all duration-200"
                  >
                    <div
                      class="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"
                    ></div>
                    <div
                      class="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors duration-200"
                    >
                      <LogOut class="h-5 w-5 text-red-500 group-hover:text-red-600" />
                    </div>
                    <span class="font-medium text-gray-700 group-hover:text-red-600">Logout</span>
                    <ChevronRight class="h-3 w-3 text-gray-400 ml-auto group-hover:text-[#2b6cb0]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end -->
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import {
  User,
  ChevronRight,
  LogOut,
  Settings,
} from 'lucide-vue-next'
import {getuser} from '../repositories/Apis'

const userdata = ref({})

const id = Number(sessionStorage.getItem('id'))

// Dropdown toggle logic
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

onMounted( async () => {
  document.addEventListener('mousedown', handleClickOutside)
  userdata.value = await getuser(id)
  username.value = userdata.value.data.name

})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

// Username from session
const username = ref(sessionStorage.getItem('username') || 'User')

// 🚪 Logout Logic
const router = useRouter()

const logout = () => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('username')
  isDropdownOpen.value = false
  router.push('/login')
}
</script>

