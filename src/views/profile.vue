<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">


      <!-- Password Change Modal -->
      <div
        v-if="isPasswordModalOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="isPasswordModalOpen = false"
      >
        <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
          <h2 class="text-xl text-black font-semibold mb-4">Change Password</h2>
          <form @submit.prevent="handleChangePassword" class="space-y-4">
            <!-- New Password -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Enter new password</label>
              <div class="relative">
                <input
                  v-model="passwordForm.newPassword"
                  :type="showPasswords.new ? 'text' : 'password'"
                  class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility('new')"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg v-if="showPasswords.new" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Confirm password</label>
              <div class="relative">
                <input
                  v-model="passwordForm.confirmPassword"
                  :type="showPasswords.confirm ? 'text' : 'password'"
                  class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility('confirm')"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg v-if="showPasswords.confirm" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
              <button
                type="button"
                @click="isPasswordModalOpen = false"
                class="w-full sm:w-auto text-black px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Header Card -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <!-- Avatar -->
          <!-- <div class="relative group">
            <input
              ref="imageInput"
              type="file"
              accept="image/*"
              @change="handleImageChange"
              class="hidden"
            />
            <img
              :src="profile.avatar"
              :alt="profile.fullName"
              class="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg cursor-pointer"
              @click="$refs.imageInput.click()"
            />
            <div
              class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              @click="$refs.imageInput.click()"
            >
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div class="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div> -->

          <!-- User Info -->
          <div class="flex-1 text-center sm:text-left">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{{ profile.fullName }}</h1>
            <div class="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
              <span
                :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                  profile.role === 'Admin'
                    ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                ]"
              >
                {{ profile.role }}
              </span>
              <span class="text-gray-600">ID: {{ profile.employeeId }}</span>
            </div>

          </div>
        </div>
              <!-- Top Action Buttons -->
      <div class="flex flex-col sm:flex-row justify-end gap-3 mb-6">
        <button
          @click="isPasswordModalOpen = true"
          class="w-full sm:w-auto px-6 py-3 bg-white border text-black border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-sm"
        >
          Change Password
        </button>
        <button
          @click="handleLogout"
          class="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
        >
          Log Out
        </button>
      </div>
      </div>

     <!-- Stats Cards -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  <div class="bg-white rounded-xl shadow-md p-4 border border-gray-100 flex items-center">
    <div class="p-2 bg-green-100 rounded-lg shrink-0">
      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    </div>
    <div class="ml-3 overflow-hidden">
      <p class="text-sm font-medium text-gray-600 truncate">Account Balance</p>
      <p class="text-lg font-semibold text-gray-900">{{ profile.account_balance }}</p>
    </div>
  </div>
</div>


      <!-- Profile Form -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Profile Settings</h2>
          <p class="text-gray-600 text-sm mt-1">Manage your lunch dashboard preferences</p>
        </div>

        <div class="p-6">
          <form @submit.prevent="saveProfile">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Full Name -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-black text-gray-700">Full Name</label>
                <input
                  v-model="profile.fullName"
                  type="text"
                  class="w-full px-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <!-- Employee ID -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Employee ID</label>
                <input
                  :value="profile.employeeId"
                  type="text"
                  disabled
                  class="w-full text-black px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-black text-gray-700">Email Address</label>
                <input
                  v-model="profile.email"
                  type="email"
                  class="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <!-- Role (Disabled) -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Role</label>
                <input
                  :value="profile.role"
                  type="text"
                  disabled
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <!-- Joining Date (Read-only) -->
              <!-- <div class="space-y-2 md:col-span-2">
                <label class="block text-sm font-medium text-gray-700">Joining Date</label>
                <input
                  :value="formatDate(profile.joiningDate)"
                  type="text"
                  readonly
                  class="w-full md:max-w-md px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div> -->
            </div>

            <!-- Save Button -->
            <div class="mt-8 flex justify-end">
              <button
                type="submit"
                :disabled="saving"
                class="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <span v-if="saving">Saving...</span>
                <span v-else>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      url : import.meta.env.VITE_URL,
      id: sessionStorage.getItem('id'),
      // token: sessionStorage.getItem('token'),
      // roleid: sessionStorage.getItem('role'),
      username: '',
      user_data:{},
      saving: false,
      isPasswordModalOpen: false,
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      showPasswords: {
        current: false,
        new: false,
        confirm: false
      },
      profile: {
        fullName: 'John Doe',
        employeeId: 'EMP001',
        email: 'john.doe@company.com',
        role: 'Admin',
        account_balance: 0,

      }
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },

    handleImageChange(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          this.profile.avatar = reader.result
        }
        reader.readAsDataURL(file)
      }
    },

    togglePasswordVisibility(field) {
      this.showPasswords[field] = !this.showPasswords[field]
    },

    async handleChangePassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        alert("New password and confirm password don't match!")
        return
      }

      if (this.passwordForm.newPassword.length < 6) {
        alert('Password must be at least 6 characters long!')
        return
      }

      await fetch(this.url + 'user/updatebyuser/' + this.id, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          "password": this.passwordForm.confirmPassword
        })
      })

      alert('Password changed successfully!')
      this.isPasswordModalOpen = false
      this.passwordForm = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    },

    handleLogout() {
      if (confirm('Are you sure you want to log out?')) {
        sessionStorage.clear()
        this.$router.push('/login')
        alert('Logout functionality - redirecting...')
      }
    },

    async saveProfile() {
      this.saving = true

      try {
        await fetch(this.url + 'user/updatebyuser/' + this.id, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify({
            "name": this.profile.fullName,
            "email": this.profile.email
          })
        })

        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log('Profile saved:', this.profile)
        alert('Profile updated successfully!')
      } catch (error) {
        console.error('Error saving profile:', error)
        alert('Failed to update profile. Please try again.')
      } finally {
        this.saving = false
      }
    }
  },

  async mounted() {
    console.log('Component mounted');

    try {

      const response = await fetch( this.url + 'user/getuser/' + this.id, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
      })

      this.user_data = await response.json();
      this.username = this.user_data.data.name
      this.profile.fullName = this.user_data.data.name
      this.profile.employeeId = this.user_data.data.id
      this.profile.email = this.user_data.data.email
      this.profile.role = this.user_data.data.role_name
      this.profile.account_balance = this.user_data.data.account_balance

      // console.log('Response:', this.user_data);


    } catch (error) {
      console.log('Error: ' + error)
    }

  },

}
</script>

<style scoped>
/* Ensure proper responsive behavior */
* {
  box-sizing: border-box;
}

.transition-all {
  transition: all 0.2s ease-in-out;
}

.transition-colors {
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
}

.transition-opacity {
  transition: opacity 0.2s ease-in-out;
}

/* Force proper responsive grid behavior */
.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\:col-span-2 {
    grid-column: span 2 / span 2;
  }

  .md\:max-w-md {
    max-width: 28rem;
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 640px) {
  .sm\:flex-row {
    flex-direction: row;
  }

  .sm\:w-auto {
    width: auto;
  }

  .sm\:text-left {
    text-align: left;
  }

  .sm\:space-y-0 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 0;
  }

  .sm\:space-x-4 > :not([hidden]) ~ :not([hidden]) {
    margin-left: 1rem;
  }

  .sm\:space-x-6 > :not([hidden]) ~ :not([hidden]) {
    margin-left: 1.5rem;
  }
}
</style>
