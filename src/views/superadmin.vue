<template>
<div class="min-h-screen w-full bg-gray-100 text-gray-800">
    <!-- Sticky Header -->
   <header class="sticky top-0 z-10 bg-purple-100 border-2 border-purple-200  px-4 sm:px-6 py-3 flex flex-wrap sm:flex-nowrap justify-between items-center gap-3 sm:gap-0">
  <h1 class="text-lg sm:text-xl md:text-2xl font-bold whitespace-nowrap">
    🍱 Lunch Dashboard
  </h1>

  <!-- Super Admin Dropdown -->
<div class="ml-4 flex items-center md:ml-6">
  <div v-if="isAdmin" class="relative" ref="adminDropdownRef">
    <button
      @click="toggleAdminDropdown"
      class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-full hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 6h14M5 18h14" />
      </svg>
    </button>

    <transition name="fade">
      <div
        v-if="isAdminDropdownOpen"
        class="absolute right-0 mt-2 w-64 origin-top-right z-50"
      >
        <div class="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div class="px-4 py-4 bg-blue-200 text-black border-3 border-blue-300 text-sm font-semibold">
            Signed in as: {{ username }}
          </div>

          <div class="flex flex-col gap-2 px-4 py-4">
            <button
              @click="handleNotify"
              class=" hover:bg-green-300 text-sm px-4 py-2 rounded-md shadow bg-green-50 border-2 border-green-300 rounded-xl shadow-sm"
            >
              📢 Notify
            </button>
            <button
              @click="handleAdd"
              class="hover:bg-purple-300 text-sm px-4 py-2 rounded-md shadow bg-purple-50 border-2 border-purple-300 rounded-xl shadow-sm"
            >
              ➕ Add Employee
            </button>
            <button
              @click="openModal"
              class="hover:bg-blue-300 text-sm px-4 py-2 rounded-md shadow bg-blue-50 border-2 border-blue-300 rounded-xl shadow-sm"
            >

            🍽️ Add Dish
            </button>
            <button
              @click="openResturantModal"
              class="hover:bg-yellow-300 text-sm px-4 py-2 rounded-md shadow bg-yellow-50 border-2 border-yellow-300 rounded-xl shadow-sm"
            >
            🍽️ Add Resturant
            </button>

            <button @click="gotodashboard"
              class="hover:bg-orange-200 text-sm px-4 py-2 rounded-md shadow bg-orange-50 border-2 border-orange-300 rounded-xl shadow-sm"
            >
             Go To Dashboard
            </button>

            <button
              @click="logout"
              class="hover:bg-red-200 text-sm px-4 py-2 rounded-md shadow bg-red-50 border-2 border-red-300 rounded-xl shadow-sm"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</div>
</header>




   <!-- Add Dish Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4">
        <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h3 class="text-2xl font-bold mb-6">Add a New Dish</h3>
          <form @submit.prevent="addDish">
            <div class="mb-4">
              <label for="dishName" class="block text-gray-700 font-semibold mb-2">Dish Name</label>
              <input v-model="newDish.dish_name" type="text" id="dishName" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
            </div>
            <div class="mb-4">
              <label for="estimatedServing" class="block text-gray-700 font-semibold mb-2">Estimated Serving</label>
              <input v-model.number="newDish.estimated_serving" type="number" min="1" id="estimatedServing" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
            </div>
            <div class="mb-4">
              <label for="price" class="block text-gray-700 font-semibold mb-2">Price (Rs)</label>
              <input v-model.number="newDish.price" type="number" min="1" id="price" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
            </div>

            <div class="mb-4">
              <label for="restaurantId" class="block text-gray-700 font-semibold mb-2">Restaurant</label>
              <select v-model.number="newDish.restaurant_id" id="restaurantId" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
                <option disabled value="">Select a restaurant</option>
                <option v-for="restaurant in resturants" :key="restaurant.id" :value="restaurant.id">
                  {{ restaurant.restaurant_name }}
                </option>
              </select>
            </div>

            <div class="flex justify-end space-x-4 mt-6">
              <button type="button" @click="closeModal" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">Cancel</button>
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add Dish</button>
            </div>
          </form>
        </div>
      </div>



   <!-- Add Resturant modal -->


    <!-- Resturant Modal -->
<div v-if="isResturantModalOpen" class="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4">
  <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
    <h3 class="text-2xl font-bold mb-6">Add a New Resturant</h3>

    <form @submit.prevent="addResturant">
      <div class="mb-4">
        <label for="resturantName" class="block text-gray-700 font-semibold mb-2">Resturant Name</label>
        <input
          v-model="newResturant.name"
          type="text"
          id="resturantName"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        >
      </div>

      <div class="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          @click="closeResturantModal"
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Resturant
        </button>
      </div>
    </form>
  </div>
</div>
<!-- dish modal end -->






    <!-- Dashboard Cards -->
    <main class="p-6 md:p-10">
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Card 1: Today's Lunch -->
  <div class="bg-green-50 border-2 border-green-200 rounded-xl shadow-sm">
    <div class="p-4 sm:p-5 flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600 mb-1">Balance Pool</p>
        <p class="text-xl font-bold text-blue-500">Rs. {{ balancepool }}</p>
        <!-- <p class="text-sm text-gray-500 mt-1">Updated Live</p> -->
        <!-- <p class="text-sm font-medium text-gray-600 mb-1">Status</p>
        <p class="text-xl font-bold text-green-600">Contributions Ongoing</p>
        <p class="text-sm text-gray-500 mt-1">Today's Lunch</p> -->
      </div>
    </div>
  </div>

  <!-- Card 2: Total Budget -->
  <div class="bg-blue-50 border-2 border-blue-200 rounded-xl shadow-sm">
    <div class="p-4 sm:p-5 flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600 mb-1">Total Budget</p>
        <p class="text-xl font-bold text-blue-500">Rs. {{ totalBudget }}</p>
        <p class="text-sm text-gray-500 mt-1">Updated Live</p>
      </div>
    </div>
  </div>

  <!-- Card 3: Participants -->
  <div class="bg-purple-50 border-2 border-purple-200 rounded-xl shadow-sm">
    <div class="p-4 sm:p-5 flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600 mb-1">Total Participants</p>
        <p class="text-xl font-bold text-purple-500">{{ participantsCount }}</p>
        <p class="text-sm text-gray-500 mt-1">Joined Today</p>
      </div>
    </div>
  </div>
</div>
    </main>




<!-- add money modal  -->
<!-- 💰 Wallet Modal -->
<div v-if="showMoneyModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg text-center">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">My Wallet</h2>

    <!-- Current Balance -->
    <p class="text-gray-600 mb-2">Current Balance:</p>
    <p class="text-3xl font-bold text-blue-600 mb-4">Rs. {{ currentWalletBalance }}</p>

    <!-- Input Field -->
    <input
      v-model.number="moneyInput"
      type="number"
      placeholder="Enter amount"
      class="w-full mb-4 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500"
    />

    <!-- Action Buttons -->
    <div class="flex gap-4 justify-center">
      <button
        @click="addMoney"
        class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Add Money
      </button>
      <button
        v-if="selectedUserForWallet && (selectedUserForWallet.role_name?.toLowerCase() !== 'collector' && selectedUserForWallet.roleid !== 3)"
        @click="subMoney"
        class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Deduct Money
      </button>
    </div>

    <!-- Close Button -->
    <button
      @click="showMoneyModal = false"
      class="mt-6 text-sm text-gray-500 hover:underline"
    >
      Close
    </button>
  </div>
</div>
<!-- end modal  -->




   <!-- Add Employee Modal -->
<div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
    <h3 class="text-xl font-semibold mb-4">Add New Employee</h3>
    <form @submit.prevent="handleAddEmployee" class="space-y-4">
      <input v-model="newEmployee.name" type="text" placeholder="Name" required class="w-full p-2 border rounded-md" />
      <input v-model="newEmployee.id" type="text" placeholder="Employee ID" required class="w-full p-2 border rounded-md" />
      <input v-model="newEmployee.email" type="email" placeholder="Email" required class="w-full p-2 border rounded-md" />
      <input v-model="newEmployee.password" type="password" placeholder="Password" required class="w-full p-2 border rounded-md" />

      <!-- New Role Dropdown -->
      <select v-model="newEmployee.roleid" placeholder="Role" required class="w-full p-2 border rounded-md bg-white text-gray-700">
        <option disabled value="">Select Role</option>
        <option v-for="role in roles" :key="role.id" :value="role.id">
          {{ role.rolename }}
        </option>
      </select>

      <div class="flex justify-end gap-2 pt-4">
        <button @click="showModal = false" type="button" class="px-4 py-2 bg-gray-300 rounded-md">
          Cancel
        </button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add
        </button>
      </div>
    </form>

    <p v-if="addError" class="mt-2 text-red-600">{{ addError }}</p>
    <p v-if="addSuccess" class="mt-2 text-green-600">{{ addSuccess }}</p>
  </div>
</div>
<!-- end -->




<!-- Final Lunch Summary Section -->
<div>

    <!-- Message before 12:30 PM -->
    <div v-if="!canViewDishes" class="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
      <p class="text-lg text-gray-600 mb-2">Dishes will be available after 12:30 PM</p>
      <p class="text-sm text-gray-500">Time remaining: {{ timeUntilAvailable }}</p>
    </div>

    <!-- Message after 12:30 PM if no one contributed -->
    <div v-else-if="canViewDishes && !todaylunchcheck" class="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
      <p class="text-lg text-gray-600 mb-2">No Lunch Today</p>
    </div>

    <div v-else>

      <div v-if="purchases.length == 0" class="max-w-4xl mx-auto space-y-6">

        <div class=" bg-gray-100 overflow-hidden">

              <!-- Lunch Ready Button -->
              <!-- <button @click="notifyLunchReady"
                      :disabled="lunchNotified"
                      :class="[
                        'px-4 py-2 rounded-lg font-semibold transition-colors',
                        lunchNotified
                          ? 'bg-green-600 text-white cursor-not-allowed'
                          : 'bg-white text-orange-600 hover:bg-gray-100'
                      ]">
                {{ lunchNotified ? '✅ Lunch Ready!' : '🔔' }}
              </button> -->

          <!-- Message before 12:30 PM -->
          <div v-if="!canViewDishes" class="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-lg text-gray-600 mb-2">Dishes will be available after 12:30 PM</p>
            <p class="text-sm text-gray-500">Time remaining: {{ timeUntilAvailable }}</p>
          </div>

          <div v-else class="p-6">
            <!-- Restaurant Name -->
            <div class="text-center mb-6">
              <div class="inline-block bg-gradient-to-r from-orange-100 to-red-100 px-6 py-2 rounded-lg">
                <h2 class="text-2xl font-bold text-gray-800">{{ dishes.restaurant_name }}</h2>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Dishes Section -->
              <div class="lg:col-span-2 space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-xl font-semibold text-gray-800">🗳️ Available Dishes</h3>
                  <button v-if="canViewDishes" @click="clearCurrentOrder"
                          class="px-3 py-1 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors">
                    Clear Order
                  </button>
                </div>

                <!-- Message before 12:30 PM -->
                <!-- <div v-if="!canViewDishes" class="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                  <p class="text-lg text-gray-600 mb-2">Dishes will be available after 12:30 PM</p>
                  <p class="text-sm text-gray-500">Time remaining: {{ timeUntilAvailable }}</p>
                </div> -->

                <!-- Dishes content after 12:30 PM -->
                <div class="max-h-[500px] overflow-y-auto pr-2">

                <div v-for="dish in dishes.dishes" :key="dish.id"
                    class="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-3 ">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex-1">
                      <div class="flex items-center justify-between mb-1">
                        <h4 class="font-semibold text-gray-800">{{ dish.dish_name }}</h4>
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                          {{ dish.votes }} votes
                        </span>
                      </div>
                      <p class="text-sm text-gray-600">Rs {{ dish.price }} per</p>
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="text-right">
                      <span class="text-lg font-bold text-orange-600">Rs {{ dish.price * dish.quantity }}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <button @click="decreaseDishQuantity(dish.id)"
                              class="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center">
                        <span class="text-lg font-bold">-</span>
                      </button>
                      <div class="w-12 text-center">
                        <span class="font-semibold">{{ dish.quantity }}</span>
                        <div class="text-xs text-gray-500">quantity</div>
                      </div>
                      <button @click="increaseDishQuantity(dish.id)"
                              :disabled="!canIncreaseQuantity(dish.price)"
                              class="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                        <span class="text-lg font-bold">+</span>
                      </button>
                    </div>

                  </div>
                </div>

                </div>

                <!-- Sides Section -->

              </div>

              <!-- Budget Card -->
              <div class="lg:col-span-1">
                <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-4 sticky top-4">
                  <h4 class="text-lg font-bold text-gray-800 mb-3 text-center">💰 Budget Summary</h4>

                  <!-- Message before 12:30 PM -->
                  <div v-if="!canViewDishes" class="text-center p-4">
                    <p class="text-gray-600 mb-2">Budget details will be available after 12:30 PM</p>
                    <p class="text-sm text-gray-500">Time remaining: {{ timeUntilAvailable }}</p>
                  </div>

                  <!-- Budget content after 12:30 PM -->
                  <div v-else class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-gray-700">Total Budget:</span>
                      <span class="font-bold text-green-600">Rs {{ totalBudget }}</span>
                    </div>

                    <hr class="border-gray-300">

                    <div class="space-y-1 text-sm">
                      <div v-for="dish in dishes.dishes" :key="dish.id" v-show="dish.quantity > 0" class="flex justify-between">
                        <span>{{ dish.dish_name }} ({{ dish.quantity }} plates)</span>
                        <span>Rs {{ dish.price * dish.quantity }}</span>
                      </div>

                      <!-- <div v-show="rotiQuantity > 0" class="flex justify-between">
                        <span>Roti ({{ rotiQuantity }} pieces)</span>
                        <span>Rs {{ rotiPrice * rotiQuantity }}</span>
                      </div>

                      <div v-if="selectedYogurt" class="flex justify-between">
                        <span>Yogurt</span>
                        <span>Rs {{ yogurtPrice }}</span>
                      </div>

                      <div v-if="selectedSalad" class="flex justify-between">
                        <span>Salad</span>
                        <span>Rs {{ saladPrice }}</span>
                      </div> -->
                    </div>

                    <hr class="border-gray-300">

                    <div class="flex justify-between font-bold">
                      <span>Total Cost:</span>
                      <span class="text-red-600">Rs {{ totalSpent }}</span>
                    </div>

                    <div class="flex justify-between font-bold text-lg">
                      <span>Remaining:</span>
                      <span class="text-green-600">Rs {{ Math.max(0, totalBudget - totalSpent) }}</span>
                    </div>

                    <div class="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div class="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                          :style="{ width: Math.min((totalSpent / totalBudget * 100), 100) + '%' }"></div>
                    </div>

                    <div v-if="totalSpent >= totalBudget" class="text-center text-orange-600 font-semibold mt-2">
                      💡 Budget Limit Reached!
                    </div>
                  </div>

                  <button @click="placeOrder"
                          :disabled="totalSpent === 0 || totalSpent > totalBudget"
                          class="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4">
                    Place Order
                  </button>
                </div>
                <!-- Lunch from Home Section -->


              <div class="bg-gradient-to-br from-blue-100 m-3 to-blue-50 p-6 rounded-2xl shadow-md border border-blue-200">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">🏠 Lunch from Home</h3>

                <div class="space-y-2">
                  <template v-if="homeitems && homeitems.length > 0">
                    <div
                      v-for="(item, index) in homeitems.filter(i => i.brought_food)"
                      :key="index"
                      class="flex items-center p-2 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span class="text-gray-700 text-sm">
                        {{ item.dish || 'No dish specified' }} ({{ item.plates }} Plates)
                      </span>
                    </div>
                    <div
                      v-if="!homeitems.some(i => i.brought_food)"
                      class="text-gray-500 text-sm italic p-2"
                    >
                      No lunch from home today
                    </div>
                  </template>
                  <div v-else class="text-gray-500 text-sm italic p-2">
                    No data available
                  </div>
                </div>
              </div>

              </div>

            </div>

          </div>

        </div>

        <!-- Success/Notification Messages -->
        <div v-if="showSuccessMessage" class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div class="flex items-center space-x-2">
            <span class="text-xl">✅</span>
            <span class="font-semibold">{{ successMessage }}</span>
          </div>
        </div>

      </div>

      <div v-else
      class="max-w-md mx-auto mt-10 p-4 rounded-xl shadow-lg bg-green-50 border border-green-200 flex items-center space-x-4 animate-fade-in"
    >
      <svg
        class="w-6 h-6 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M5 13l4 4L19 7" />
      </svg>
      <span class="text-green-800 font-medium text-lg">
        Your order has been placed successfully!
      </span>
      </div>

    </div>

</div>



   <!-- Employee List -->
<div class="mt-10 rounded-xl p-6 border border-gray-200">
  <h2 class="text-xl font-semibold mb-4 text-gray-800">Employee List</h2>

  <!-- Scrollable Container -->
  <div class="min-h-[360px] max-h-[460px] overflow-y-auto space-y-4 pr-2">
    <div
      v-for="(emp, index) in employees.filter(emp => (emp.role_name || emp.role || '').toLowerCase() !== 'collector')"
      :key="index"
      class="bg-white rounded-lg px-4 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border border-gray-200 hover:shadow transition"
    >
      <!-- Left: Info -->
      <div>
        <p class="font-semibold text-gray-800">
          {{ emp.name }} <span class="text-gray-400 text-sm">(#{{ emp.id }})</span>
        </p>
        <p class="text-sm text-gray-500">{{ emp.email }}</p>
        <span class="mt-1 inline-block px-2 py-0.5 text-xs font-semibold rounded-full text-white bg-green-600">
          {{ emp.role_name || emp.role || 'Employee' }}
        </span>
      </div>

      <!-- Right: Status + Actions -->
      <div class="flex items-center gap-2 min-w-[180px] justify-end relative">
        <!-- Status Pill -->
        <span
          class="px-3 py-1 text-sm font-semibold rounded-full whitespace-nowrap truncate"
          :class="emp.hasJoined ? 'bg-green-100 text-green-700' : 'bg-green-100 text-green-700'"
        >
          {{ emp.contribution ? 'Joined '  : 'Not Participated' }}
        </span>

        <!-- Dropdown -->
        <div class="relative">
          <button
            @click.stop="toggleDropdown(index, 'employee')"
            class="p-2 rounded-full hover:bg-gray-100"
          >
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v.01M12 12v.01M12 18v.01" />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="activeDropdown.type === 'employee' && activeDropdown.index === index"
            @click.stop
            class="absolute right-0 z-20 mt-2 w-44 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5"
          >
            <button
              @click="openWalletModal(emp)"
              class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              Manage Wallet
            </button>
            <button
              @click="openEditUserModal(emp)"
              class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              Edit User
            </button>
            <button
              class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
              @click="removeparticipant(emp.id,emp.contribution, index)"
            >
              Remove Participant
            </button>
            <button
              class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
              @click="removeEmployee(emp.id, index)"
            >
              Remove User
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



   <!-- Collector List -->
<div class="mt-10 mb-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
  <h2 class="text-xl font-semibold mb-4 text-gray-800">Collectors</h2>
  <ul class="space-y-4">
    <li
      v-for="(emp, index) in collectorEmployees"
      :key="emp.id"
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm transition hover:shadow-md"
    >
      <!-- Left: Info -->
      <div class="space-y-1">
        <p class="font-semibold text-gray-800">
          {{ emp.name }} <span class="text-sm text-gray-400">(#{{ emp.id }})</span>
        </p>
        <p class="text-sm text-gray-500">{{ emp.email }}</p>
        <span
          class="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full text-white bg-blue-600"
        >
          {{ emp.role_name || emp.role || 'Collector' }}
        </span>
      </div>

      <!-- Right: Dropdown -->
      <div class="flex items-center gap-2 justify-end relative mt-2 sm:mt-0">
        <button
          @click.stop="toggleDropdown(index, 'collector')"
          class="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          <svg
            class="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v.01M12 12v.01M12 18v.01" />
          </svg>
        </button>

        <!-- Dropdown -->
        <div
  v-if="activeDropdown.type === 'collector' && activeDropdown.index === index"
  @click.stop
  class="absolute top-full right-0 mt-2 w-44 rounded-xl bg-white shadow-md ring-1 ring-black ring-opacity-5 origin-top-right transition-all duration-200"
>

          <button
            @click="openWalletModal(emp)"
            class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            Manage Wallet
          </button>
          <button
            @click="openEditUserModal(emp)"
            class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            Edit User
          </button>
          <button
            class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
            @click="removeEmployee(emp.id, index)"
          >
            Remove User
          </button>
        </div>
      </div>
    </li>
  </ul>
</div>
<!-- Collector List end -->


 <!-- Responsive Side-by-Side Container -->
 <!-- Clean Side-by-Side Restaurant and Dish List -->
<div class="flex flex-col md:flex-row gap-6 p-6 rounded-xl min-h-[650px] bg-transparent ">

  <!-- Restaurant List -->
  <div class="flex-1 border border-green-400 bg-white rounded-2xl shadow-md p-6 min-h-[500px] max-h-[500px]">
    <h2 class="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">🥗 Restaurant List</h2>
    <ul class="space-y-3 max-h-[400px] overflow-y-auto">

      <li
        v-for="(restaurant, index) in resturants"
        :key="index"
        class="bg-yellow-50 hover:bg-yellow-100 transition-all duration-200 rounded-xl px-4 py-3 flex justify-between items-center shadow-sm"
      >
        <div>
          <p class="font-semibold text-gray-800">{{ restaurant.restaurant_name }}</p>
          <p class="text-xs text-gray-500">ID: {{ restaurant.id }}</p>
        </div>
        <div class="relative">
          <button
                @click="deleterestaurant(restaurant.id)"
                class="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
              >
                Delete
          </button>
        </div>
      </li>

    </ul>
  </div>

  <!-- Dish List -->
  <div class="flex-1 border border-indigo-400 bg-white rounded-2xl shadow-md p-6 min-h-[500px] max-h-[50px]">
    <h2 class="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2">🍛 Dish List</h2>
    <ul class="space-y-3 max-h-[400px] overflow-y-auto">
      <li
        v-for="(dish, index) in allDishes"
        :key="dish.id"
        class="bg-white hover:bg-indigo-50 transition-all duration-200 rounded-xl px-6 py-4 flex justify-between items-center shadow-md border border-gray-200"
      >
        <div class="space-y-1">
          <p class="text-lg font-semibold text-indigo-800">
            {{ dish.dish_name }}
            <span class="text-sm text-gray-500">(ID: {{ dish.id }})</span>
          </p>
          <p class="text-sm text-gray-600">💰 Price: Rs. {{ dish.price }}</p>
          <p class="text-sm text-gray-600">🍽️ Estimated Serving: {{ dish.estimated_serving }}</p>
          <p class="text-sm text-gray-600">🏬 Restaurant ID: {{ dish.restaurant_id }}</p>
        </div>

        <button
          @click="deleteDish(dish.id)"
          class="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>

</div>


<!-- resturaunt list end -->


<!-- Edit User Modal -->
<div v-if="showEditUserModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
    <h3 class="text-xl font-semibold mb-4">Edit User</h3>
    <form @submit.prevent="handleEditUser" class="space-y-4">
      <div>
        <label for="editUserName" class="block text-gray-700 font-semibold mb-1">Name</label>
        <input v-model="editUserForm.name" id="editUserName" type="text" required class="w-full p-2 border rounded-md" />
      </div>
      <div>
        <label for="editUserEmail" class="block text-gray-700 font-semibold mb-1">Email Address</label>
        <input v-model="editUserForm.email" id="editUserEmail" type="email" required class="w-full p-2 border rounded-md" />
      </div>
      <div>
        <label for="editUserRole" class="block text-gray-700 font-semibold mb-1">Role</label>
        <select v-model="editUserForm.roleid" id="editUserRole" required class="w-full p-2 border rounded-md bg-white text-gray-700">
          <option disabled value="">Select Role</option>
          <option v-for="role in roles" :key="role.id" :value="role.id">
            {{ role.rolename }}
          </option>
        </select>
      </div>
      <div>
        <label for="editUserPassword" class="block text-gray-700 font-semibold mb-1">Password</label>
        <input v-model="editUserForm.password" id="editUserPassword" type="password" required class="w-full p-2 border rounded-md" />
      </div>
      <div class="flex items-center gap-2">
        <input v-model="editUserForm.regular" type="checkbox" id="regular" class="h-4 w-4" />
        <label for="regular" class="text-gray-700">Regular</label>
      </div>
      <div class="flex justify-end gap-2 pt-4">
        <button @click="showEditUserModal = false" type="button" class="px-4 py-2 bg-gray-300 rounded-md">
          Cancel
        </button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Update
        </button>
      </div>
    </form>
  </div>
</div>

<!-- Edit User end -->




  </div>
</template>

<script setup>
import { ref, computed, onMounted,reactive  } from 'vue'
import axios from 'axios' // ✅ Step 1: Import axios
import { getplatesneeded, finalizeddishes, gettotalbudget, getbalancepool, getnumparticipants, getalluser, addpurchase, getallcontributions, getallroles, register, adddish, updateuser, transferfrompool, getallpurchases, getalldishes,getallrestaurants, deleteuser, gettotalroti } from '../repositories/Apis'
import { useRouter } from 'vue-router';

const router = useRouter();


const url = import.meta.env.VITE_URL
const isAdmin = true
const showModal = ref(false)
const addSuccess = ref('')
const addError = ref('')
const searchTerm = ref('')
const employeeList = ref([]);
const platesneeded = ref(0)
const dishes = ref({
  restaurant_name: '',
  dishes: []
})
const balancepool = ref(0)
const participantsCount = ref(0)
const roles = ref([])

const employees = ref([])

const purchases = ref([])

let todaylunchcheck = ref(false)

let empofwalletbutton = ref()


// Computed: Only employees with Collector role
const collectorEmployees = computed(() => {
  return employees.value.filter(emp => {
    // Accept both role_name and role fields for flexibility
    const role = (emp.role_name || emp.role || '').toLowerCase()
    return role === 'collector'
  })
})



const isAdminDropdownOpen = ref(false)
const adminDropdownRef = ref(null)

// Time-based display control for dishes section
const canViewDishes = computed(() => {
  const now = new Date()
  const availableTime = new Date(now)
  availableTime.setHours(12, 30, 0, 0) // 12:30 PM
  return now >= availableTime
})

const timeUntilAvailable = computed(() => {
  const now = new Date()
  const availableTime = new Date(now)
  availableTime.setHours(12, 30, 0, 0) // 12:30 PM

  if (now >= availableTime) return "Available now"

  const diff = availableTime - now
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)

  return `${hours}h ${minutes}m`
})

const toggleAdminDropdown = () => {
  isAdminDropdownOpen.value = !isAdminDropdownOpen.value
}

const handleAdd = () => {
  showModal.value = true
  isAdminDropdownOpen.value = false
}

const handleNotify = () => {
  notifyEveryone() // Make sure this function is already declared
  isAdminDropdownOpen.value = false
}

const logout = () => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('username')
  window.location.href = '/login'
}

const gotodashboard = ()=>{
  router.push('/');
}

const username = ref(sessionStorage.getItem('username') || 'Admin')

// Optional: close dropdown on outside click
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (adminDropdownRef.value && !adminDropdownRef.value.contains(e.target)) {
      isAdminDropdownOpen.value = false
    }
  })
})



const showEditUserModal = ref(false)
const editUserForm = reactive({
  name: '',
  id: '',
  email: '',
  roleid: '',
  password: '',
  regular: false,
  account_balance: 0
})

function openEditUserModal(emp) {
  editUserForm.name = emp.name || ''
  editUserForm.id = emp.id || ''
  editUserForm.email = emp.email || ''
  editUserForm.roleid = emp.roleid || emp.role_id || emp.roleId || ''
  editUserForm.password = emp.password || ''
  editUserForm.regular = emp.regular !== undefined ? emp.regular : false
  editUserForm.account_balance = emp.account_balance !== undefined ? emp.account_balance : 0
  showEditUserModal.value = true
}

const handleEditUser = async () => {
  try {
    // id is the employee id (string or number)
    const id = editUserForm.id
    // Prepare payload for updateuser
    const payload = {
      name: editUserForm.name,
      email: editUserForm.email,
      roleid: editUserForm.roleid,
      password: editUserForm.password,
      regular: editUserForm.regular,
      account_balance: editUserForm.account_balance
    }
    await updateuser(id, payload)
    alert('User updated successfully!')
    showEditUserModal.value = false
  } catch (error) {
    alert('Failed to update user.')
    console.error(error)
  }
}


// dish dropdown
// Dish dropdown state
const activeDishDropdown = ref({ type: null, index: null })

function toggleDishDropdown(index, type) {
  if (activeDishDropdown.value.type === type && activeDishDropdown.value.index === index) {
    activeDishDropdown.value = { type: null, index: null }
  } else {
    activeDishDropdown.value = { type, index }
  }
}



// Remove Dish function
async function removeDish(id, index) {
  try {
    const token = sessionStorage.getItem('token')
    const response = await fetch(`${url}core/deletecontribution/` + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    })

    const data = await response.json()
    console.log('Dish removed:', data)
  } catch (error) {
    console.error('Error removing dish:', error)
  }
}

// Resturaunt list function
// Restaurant list (fetched from API)
const resturants = ref([])

// Active dropdown control
const activeResturauntDropdown = ref({ index: null, type: null })

const toggleResturauntDropdown = (index, type) => {
  if (activeResturauntDropdown.value.index === index && activeResturauntDropdown.value.type === type) {
    activeResturauntDropdown.value = { index: null, type: null }
  } else {
    activeResturauntDropdown.value = { index, type }
  }
}

// Remove resturant
const removeResturant = (id, index) => {
  resturants.value.splice(index, 1)
}






//  three dots button start
const activeDropdown = ref({ type: null, index: null })
const showMoneyModal = ref(false)
const moneyInput = ref(0)
const currentWalletBalance = ref(0)
const selectedUserForWallet = ref(null) // Holds the user object for wallet modal
const id = sessionStorage.getItem('id')
const token = sessionStorage.getItem('token')
// Restaurant and dishes
const selectedRestaurant = ref({
  name: 'Spice Garden Restaurant',
})
// Sides
const rotiQuantity = ref(8) // Pre-selected with 8 rotis
const rotiPrice = ref(15)
const selectedYogurt = ref(false)
const yogurtPrice = ref(30)
const selectedSalad = ref(false)
const saladPrice = ref(40)

// const lunchNotified = ref(false)

let successMessage = ref('')
let showSuccessMessage = ref(false)

const homeitems = ref([])

function toggleDropdown(index, type) {
  if (activeDropdown.value.type === type && activeDropdown.value.index === index) {
    activeDropdown.value = { type: null, index: null }
  } else {
    activeDropdown.value = { type, index }
  }
}


// ✅ Add Money
const addMoney = async () => {
  if (!moneyInput.value || moneyInput.value <= 0) {
    alert('Please enter a valid amount.')
    return
  }
  const user = selectedUserForWallet.value
  const userId = user?.id || id
  const userRole = (user?.role_name || user?.role || '').toLowerCase()
  try {
    if (userRole === 'collector') {
      // Use transferfrompool for collectors
      await transferfrompool(Number(userId), Number(moneyInput.value))
      currentWalletBalance.value += moneyInput.value
      alert('Money transferred from pool successfully!')
      balancepool.value -= Number(moneyInput.value)
      totalBudget.value -= Number(moneyInput.value)
      moneyInput.value = 0
    } else {
      // Use addbalance API for others
      const response = await fetch(`${url}user/addbalance/${userId}/${moneyInput.value}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      })
      const data = await response.json()
      if (response.ok) {
        currentWalletBalance.value += moneyInput.value
        alert('Money added successfully!')
        moneyInput.value = 0
      } else {
        alert(data.message || 'Failed to add money.')
      }
    }
  } catch (error) {
    console.error('Error adding money:', error)
    alert('An error occurred while adding money.')
  }
}

// ✅ Subtract Money
const subMoney = async () => {
  if (!moneyInput.value || moneyInput.value <= 0) {
    alert('Please enter a valid amount.')
    return
  }
  if (moneyInput.value > currentWalletBalance.value) {
    alert('Insufficient balance to deduct this amount.')
    return
  }
  const userId = selectedUserForWallet.value?.id || id
  try {
    const response = await fetch(`${url}user/subbalance/${userId}/${moneyInput.value}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    })
    const data = await response.json()
    if (response.ok) {
      currentWalletBalance.value -= moneyInput.value
      alert('Money deducted successfully!')
      moneyInput.value = 0
    } else {
      alert(data.message || 'Failed to deduct money.')
    }
  } catch (error) {
    console.error('Error deducting money:', error)
    alert('An error occurred while deducting money.')
  }
}

// Open wallet modal for a specific user
function openWalletModal(user) {
  selectedUserForWallet.value = user
  currentWalletBalance.value = user.account_balance || 0
  showMoneyModal.value = true
  moneyInput.value = 0
}


async function removeEmployee (id, index) {
  employees.value.splice(index, 1)
  activeDropdown.value = false

  try {
    const data = await deleteuser(id);
    console.log( data)

  } catch (error) {
    console.error('error removing user:', error);
  }

}


async function removeparticipant (id, index) {

  activeDropdown.value = false

  try {
    const c = homeitems.value.find(item => item.user_id === id)
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${url}core/deletecontribution/` + c.id , {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });

    const data = await response.json();
    // Update the employee's contribution status in the employees list
    const emp = employees.value.find(e => e.id === id)
    if (emp) {
      emp.contribution = false
    }
    console.log( data)

  } catch (error) {
    console.error('error removing contribution:', error);
  }

}


async function deleterestaurant(id){
  try {
      const token = sessionStorage.getItem('token');
      fetch(`${url}core/deleterestaurant/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    })
  } catch (error) {
      console.error('error deleting restaurant  :', error);
  }
}

async function deleteDish(id){
  try {
      const token = sessionStorage.getItem('token');
      fetch(`${url}core/deletedidh/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    })
  } catch (error) {
      console.error('error deleting dish :', error);
  }
}

// three dots button end

const newEmployee = ref({
  name: '',
  id: '',
  email: '',
  password: '',
  roleid: ''
})


// const totalBudget = computed(() => employees.value.reduce((sum, emp) => sum + (emp.hasJoined ? emp.amount : 0), 0))/

const filteredEmployees = computed(() => {
  const term = searchTerm.value.toLowerCase()
  return employees.value.filter(emp =>
    emp.name.toLowerCase().includes(term) ||
    emp.email.toLowerCase().includes(term) ||
    emp.employeeId.toLowerCase().includes(term)
  )
})

// ✅ Step 2: Update handleAddEmployee to use Axios
const handleAddEmployee = async () => {
  addSuccess.value = ''
  addError.value = ''

  console.log('Sending employee data:', JSON.stringify(newEmployee.value))

  try {

    let data = await register(newEmployee.value)
    console.log("Response from server:", data)

    // ✅ Only handle valid success
    if (data.message === 'success') {
      employees.value.push({
        name: newEmployee.value.name,
        employeeId: newEmployee.value.id,
        email: newEmployee.value.email,
        password: newEmployee.value.password,
        hasJoined: false,
        amount: 0
      })

      addSuccess.value = `✅ ${newEmployee.value.name} registered successfully!`
      alert(addSuccess.value)

      // Reset form and close modal
      newEmployee.value = { name: '', id: '', email: '', password: '', roleid: '' }
      showModal.value = false
    } else {
      addError.value = data.message || '❌ Registration failed.'
      alert(addError.value)
    }

  } catch (error) {
    console.error('Error:', error)
    addError.value = error.response?.data?.message || '❌ Network or server error.'
    alert(addError.value)
  }
}




//        notify integration


const notifyEveryone = async () => {
  try {
    const response = await fetch('https://6f23c0203bf8.ngrok-free.app/user/notifyusers', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token') ,
    'ngrok-skip-browser-warning': 'true'
      }
    });


    const result = await response;

    if (response.ok) {
      console.log('sent notification:', result)
      // alert('📢 Notification sent to all employees: Voting and lunch info updated!');
    } else {
      console.error('Failed to send notification:', result);
      // alert('❌ Failed to send notification.');
    }

  } catch (error) {
    console.error('Error sending notification:', error);
    // alert('❌ An error occurred while sending notification.');
  }
};


onMounted(async () => {
  console.log('Fetching employee list...')

  try {
    let data = await getalluser()

    employees.value = data.data || [];

    data = await getplatesneeded()

    platesneeded.value = data.data || 0;

    data  = await finalizeddishes(platesneeded.value)
    dishes.value = data.data || []
    if (data.data != []) {
      const totalRoti = await gettotalroti()
      const rotiDish = dishes.value.dishes.find(d => d.dish_name === 'roti');
      if (rotiDish) {
        rotiDish.quantity = totalRoti.data
      }
    }

    console.log('Dishes fetched:', dishes.value)

    data = await gettotalbudget()
    totalBudget.value = data.data || 0;

    data = await getbalancepool()
    balancepool.value = data.data[0].total || 0;

    data = await getnumparticipants()
    participantsCount.value = data.data || 0;

    data = await getallcontributions()
    homeitems.value = Array.isArray(data.data) ? data.data : []
    if(data.data != []) todaylunchcheck = true



    data = await getallroles()
    roles.value = data.data || []

    // Fetch all dishes for the Dish List section
    let dishData = await getalldishes();
    allDishes.value = dishData.data || [];

    // Fetch all restaurants for the Restaurant List section
    let restaurantData = await getallrestaurants();
    resturants.value = restaurantData.data || [];

    data = await getallpurchases()
    purchases.value = data.data

    console.log('plates needednnnnnn ' + homeitems.value[0].brought_food)

  } catch (error) {
    console.error('Error fetching employees:', error);
  }

});
// ✅ Voting Result Panel Setup
// const votingResults = ref({}) // This will hold vote counts from backend
// const finalDish = ref('')
// const tieDishes = computed(() => {
//   const values = Object.values(votingResults.value)
//   const max = Math.max(...values)
//   return Object.keys(votingResults.value).filter(d => votingResults.value[d] === max)
// })
// const isTie = computed(() => tieDishes.value.length > 1)




const allDishes = ref([
  { id: 1, name: 'Butter Chicken', votes: 15, price: 180, quantity: 3 },
  { id: 2, name: 'Biryani', votes: 12, price: 220, quantity: 2 },
  { id: 3, name: 'Dal Makhani', votes: 8, price: 150, quantity: 0 },
  { id: 4, name: 'Paneer Tikka', votes: 6, price: 170, quantity: 0 }
])



// Budget
const totalBudget = ref(1500) // Fixed total budget

// Computed properties
const totalSpent = computed(() => {
  const dishesTotal = dishes.value?.dishes?.reduce((sum, dish) => sum + (dish.price * dish.quantity), 0) ?? 0
  // const rotiTotal = rotiPrice.value * rotiQuantity.value
  // const yogurtTotal = selectedYogurt.value ? yogurtPrice.value : 0
  // const saladTotal = selectedSalad.value ? saladPrice.value : 0

  // return dishesTotal + rotiTotal + yogurtTotal + saladTotal
  return dishesTotal
})

// Method to check if an item can be increased within budget
const canIncreaseQuantity = (itemPrice) => {
  return (totalSpent.value + itemPrice) <= totalBudget.value
}

// Methods - All buttons working properly
const increaseDishQuantity = (dishId) => {
  const dish = dishes.value.dishes.find(d => d.id === dishId)
  if (dish && canIncreaseQuantity(dish.price)) {
    dish.quantity += 1
  }
}

const decreaseDishQuantity = (dishId) => {
  const dish = dishes.value.dishes.find(d => d.id === dishId)
  if (dish && dish.quantity > 0) {
    dish.quantity -= 1
  }
}

const increaseRoti = () => {
  if (canIncreaseQuantity(rotiPrice.value)) {
    rotiQuantity.value += 1
  }
}

const decreaseRoti = () => {
  if (rotiQuantity.value > 0) {
    rotiQuantity.value -= 1
  }
}

// Yogurt and salad selection methods
const toggleYogurt = () => {
  if (selectedYogurt.value) {
    selectedYogurt.value = false
  } else if (canIncreaseQuantity(yogurtPrice.value)) {
    selectedYogurt.value = true
  }
}

const toggleSalad = () => {
  if (selectedSalad.value) {
    selectedSalad.value = false
  } else if (canIncreaseQuantity(saladPrice.value)) {
    selectedSalad.value = true
  }
}

// const notifyLunchReady = () => {
//   lunchNotified.value = true
//   showMessage('🔔 Lunch ready notification sent!')
// }

const placeOrder = async() => {
  try {
    let selected_dishes = dishes.value.dishes
      .filter(dish => dish.quantity > 0)
      .map(dish => ({
        dish_id: dish.id,
        quantity: dish.quantity,
        price: dish.price
      }));

    // if (rotiQuantity.value > 0) {
    //   selected_dishes.push({
    //     dish_id: 1,
    //     quantity: rotiQuantity.value,
    //     price: rotiPrice.value
    //   });
    // }

    // if (selectedYogurt.value) {
    //   selected_dishes.push({
    //     dish_id: 2,
    //     quantity: 1,
    //     price: yogurtPrice.value
    //   });
    // }

    // if (selectedSalad.value) {
    //   selected_dishes.push({
    //     dish_id: 3,
    //     quantity: 1,
    //     price: saladPrice.value
    //   });
    // }

    await addpurchase(selected_dishes);

    showMessage('Order placed successfully!');
  } catch (error) {
    console.error('Error placing order:', error);
    showMessage('❌ Failed to place order.');
  }
};

const clearCurrentOrder = () => {
  dishes.value.dishes.forEach(dish => {
    dish.quantity = 0
  })
  rotiQuantity.value = 0
  selectedYogurt.value = false
  selectedSalad.value = false
}


const showMessage = (message) => {
  successMessage.value = message
  showSuccessMessage.value = true
  setTimeout(() => {
    showSuccessMessage.value = false
  }, 3000)
}



// Modal state
const isModalOpen = ref(false)


// Open the modal
const openModal = () => {
  isModalOpen.value = true
}

// Close the modal
const closeModal = () => {
  isModalOpen.value = false
}
const isResturantModalOpen = ref(false)

const newResturant = ref({
  name: ''
})

const openResturantModal = () => {
  isResturantModalOpen.value = true
}

const closeResturantModal = () => {
  isResturantModalOpen.value = false
}

const  addResturant = async () => {

  try {
    const token = sessionStorage.getItem('token');
    fetch(`${url}core/addrestaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        restaurant_name: newResturant.value.name
      }),
    });
    alert('Added: ' + newResturant.value.name)
    closeResturantModal()
  } catch (error) {
    console.log('error in adding restaurant ' + error )
    closeResturantModal()
  }
}

const addRestaurant = () => {
  console.log("New Restaurant:", newRestaurant.value)
  // Do your API POST here if needed
  closeresturantModal()
}

// Add Dish State and Handler
const newDish = ref({
  dish_name: '',
  estimated_serving: 1,
  price: 1,
  restaurant_id: 1
})

const addDish = async () => {
  try {
    await adddish(newDish.value)
    alert('Dish added successfully!')
    // Reset form
    newDish.value = { dish_name: '', estimated_serving: 1, price: 1, restaurant_id: 1 }
    closeModal()
  } catch (error) {
    alert('Failed to add dish.')
    console.error(error)
  }
}
</script>


<style scoped>

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 1px #2563eb;
}

</style>
