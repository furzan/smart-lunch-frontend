<template>
  <div
    class="h-screen from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden"
  >
    <div class="w-full max-w-md mx-4 p-6 bg-white rounded-xl shadow-2xl">
      <div class="rounded-lg bg-white p-6">
        <h1 class="text-3xl font-bold text-center text-blue-700 mb-4">
          Smart Lunch Login
        </h1>
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label for="username" class="block mb-1 text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              type="text"
              id="username"
              v-model="username"
              class="w-full px-4 py-3 text-base text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div>
            <label for="password" class="block mb-1 text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full px-4 py-3 text-base text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full py-3 rounded-md text-white text-lg font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p v-if="loginError" class="mt-4 text-center text-sm text-red-500">
          {{ loginError }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { getallroles } from "../repositories/Apis";

const router = useRouter();

// onMounted(() => {
//   const token = sessionStorage.getItem('token');
//   if (token) {
//     router.push('/');
//   }
// });

defineOptions({
  name: "LoginView",
});

const username = ref("");
const password = ref("");
const loginError = ref("");

const handleLogin = async () => {
  try {
    const response = await fetch("https://6f23c0203bf8.ngrok-free.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username.value,
        password: password.value,
      }),
    });

    const data = await response.json();
    if (data.message === "success") {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("roleid", data.role);
      sessionStorage.setItem("id", data.id);

      const rolesResponse = await axios.get(
        "https://6f23c0203bf8.ngrok-free.app/user/getallroles",
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const roles = Array.isArray(rolesResponse.data?.data)
        ? rolesResponse.data.data
        : [];
      console.log("Roles from API:", roles);
      const userRole = roles.find((role) => String(role.id) === String(data.role));

      if (userRole) {
        if (userRole.rolename === "admin" || userRole.rolename === "employee") {
          router.push("/");
        } else if (userRole.rolename === "collector") {
          router.push("/collector");
        } else {
          router.push("/access_restricted");
        }
      } else {
        loginError.value = "Role not recognized.";
      }
    } else {
      loginError.value = "Login failed. Try again.";
    }
  } catch (error) {
    console.error(error);
    loginError.value = "Network error or server not responding.";
  }
};
</script>
