<template>
  <div class="">
    <!-- Main Dashboard jjjjjj     -->
    <div class="mx-auto max-w-6xl space-y-8">
      <!-- Header -->
      <!-- <header class="flex flex-col items-center text-center">
                <div class="mb-2 flex items-center justify-center rounded-full bg-gray-100 p-3">
                    <Utensils class="h-8 w-8 text-gray-700" />
                </div>
                <h1 class="text-3xl font-bold text-gray-800">Lunch Management</h1>
                <p class="text-gray-600">Collect contributions first, then vote for restaurants</p>

            </header> -->

      <!-- Current Phase Status -->
      <div class="mb-6 rounded-lg bg-blue-50 p-4 border border-blue-200">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-blue-800">Current Phase</h3>
            <p class="text-sm text-blue-600">
              <span v-if="isContributionWindowOpen">📝 Contribution Phase (11:00 AM - 12:00 PM)</span>
              <span v-else-if="isVotingWindowOpen">🗳️ Voting Phase (12:00 PM - 12:30 PM)</span>
              <span v-else-if="showVotingResults">🏆 Results Phase (After 12:30 PM)</span>
              <span v-else>⏰ Waiting for lunch window to open</span>
            </p>
          </div>
          <div class="text-right">
            <p class="text-sm text-blue-600">{{ currentTime.toLocaleTimeString() }}</p>
          </div>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-lg bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500">Your Wallet</h3>
            <Wallet class="h-5 w-5 text-gray-400" />
          </div>
          <p class="mt-1 text-2xl font-semibold text-gray-900">
            Rs. {{ currentWalletBalance }}
          </p>
          <p class="text-xs text-gray-500">Available balance</p>
        </div>

        <div class="rounded-lg bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500">Participants</h3>
            <Users class="h-5 w-5 text-gray-400" />
          </div>
          <p class="mt-1 text-2xl font-semibold text-gray-900">{{ participants }}</p>
        </div>

        <div class="rounded-lg bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500">Collected Budget</h3>
            <Wallet class="h-5 w-5 text-green-500" />
          </div>
          <p class="mt-1 text-2xl font-semibold text-green-600">
            Rs. {{ collectedBudget }}
          </p>
        </div>

        <div class="rounded-lg bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-medium text-gray-500">Plates Needed</h3>
            <ClipboardList class="h-5 w-5 text-orange-500" />
          </div>
          <p class="mt-1 text-2xl font-semibold text-orange-600">{{ platesNeeded }}</p>
        </div>

        <!-- <div class="rounded-lg bg-white p-5 shadow-sm">
                    <div class="flex items-center justify-between">
                        <h3 class="text-sm font-medium text-gray-500">Available Options</h3>
                        <CheckSquare class="h-5 w-5 text-purple-500" />
                    </div>
                    <p class="mt-1 text-2xl font-semibold text-purple-600">{{ restaurants.length }}</p>
                </div> -->
      </div>

      <!-- Main Content Area -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Left Column -->
        <div class="space-y-6 lg:col-span-1">
          <!-- Budget Progress Card -->
          <!-- <div class="rounded-lg bg-white p-6 shadow-sm">
                        <div class="mb-4 flex items-center gap-2">
                            <Target class="h-5 w-5 text-green-500" />
                            <h3 class="text-lg font-semibold text-gray-800">Budget Progress</h3>
                        </div>
                        <div class="text-sm text-gray-600">
                            Collected
                            <span class="float-right font-medium text-gray-800">Rs. {{ collectedBudget }} / Rs. {{
                                requiredBudget }}</span>
                        </div>
                        <div class="mt-2 h-2 w-full rounded-full bg-gray-200">
                            <div class="h-full rounded-full bg-green-500 transition-all duration-300 ease-in-out"
                                :style="{ width: budgetProgressPercentage + '%' }"></div>
                        </div>
                        <div v-if="budgetTargetReached" class="mt-3 flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle class="h-4 w-4" />
                            <span>Budget target reached!</span>
                        </div>
                        <div v-else class="mt-3 flex items-center gap-2 text-sm text-gray-500">
                            <span>Need Rs. {{ requiredBudget - collectedBudget }} minimum for 0 plates</span>
                        </div>
                    </div> -->



          <!-- Contribution Status -->
          <div v-if="hasAlreadyContributed" class="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md text-center">
            <svg
              class="w-16 h-16 text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2l4 -4m5 2a9 9 0 1 1 -18 0a9 9 0 0 1 18 0z"
              />
            </svg>
            <h2 class="text-2xl font-semibold text-gray-800">Thank You for Contributing!</h2>
            <p class="text-gray-600 mt-2">We're excited to have you as part of the lunch. Enjoy your meal! 🍽️</p>
          </div>

          <!-- Show contribution form if user hasn't contributed yet -->
          <div v-else class="rounded-lg bg-white p-6 shadow-sm">
            <div class="mb-4 flex items-center gap-2">
              <UtensilsCrossed class="h-5 w-5 text-orange-500" />
              <h3 class="text-lg font-semibold text-gray-800">Join Today's Lunch?</h3>
            </div>

            <!-- Contribution Window Status -->
            <div v-if="!isContributionWindowOpen" class="text-center text-gray-600 py-4">
              🍽️ Eat healthy, stay healthy!<br />
              <span class="text-xs">Contribution window is open from 11:00 AM to 12:00 PM</span>
            </div>

            <template v-if="isContributionWindowOpen">
              <!-- Step 1: Join Lunch? -->
              <div v-if="!joinLunchOption" class="space-y-3">
                <label class="flex items-center gap-3 text-gray-700">
                  <input
                    type="radio"
                    name="join-lunch"
                    value="yes"
                    v-model="tempJoinLunchOption"
                    class="sr-only"
                  />
                  <div
                    class="flex h-5 w-5 items-center justify-center rounded-full border-2"
                    :class="{
                      'border-blue-500 bg-blue-50': tempJoinLunchOption === 'yes',
                      'border-gray-300': tempJoinLunchOption !== 'yes',
                    }"
                  >
                    <CheckCircle
                      v-if="tempJoinLunchOption === 'yes'"
                      class="h-4 w-4 text-blue-500"
                    />
                    <Circle v-else class="h-4 w-4 text-gray-300" />
                  </div>
                  <span class="flex items-center gap-1">Yes, I'll join</span>
                </label>

                <label class="flex items-center gap-3 text-gray-700">
                  <input
                    type="radio"
                    name="join-lunch"
                    value="no"
                    v-model="tempJoinLunchOption"
                    class="sr-only"
                  />
                  <div
                    class="flex h-5 w-5 items-center justify-center rounded-full border-2"
                    :class="{
                      'border-red-500 bg-red-50': tempJoinLunchOption === 'no',
                      'border-gray-300': tempJoinLunchOption !== 'no',
                    }"
                  >
                    <XCircle
                      v-if="tempJoinLunchOption === 'no'"
                      class="h-4 w-4 text-red-500"
                    />
                    <Circle v-else class="h-4 w-4 text-gray-300" />
                  </div>
                  <span class="flex items-center gap-1">No, thanks</span>
                </label>

                <button
                  @click="handleJoinLunchDecision"
                  :disabled="!tempJoinLunchOption"
                  class="mt-4 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>

              <!-- Step 2 -->
              <div
                v-else-if="joinLunchOption === 'yes' && !broughtFoodFromHome"
                class="space-y-3"
              >
                <p class="mb-3 text-gray-700">Have you brought food from home?</p>

                <label class="flex items-center gap-3 text-gray-700">
                  <input
                    type="radio"
                    name="brought-food"
                    value="yes"
                    v-model="tempBroughtFoodFromHome"
                    class="sr-only"
                  />
                  <div
                    class="flex h-5 w-5 items-center justify-center rounded-full border-2"
                    :class="{
                      'border-blue-500 bg-blue-50': tempBroughtFoodFromHome === 'yes',
                      'border-gray-300': tempBroughtFoodFromHome !== 'yes',
                    }"
                  >
                    <CheckCircle
                      v-if="tempBroughtFoodFromHome === 'yes'"
                      class="h-4 w-4 text-blue-500"
                    />
                    <Circle v-else class="h-4 w-4 text-gray-300" />
                  </div>
                  <span>Yes (Pay Rs. 70)</span>
                </label>

                <label class="flex items-center gap-3 text-gray-700">
                  <input
                    type="radio"
                    name="brought-food"
                    value="no"
                    v-model="tempBroughtFoodFromHome"
                    class="sr-only"
                  />
                  <div
                    class="flex h-5 w-5 items-center justify-center rounded-full border-2"
                    :class="{
                      'border-blue-500 bg-blue-50': tempBroughtFoodFromHome === 'no',
                      'border-gray-300': tempBroughtFoodFromHome !== 'no',
                    }"
                  >
                    <CheckCircle
                      v-if="tempBroughtFoodFromHome === 'no'"
                      class="h-4 w-4 text-blue-500"
                    />
                    <Circle v-else class="h-4 w-4 text-gray-300" />
                  </div>
                  <span>No (Pay Rs. 150)</span>
                </label>

                <button
                  @click="
                    () => {
                      broughtFoodFromHome = tempBroughtFoodFromHome;
                      if (tempBroughtFoodFromHome === 'no') {
                        platesConfirmed = true;
                        finalizeLunchJoin();
                      }
                    }
                  "
                  class="mt-4 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>

              <!-- Step 3 -->
              <div
                v-else-if="
                  joinLunchOption === 'yes' &&
                  broughtFoodFromHome === 'yes' &&
                  !platesConfirmed
                "
                class="space-y-3"
              >
                <p class="mb-3 text-gray-700">How many plates?</p>
                <input
                  type="number"
                  v-model.number="tempNumPlates"
                  min="1"
                  class="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter number of plates"
                  required
                />

                <!-- ✅ New question -->
                <p class="mb-1 text-gray-700">What have you brought from home?</p>
                <input
                  type="text"
                  v-model="foodItem"
                  class="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="E.g. Chicken Biryani, Salad, etc."
                  required
                />

                <button
                  @click="
                    () => {
                      platesConfirmed = true;
                      if (broughtFoodFromHome === 'yes') finalizeLunchJoin();
                    }
                  "
                  :disabled="!tempNumPlates || tempNumPlates < 1 || !foodItem"
                  class="mt-4 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  Confirm
                </button>
              </div>

              <!-- Thank you -->
              <div
                v-else-if="joinLunchOption === 'yes' && platesConfirmed"
                class="text-center text-gray-700"
              >
                <p class="text-lg font-semibold text-green-600">
                  You've joined the lunch!
                </p>
                <p class="text-sm">Your wallet balance has been updated.</p>
              </div>
            </template>
          </div>

          <!-- Participants Joining Card -->
          <div class="rounded-lg bg-white p-6 shadow-md">
            <div class="mb-4 flex items-center gap-2">
              <Users class="h-5 w-5 text-gray-500" />
              <h3 class="text-lg font-semibold text-gray-800">Participants Joining</h3>
            </div>

            <ul v-if="joinedParticipants.length > 0" class="space-y-3 h-[300px] overflow-y-auto">
              <li
                v-for="(p, index) in joinedParticipants"
                :key="index"
                class="flex items-start justify-between border-b border-gray-100 pb-2"
              >
                <div>
                  <p class="text-base font-medium text-gray-800">{{ p.user.name }}</p>
                  <p class="text-sm text-gray-500">Dish: {{ p.dish || "No dish" }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-600">Rs. {{ p.amount_paid }}</p>
                  <p class="text-sm text-gray-500">
                    {{ p.plates }} plate{{ p.plates > 1 ? "s" : "" }}
                  </p>
                </div>
              </li>
            </ul>

            <p v-else class="text-sm text-gray-500">No participants have joined yet.</p>
          </div>
        </div>

        <!-- Right Column (Live Voting and Results) -->
        <div class="space-y-6 lg:col-span-2">

          <!-- Placeholder before 12:00 PM -->
          <div
            v-if="!isVotingWindowOpen && !showVotingResults"
            class="mt-10 flex flex-col items-center justify-center p-10 bg-blue-50 border border-blue-200 rounded-lg min-h-[300px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-2xl font-semibold text-blue-700 mb-2">Lunch Voting Not Open Yet!</h3>
            <p class="text-blue-600 text-center max-w-md">
              The voting for today's lunch will open at <span class="font-bold">12:00 PM</span>.<br>
              Please contribute to join the lunch before then.<br>
              Stay tuned and get ready to vote for your favorite dish!
            </p>
          </div
          >

          <!-- Success message if user has already voted -->
          <div
            v-if="voteid"
            class="mt-10 mb-4 p-6 max-w-md mx-auto bg-orange-100 border border-orange-300 rounded-xl text-orange-800 text-center shadow-md transition-all"
          >
            <span class="text-lg font-medium flex items-center justify-center gap-2">
              ✅ You have voted successfully!
            </span>

            <button  v-if="isVotingWindowOpen"
              @click="handleRemoveVote"
              class="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50"
            >
              🗑️ Remove Vote
            </button>
          </div>

          <!-- 🍽️ Voting Section -->
          <div
            v-if="joinLunchOption === 'yes' && isVotingWindowOpen && hasAlreadyContributed && !voteid"
            class="mt-10 text-black"
          >
            <h2 class="text-xl font-semibold mb-4">Vote for a Dish</h2>

            <div
              v-for="restaurant in restaurants"
              :key="restaurant.id"
              class="mb-6 p-4 rounded-lg border shadow"
            >
              <div
                class="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                @click="selectRestaurant(restaurant)"
              >
                <div>
                  <h3 class="text-lg font-bold">{{ restaurant.restaurant_name }}</h3>
                  <p class="text-sm text-gray-500">{{ restaurant.cuisine }}</p>
                </div>
                <span
                  class="text-sm text-blue-600"
                  v-if="selectedRestaurant && selectedRestaurant.id === restaurant.id"
                >
                </span>
              </div>

              <!-- SMOOTH TRANSITION HERE -->
              <transition name="fade-slide">
                <div
                  v-if="selectedRestaurant && selectedRestaurant.id === restaurant.id"
                  class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  <div
                    v-for="dish in restaurant.dishes"
                    :key="dish.id"
                    class="border p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
                    :class="{ 'bg-green-100': votedDishes.includes(dish) }"
                    @click="voteForDish(dish)"
                  >
                    <h4 class="font-bold">{{ dish.dish_name }}</h4>
                    <p class="text-sm">Price: Rs. {{ dish.price }}</p>
                    <p v-if="votedDishes.includes(dish)" class="text-xs text-green-600 mt-1">
                      ✓ Selected
                    </p>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Voting Status -->
            <div class="mb-4 text-sm text-gray-600">
              Selected {{ votedDishes.length }} of {{ maxVotesAllowed }} votes available
            </div>

            <!-- Roti input and Buttons at the bottom -->
            <div class="flex flex-col gap-2 mt-4">
              <div class="flex items-center gap-2 ">
                <label for="numRoti" class="text-sm font-medium">Number of Roti:</label>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    @click="numRoti = Math.max(0, numRoti - 1)"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Decrease number of roti"
                  >
                    -
                  </button>
                  <span class="w-10 text-center text-base font-semibold select-none">{{ numRoti }}</span>
                  <button
                    type="button"
                    @click="numRoti = numRoti + 1"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Increase number of roti"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="flex gap-4">
                <button
                  @click="submitVote"
                  :disabled="votedDishes.length === 0"
                  class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Submit Votes
                </button>
                <button
                  @click="resetVote"
                  :disabled="votedDishes.length === 0"
                  class="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Delete Vote
                </button>
              </div>
            </div>
          </div>

          <!-- Voting Phase Message for Non-Contributors -->
          <div
            v-if="isVotingWindowOpen && !hasAlreadyContributed"
            class="mt-10 text-center p-6 bg-yellow-50 border border-yellow-200 rounded-lg"
          >
            <h3 class="text-lg font-semibold text-yellow-800 mb-2">Voting Phase Active</h3>
            <p class="text-yellow-700">
              The voting phase is currently open (12:00 PM - 12:30 PM).
              Since you haven't contributed to today's lunch, you cannot participate in voting.
            </p>
          </div>

          <!-- Results Phase Message for Non-Contributors -->
          <div
            v-if="showVotingResults && !hasAlreadyContributed"
            class="mt-10 text-center p-6 bg-gray-50 border border-gray-200 rounded-lg"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Voting Results Available</h3>
            <p class="text-gray-700">
              The voting results are now available. Since you didn't participate in today's lunch,
              you can view the results below.
            </p>
          </div>

          <!-- Voting Results Section -->
          <div
            v-if="showVotingResults"
            class="mx-auto mt-10 max-w-3xl"
          >
            <div class="rounded-lg bg-white shadow-lg p-6">
              <h2
                class="text-2xl font-bold text-center text-blue-700 mb-6 flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17v-2a4 4 0 014-4h3m4 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Voting Results
              </h2>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        #
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Dish
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Restaurant
                      </th>
                      <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Votes
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100 text-green-700">
                    <tr
                      v-for="(result, idx) in votingResults"
                      :key="result.id"
                      :class="{ 'bg-green-50': idx === 0 }"
                    >
                      <td class="px-4 py-2 font-semibold">{{ idx + 1 }}</td>
                      <td class="px-4 py-2">{{ result.dish_name }}</td>
                      <td class="px-4 py-2">{{ result.restaurant_name }}</td>
                      <td class="px-4 py-2 text-center font-bold text-green-700">
                        {{ result.vote_count }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="votingResults.length > 0" class="mt-4 text-center">
                <span
                  class="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold"
                >
                  🏆 Top Dish:
                  <span class="font-bold">{{ votingResults[0].dish_name }}</span> from
                  <span class="font-bold">{{ votingResults[0].restaurant_name }}</span>
                  ({{ votingResults[0].vote_count }} votes)
                </span>
              </div>
              <div v-else class="mt-4 text-center">
                <span class="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold">
                  📊 No voting results available yet
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { getallcontributions, votingresults, addcontribution, getdishesbyrestaurant, addvote, getvotebyuserid , deletevote } from "../repositories/Apis";

import { Wallet, User, Users, ClipboardList, Utensils, UtensilsCrossed, CheckCircle, Circle, XCircle, Target } from "lucide-vue-next";

export default defineComponent({
  name: "DashboardView",
  components: {
    Wallet,
    User,
    Users,
    ClipboardList,
    Utensils,
    UtensilsCrossed,
    CheckCircle,
    Circle,
    XCircle,
    Target,
  },

  data() {
    return {
      currentWalletBalance: 0,
      collectedBudget: 0,
      platesNeeded: 0,
      requiredBudget: 0,
      participants: 0,
      votingResults: [] as Array<object>,

      currentTime: new Date(),
      timerInterval: null as ReturnType<typeof setInterval> | null,

      foodItem: "",

      showThankYouModal: false,
      joinLunchOption: localStorage.getItem('joinLunchOption') as string | null,
      tempJoinLunchOption: null as string | null,
      broughtFoodFromHome: null as string | null,
      tempBroughtFoodFromHome: null as string | null,
      tempNumPlates: 1,
      platesConfirmed: false,

      joinedParticipants: [],

      username: sessionStorage.getItem("username") || "User",

      // Cached value for hasAlreadyContributed from localStorage
      cachedHasAlreadyContributed: localStorage.getItem('hasAlreadyContributed') === 'true',

      restaurants: Array<object>,

      selectedRestaurant: null as any,
      votedDishes: [] as any[],
      maxVotesAllowed: 2, // Maximum number of votes a user can cast
      isDropdownOpen: false,
      isModalOpen: false,
      numRoti: 0, // Number of roti for voting
      contributionid: null as number | null, // Store contribution id for voting
      voteid: null as number | null, // Store vote id for user

      url: (import.meta as any).env.VITE_URL,
      id: sessionStorage.getItem("id"),
      token: sessionStorage.getItem("token"),
      roleid: sessionStorage.getItem("role"),
      user_data: [] as any,

      router: useRouter(),
    };
  },

  computed: {
    // Contribution window: 11:00 AM to 12:00 PM
    isContributionWindowOpen(): boolean {
      const now = this.currentTime;
      const hour = now.getHours();
      const minutes = now.getMinutes();

      // Check if time is after or exactly 11:00 AM
      const afterStart = hour > 11 || (hour === 11 && minutes >= 0);

      // Check if time is before or exactly 12:00 PM
      const beforeEnd = hour < 12 || (hour === 12 && minutes <= 0);

      return afterStart && beforeEnd;
    },

    // Voting window: 12:00 PM to 12:30 PM
    isVotingWindowOpen(): boolean {
      const now = this.currentTime; // should be a Date object
      const hour = now.getHours();
      const minutes = now.getMinutes();

      // Convert time to total minutes since midnight
      const totalMinutes = hour * 60 + minutes;

      // Define voting window in minutes (12:00 PM to 12:30 PM)
      const startMinutes = 12 * 60;      // 720
      const endMinutes = 12 * 60 + 30;   // 750

      return totalMinutes >= startMinutes && totalMinutes <= endMinutes;
    },


    // Legacy lunch window (keeping for backward compatibility)
    isLunchWindowOpen(): boolean {
      return this.isContributionWindowOpen || this.isVotingWindowOpen;
    },

    budgetTargetReached(): boolean {
      return this.collectedBudget >= this.requiredBudget;
    },

    votingStarted(): boolean {
      return this.budgetTargetReached && this.isVotingWindowOpen;
    },

    showVotingResults(): boolean {
      const now = this.currentTime;
      const hour = now.getHours();
      const minutes = now.getMinutes();

      // Show results after 12:30 PM
      return hour > 12 || (hour === 12 && minutes >= 30);
    },

    hasAlreadyContributed(): boolean {
      const hasContributed = this.checkIfIdExistsInParticipants();
      // Update cached value and save to localStorage whenever this value changes
      this.cachedHasAlreadyContributed = hasContributed;
      localStorage.setItem('hasAlreadyContributed', hasContributed.toString());
      if (hasContributed){
        this.joinLunchOption = 'yes'
      }
      return hasContributed;
    },

    // ,,

    // New computed property to determine if user can contribute
    canContribute(): boolean {
      return this.isContributionWindowOpen && !this.hasAlreadyContributed;
    },

    // New computed property to determine if user can vote
    canVote(): boolean {
      return this.isVotingWindowOpen && this.hasAlreadyContributed;
    },
  },

  methods: {
    updateTime() {
      this.currentTime = new Date();
    },

    async handleRemoveVote() {
      if (!this.voteid) return;
      console.log('vote id = ' + this.id)
      try {
        await deletevote(this.id);
        this.voteid = null;
        alert('Your vote has been removed. You can vote again.');
      } catch (e) {
        console.log(e)
        alert('Failed to remove vote. Please try again. ');
      }
    },

    async submitVote() {
      if (this.votedDishes.length > 0) {
        if (!this.numRoti || this.numRoti < 0) {
          alert('Please enter a valid number of roti.');
          return;
        }
        // Collect dish ids as comma-separated string
        const dishIds = this.votedDishes.map(dish => dish.id).join(',');
        // Prepare vote object
        const voteObj = {
          user_id: Number(this.id),
          dish_id: dishIds,
          roti: this.numRoti,
          contribution_id: this.contributionid
        };
        try {
          await addvote(voteObj);
          alert('Your vote has been submitted!');
          // Set voteid to a non-null value to show the success message and hide voting
          this.voteid = Date.now(); // Use timestamp as a dummy value
        } catch (e) {
          alert('Failed to submit vote. Please try again.');
        }
        // Disable all future interactions
        this.isDropdownOpen = false;
        this.selectedRestaurant = null; // collapse open restaurant
        this.votedDishes = []; // Reset votes after submission
        this.numRoti = 0;
      }
    },

    resetVote() {
      this.votedDishes = [];
      // Close restaurant so they can re-select cleanly
      this.selectedRestaurant = null;
    },

    handleJoinLunchDecision() {
      this.joinLunchOption = this.tempJoinLunchOption;
      // Save to localStorage
      if (this.joinLunchOption) {
        localStorage.setItem('joinLunchOption', this.joinLunchOption);
      }
      if (this.joinLunchOption === "no") {
        // Set hasAlreadyContributed to false for "no" choice
        this.cachedHasAlreadyContributed = false;
        localStorage.setItem('hasAlreadyContributed', 'false');
        this.showThankYouModal = true;
        // Clear localStorage since user has made their decision
        this.clearLunchLocalStorage();
      }
    },

    handleFoodFromHomeDecision() {
      this.broughtFoodFromHome = this.tempBroughtFoodFromHome;
      let paymentAmount = 0;

      if (this.broughtFoodFromHome === "yes") {
        paymentAmount = 70;
      } else if (this.broughtFoodFromHome === "no") {
        paymentAmount = 150;
      }

      if (this.currentWalletBalance >= paymentAmount) {
        this.currentWalletBalance -= paymentAmount;
        this.collectedBudget += paymentAmount;

        if (this.broughtFoodFromHome === "no") {
          this.platesNeeded += 1;
          this.finalizeLunchJoin();
        }
      } else {
        alert("Insufficient balance. Please top up your wallet.");
      }
    },

    async finalizeLunchJoin() {
      // Prepare contribution payload
      const payload = {
        user_id: Number(this.id),
        amount_paid: this.broughtFoodFromHome === "yes" ? 70 : 150,
        brought_food: this.broughtFoodFromHome === "yes",
        dish: this.broughtFoodFromHome === "yes" ? this.foodItem : "",
        plates: this.broughtFoodFromHome === "yes" ? this.tempNumPlates : 0,
      };
      try {
        await addcontribution(payload);

        // Set the variables after successful contribution
        this.joinLunchOption = 'yes';
        this.cachedHasAlreadyContributed = true;

        // Save to localStorage
        localStorage.setItem('joinLunchOption', 'yes');
        localStorage.setItem('hasAlreadyContributed', 'true');

        // Refresh participants list to update hasAlreadyContributed computed property
        const contribData = await getallcontributions();
        this.joinedParticipants = contribData.data;
        this.participants += 1

      } catch (e) {
        alert("Failed to submit contribution. Please try again. " + e);
      }

      // Reset options
      this.tempJoinLunchOption = null;
      this.tempBroughtFoodFromHome = null;
      this.tempNumPlates = 1;
      this.platesConfirmed = false;

      // Close the modal if open
      this.closeModal();
    },

    selectRestaurant(restaurant: any) {
      if (this.selectedRestaurant && this.selectedRestaurant.id === restaurant.id) {
        // If the restaurant is already selected, unselect it
        this.selectedRestaurant = null;
      } else {
        // Select the new restaurant
        this.selectedRestaurant = restaurant;
      }
    },

    voteForDish(dish: any) {
      // Check if we already voted for this dish
      const dishIndex = this.votedDishes.indexOf(dish);

      // If dish is already voted for, remove the vote
      if (dishIndex !== -1) {
        this.votedDishes.splice(dishIndex, 1);
        return;
      }

      // Check if we've reached the maximum votes
      if (this.votedDishes.length >= this.maxVotesAllowed) {
        alert(`You can only vote for up to ${this.maxVotesAllowed} dishes`);
        return;
      }

      // Check if the new dish is from the same restaurant as other voted dishes
      if (this.votedDishes.length > 0) {
        const firstVotedDish = this.votedDishes[0];
        const firstRestaurant = this.restaurants.find(r =>
          r.dishes.some(d => d === firstVotedDish)
        );
        const newDishRestaurant = this.restaurants.find(r =>
          r.dishes.some(d => d === dish)
        );

        if (firstRestaurant !== newDishRestaurant) {
          alert('All votes must be for dishes from the same restaurant');
          return;
        }
      }

      // Add the vote
      this.votedDishes.push(dish);
    },

    closeModal() {
      this.isModalOpen = false;
      this.selectedRestaurant = null;
      this.votedDishes = [];
    },

    closeThankYouModal() {
      this.showThankYouModal = false;
    },

    openModal() {
      this.isModalOpen = true;
    },

    async addDish() {
      // Logic to add a new dish (e.g., to the backend)
      alert("Dish added! (Placeholder)");
      this.closeModal();
    },


    checkIfIdExistsInParticipants() {
    const storedId = sessionStorage.getItem('id')
    if (!storedId) {
      this.contributionid = null;
      return false;
    }
    const participant = this.joinedParticipants.find(p => p.user_id == storedId);
    if (participant) {
      this.contributionid = participant.id;
      return true;
    } else {
      this.contributionid = null;
      return false;
    }
  },

    // Method to clear localStorage for lunch options
    clearLunchLocalStorage() {
      localStorage.removeItem('joinLunchOption');
      localStorage.removeItem('hasAlreadyContributed');
    },

  },

  async mounted() {
    // Check if it's a new day and clear localStorage if needed
    const today = new Date().toDateString();
    const lastVisitDate = localStorage.getItem('lastVisitDate');

    if (lastVisitDate !== today) {
      // It's a new day, clear lunch-related localStorage
      this.clearLunchLocalStorage();
      localStorage.setItem('lastVisitDate', today);
    }

    this.updateTime();
    this.timerInterval = setInterval(this.updateTime, 1000);

    if (!this.token) {
      this.router.push("/login");
    }

    fetch(`${this.url}user/getuser/${this.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.user_data = data;
        this.currentWalletBalance = data.data.account_balance;
      });

    fetch(`${this.url}core/getnumparticipants`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.participants = data?.data ?? 0;
      });

    fetch(`${this.url}core/gettotalbudget`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.collectedBudget = data?.data ?? 0;
      });

    fetch(`${this.url}core/getplatesneeded`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.platesNeeded = data?.data ?? 0;
        this.maxVotesAllowed = this.platesNeeded
      });

    let data = await getallcontributions();
    this.joinedParticipants = data.data;

    data = await getdishesbyrestaurant()
    this.restaurants = data.data





    // Fetch vote id for this user
    try {
      const voteRes = await getvotebyuserid(this.id);
      if (voteRes && voteRes.vote_id) {
        this.voteid = voteRes.vote_id;
      } else {
        this.voteid = null;
      }
    } catch (error) {
      this.voteid = null;
      console.log('error while fetching votes ' + error)
    }

    // Fetch voting results using the imported function
    try {
      const results = await votingresults();
      if (results && results.data) {
        this.votingResults = results.data;
      }
    } catch (error) {
      console.error("Error fetching voting results:", error);
    }
  },

  beforeUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  },
});
</script>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 1000px;
}
</style>

