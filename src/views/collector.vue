<template>
  <div class="min-h-screen bg-gray-50">
    <div
      v-if="!user && userLoading"
      class="min-h-screen bg-gray-50 flex items-center justify-center"
    >
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4 mx-auto"
        ></div>
        <p class="text-gray-600">Loading...</p>
      </div>
    </div>

    <div v-else>
      <main class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="mx-auto lg:max-w-6xl bg-gray-50 rounded-xl">
          <!-- Header -->
          <div class="bg-orange-500 px-6 py-4 lg:px-12 lg:py-8 ">
            <div
              class="flex flex-col sm:flex-row sm:justify-between sm:items-center h-auto sm:h-16 py-4 sm:py-0 gap-4 sm:gap-0"
            >
              <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h1 class="text-xl sm:text-2xl font-bold text-gray-900">
                  Lunch Management
                </h1>
              </div>

              <!-- Logout + Voice buttons -->
              <div class="flex items-center space-x-2">
                <!-- Voice button -->
                <button
                  @click="speakOrder"
                  :disabled="isSpeaking"
                  class="bg-orange-100 text-orange-800 border border-orange-300 hover:bg-orange-200 transition-colors duration-200 px-3 py-2 rounded-lg font-medium text-sm flex items-center"
                  title="Read order aloud"
                >
                  <span class="mr-2">🔊</span>
                  Voice
                </button>

                <!-- Pause/Resume (shows only while speaking) -->
                <button
                  v-if="isSpeaking"
                  @click="togglePauseResume"
                  class="bg-white text-orange-800 border border-orange-300 hover:bg-gray-50 transition-colors duration-200 px-3 py-2 rounded-lg font-medium text-sm flex items-center"
                >
                  <span v-if="!isPaused" class="mr-2">⏸️</span>
                  <span v-else class="mr-2">▶️</span>
                  <span>{{ isPaused ? 'Resume' : 'Pause' }}</span>
                </button>

                <!-- Stop (shows only while speaking) -->
                <button
                  v-if="isSpeaking"
                  @click="stopSpeaking"
                  class="bg-white text-red-600 border border-red-200 hover:bg-red-50 transition-colors duration-200 px-3 py-2 rounded-lg font-medium text-sm flex items-center"
                >
                  <span class="mr-2">⏹️</span>
                  Stop
                </button>

                <!-- Logout -->
                <button
                  @click="handleLogout"
                  class="bg-orange-100 text-orange-800 border border-orange-300 hover:bg-orange-200 transition-colors duration-300 px-3 py-2 rounded-lg font-medium text-sm flex items-center"
                >
                  <span class="mr-2">🚪</span>
                  Logout
                </button>
              </div>
            </div>
          </div>

          <!-- Stats / Content (unchanged) -->
          <div class="flex justify-center">
            <div class="w-full max-w-7xl px-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-8">
                <div class="bg-blue-50 border-blue-200 border-2 rounded-xl shadow-sm w-full">
                  <div class="p-6">
                    <p class="text-sm font-medium text-gray-600 mb-1">Your Wallet</p>
                    <p class="text-3xl font-bold text-gray-900">
                      Rs {{ stats?.collectorWallet || 0 }}
                    </p>
                  </div>
                </div>

                <div class="bg-emerald-50 border-emerald-200 border-2 rounded-xl shadow-sm w-full">
                  <div class="p-6">
                    <p class="text-sm font-medium text-gray-600 mb-1">Participants</p>
                    <p class="text-3xl font-bold text-gray-900">
                      {{ stats?.totalParticipants || 0 }}
                    </p>
                  </div>
                </div>

                <div class="bg-amber-50 border-amber-200 border-2 rounded-xl shadow-sm w-full">
                  <div class="p-6">
                    <p class="text-sm font-medium text-gray-600 mb-1">Budget</p>
                    <p class="text-3xl font-bold text-gray-900">
                      Rs {{ stats?.collectedBudget || 0 }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Loading / "Order hasn't been placed" messages -->
          <div v-if="!dataLoaded" class="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4 mx-auto"></div>
            <p class="text-lg text-gray-600 mb-2">Loading...</p>
          </div>

          <div v-else-if="!canViewDishes() || (canViewDishes() && (!purchases || purchases.length === 0))"
               class="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-lg text-gray-600 mb-2">Order Hasnt Been Placed Yet</p>
          </div>

          <div v-else>
            <!-- Desktop Layout -->
            <div class="hidden lg:block p-12">
              <div class="grid grid-cols-3 gap-8">
                <!-- Lunch from Home Section -->
                <div class="bg-blue-100 rounded-xl p-6 border border-blue-400">
                  <h3 class="text-lg font-semibold text-gray-800 mb-3">🏠 Lunch from Home</h3>
                  <div class="space-y-2">
                    <template v-if="homeitems && homeitems.length > 0">
                      <div
                        v-for="(item, index) in homeitems.filter((i) => i.brought_food)"
                        :key="index"
                        class="flex items-center p-2 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span class="text-gray-700 text-sm">
                          {{ item.dish || "No dish specified" }} ({{ item.plates }} Plates)
                        </span>
                      </div>
                      <div v-if="!homeitems.some((i) => i.brought_food)" class="text-gray-500 text-sm italic p-2">
                        No lunch from home today
                      </div>
                    </template>
                    <div v-else class="text-gray-500 text-sm italic p-2">No data available</div>
                  </div>
                </div>

                <!-- Lunch to Buy Section -->
                <div class="bg-green-100 rounded-xl p-6 border border-green-400">
                  <h3 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <span class="text-3xl mr-3">🍽️</span>
                    Lunch to Buy
                  </h3>

                  <div class="space-y-4">
                    <div
                      v-for="(item, index) in purchases"
                      :key="index"
                      class="bg-white p-4 rounded-lg shadow-sm border border-green-300"
                    >
                      <div class="flex justify-between items-center">
                        <div>
                          <p class="text-lg font-medium text-gray-800">{{ item.dish_name }}</p>
                          <p class="text-gray-600">{{ item.restaurant_name }}</p>
                          <p class="text-sm text-gray-500 mt-1">Plates: {{ item.quantity }}</p>
                        </div>
                        <span class="text-green-600 font-semibold text-base">Rs.{{ item.price }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Budget Summary Section -->
                <div class="bg-yellow-50 rounded-xl p-6 border border-yellow-400">
                  <h3 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <span class="text-3xl mr-3">💰</span>
                    Budget Summary
                  </h3>

                  <div class="space-y-4">
                    <div class="bg-white p-4 rounded-lg border border-purple-300">
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-gray-600 text-lg">Lunch Expense:</span>
                        <span class="font-bold text-red-600 text-xl">Rs {{ totalbill }}</span>
                      </div>
                      <div class="border-t pt-3 mt-3">
                        <div class="flex justify-between items-center">
                          <span class="text-gray-700 font-medium text-lg">Remaining:</span>
                          <span class="font-bold text-2xl text-green-600">Rs {{ remaining }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="bg-white p-4 rounded-lg border border-purple-300">
                      <div class="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Budget Used</span>
                        <span>Rs {{ totalbill }}</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-4">
                        <div class="bg-green-500 h-4 rounded-full" style="width: 46%"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Layout -->
            <div class="lg:hidden p-4 space-y-6 bg-gray-50">
              <!-- Lunch to Buy -->
              <div class="bg-white rounded-xl border border-green-200 p-4 shadow-sm">
                <h3 class="text-base font-semibold text-green-800 mb-3 tracking-wide uppercase">
                  🍽️ Lunch to Buy
                </h3>

                <div class="space-y-2 max-h-[220px] overflow-y-auto pr-1 custom-scroll">
                  <template v-if="purchases && purchases.length > 0">
                    <div
                      v-for="(item, index) in purchases"
                      :key="index"
                      class="flex justify-between items-center gap-4 px-3 py-2 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-300"
                    >
                      <div class="truncate">
                        <p class="text-sm font-medium text-gray-800 truncate">{{ item.dish_name }}</p>
                        <p class="text-xs text-gray-600">Plates: {{ item.quantity }}</p>
                      </div>
                      <span class="text-green-700 font-semibold text-sm whitespace-nowrap">
                        Rs {{ item.price.toFixed(2) }}
                      </span>
                    </div>
                  </template>
                  <div v-else class="text-gray-500 text-sm italic px-2">No purchases available</div>
                </div>
              </div>

              <!-- Lunch from Home -->
              <div class="bg-white rounded-xl border border-blue-200 p-4 shadow-sm">
                <h3 class="text-base font-semibold text-blue-800 mb-3 tracking-wide uppercase">🏠 Lunch from Home</h3>

                <div class="max-h-[220px] overflow-y-auto space-y-2 pr-1 custom-scroll">
                  <template v-if="homeitems && homeitems.length > 0">
                    <template v-if="homeitems.some((i) => i.brought_food)">
                      <div
                        v-for="(item, index) in homeitems.filter((i) => i.brought_food)"
                        :key="index"
                        class="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-300"
                      >
                        <div class="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                        <span class="text-sm text-gray-800 font-medium truncate">
                          {{ item.dish || "No dish specified" }}
                          <span class="text-xs text-gray-600">({{ item.plates }} Plates)</span>
                        </span>
                      </div>
                    </template>
                    <div v-else class="text-gray-500 text-sm italic px-2">No lunch from home today</div>
                  </template>
                  <div v-else class="text-gray-400 text-sm italic px-2">No data available</div>
                </div>
              </div>

              <!-- Budget Summary -->
              <div class="bg-white rounded-xl border border-purple-300 p-4 shadow-sm">
                <h3 class="text-base font-semibold text-purple-800 mb-4 tracking-wide uppercase flex items-center">💰 Budget Summary</h3>

                <div class="space-y-4">
                  <div class="bg-purple-50 p-3 rounded-lg border border-purple-300">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm text-gray-600">Lunch Expense</span>
                      <span class="font-semibold text-red-600 text-sm">Rs {{ totalbill }}</span>
                    </div>
                    <div class="border-t pt-2 mt-2">
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-700 font-medium">Remaining</span>
                        <span class="font-bold text-green-600 text-sm">Rs {{ remaining }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="bg-purple-50 p-3 rounded-lg border border-purple-300">
                    <div class="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Budget Used</span>
                      <span>Rs {{ totalbill }}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                      <div class="bg-green-500 h-3 rounded-full" style="width: 46%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              :disabled="clicked"
              @click="handleClick"
              class="w-full px-6 py-3 rounded-lg transition-all duration-300 font-semibold shadow-md text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ clicked ? "Purchase Has Been Made" : "🍊 Order Purchased" }}
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import {
  getallcontributions,
  getallpurchases,
  gettotalbill,
  purchasecheck,
  transfertopool,
} from "../repositories/Apis";

export default {
  name: "CollectorDashboard",
  data() {
    return {
      remaining: 0,
      clicked: false,
      totalbill: 0,
      url: import.meta.env.VITE_URL,
      token: sessionStorage.getItem("token"),
      id: sessionStorage.getItem("id"),
      stats: {
        collectorWallet: 2500,
        totalParticipants: 14,
        collectedBudget: 7601,
        depositLeft: 900,
      },
      user: {
        role: "collector",
        name: "Collector User",
      },
      voteResults: [],
      employees: [],
      isVoteTime: false,
      userLoading: false,
      purchases: [],
      homeitems: [],
      dataLoaded: false,

      // --- Voice/TTS state
      voices: [],
      utterance: null,
      isPaused: false,
      isSpeaking: false,
    };
  },
  computed: {
    isCollector() {
      return this.user?.role === "collector";
    },
    winner() {
      return this.voteResults.find((item) => item.isWinner);
    },
    totalVotes() {
      return this.voteResults.reduce((sum, item) => sum + item.votes, 0);
    },
    voteStatusClasses() {
      return `px-2 py-1 rounded-full text-xs ${
        this.isVoteTime ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
      }`;
    },
  },
  async mounted() {
    // existing logic (purchase check + fetches)
    const storedClick = localStorage.getItem("buttonClicked");
    if (storedClick === true) {
      this.clicked = true;
    } else {
      const data = await purchasecheck();
      this.clicked = data.data;
      if (this.clicked == true) localStorage.setItem("buttonClicked", true);
    }

    // fetch user/account stats
    let response = await fetch(`${this.url}user/getuser/${this.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    let temp = await response.json();
    this.stats.collectorWallet = temp.data.account_balance;

    response = await fetch(`${this.url}core/getnumparticipants`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    temp = await response.json();
    this.stats.totalParticipants = temp.data;

    response = await fetch(`${this.url}core/gettotalbudget`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    temp = await response.json();
    this.stats.collectedBudget = temp.data;

    response = await getallpurchases();
    this.purchases = response.data || [];

    response = await getallcontributions();
    this.homeitems = Array.isArray(response.data) ? response.data : [];

    response = await gettotalbill();
    this.totalbill = response.data || 0;

    this.remaining = this.stats.collectorWallet - this.totalbill;
    if (this.remaining < 0) this.remaining = 0;
    this.dataLoaded = true;

    // --- Initialize TTS voices
    if ("speechSynthesis" in window) {
      this.voices = window.speechSynthesis.getVoices() || [];
      // update voices when they become available
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices() || [];
      };
    }
  },
  beforeUnmount() {
    // stop any speaking and remove handlers
    try {
      if (window && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
      }
    } catch (e) {
      // ignore
    }
  },
  methods: {
    canViewDishes() {
      const now = new Date();
      const availableTime = new Date(now);
      availableTime.setHours(12, 30, 0, 0); // 12:30 PM
      return now >= availableTime;
    },
    async handleClick() {
      if (!this.clicked) {
        this.clicked = true;
        localStorage.setItem("buttonClicked", true);
      }
      await transfertopool(this.id);
      this.stats.collectedBudget += this.stats.collectorWallet - this.totalbill;
      this.stats.collectorWallet = 0;
    },
    checkVoteTime() {
      const now = new Date();
      this.isVoteTime =
        (now.getHours() === 12 && now.getMinutes() >= 30) || now.getHours() > 12;
    },
    handleLogout() {
      sessionStorage.clear();
      localStorage.clear();
      this.$router.push("/login");
    },

    // ---------------- Voice / TTS methods ----------------
    // Build a readable summary of the order
    buildOrderText() {
      let parts = [];
      parts.push("raju janu Aaj ka lunch order ye hai."); // "Today's lunch order is"

      // Purchases (to buy)
      if (this.purchases && this.purchases.length > 0) {
        parts.push(`Khareedne walay items ${this.purchases.length} hain.`); // there are X purchased items
        this.purchases.forEach((item, i) => {
          const dish = item.dish_name || "dish";
          const rest = item.restaurant_name || "";
          const qty = item.quantity != null ? item.quantity : "";
          const price = item.price != null ? item.price : "";
          parts.push(
            `${i + 1}. ${dish} . Plates ${qty}. Qeemat ${price} rupay.`
          );
        });
      }

      // Home items
      if (this.homeitems && this.homeitems.length > 0) {
        parts.push(`Ghar se lane walay items ${this.homeitems.length} hain.`);
        this.homeitems.forEach((item, i) => {
          const dish = item.dish || "dish";
          const plates = item.plates != null ? item.plates : "";
          parts.push(`${i + 1}. ${dish}. Plates ${plates}.`);
        });
      }

      // Totals
      parts.push(`Total paaisa Rs ${this.totalbill}.`);
      // parts.push(`Collector wallet remaining Rs ${this.remaining}.`);

      return parts.join(" ");
    },

    // Convert numbers (digits) to Hindi words (your function adapted)
    convertNumbersToHindiWords(text) {
      const upto99 = {
        0: "shoonya", 1: "ek", 2: "do", 3: "teen", 4: "chaar", 5: "paanch",
        6: "chhe", 7: "saat", 8: "aath", 9: "nau", 10: "dus", 11: "gyaarah",
        12: "baarah", 13: "terah", 14: "chaudah", 15: "pandrah", 16: "solah",
        17: "satrah", 18: "atharah", 19: "unnis", 20: "bees", 21: "ikkees",
        22: "baees", 23: "teyis", 24: "chaubees", 25: "pachchees", 26: "chhabbees",
        27: "sattaees", 28: "atthaees", 29: "untees", 30: "tees", 31: "ikattees",
        32: "battis", 33: "taintees", 34: "chauntees", 35: "paintis", 36: "chhattis",
        37: "saintees", 38: "adhatees", 39: "untalees", 40: "chaalees", 41: "iktaalees",
        42: "bayalees", 43: "tetaalees", 44: "chauvvaalees", 45: "pentaalees",
        46: "chhiyaalees", 47: "sentaalees", 48: "adhchaalees", 49: "unchaas", 50: "pachaas",
        51: "ikyaavan", 52: "bawan", 53: "tirpan", 54: "chauvan", 55: "pachpan", 56: "chhappan",
        57: "sattavan", 58: "aththavan", 59: "unsath", 60: "saath", 61: "iksaath", 62: "basaath",
        63: "tresaath", 64: "chausath", 65: "painsath", 66: "chhiyaasath", 67: "sadsath",
        68: "adhsath", 69: "unsattar", 70: "sattar", 71: "ikahattar", 72: "bahattar", 73: "tihattar",
        74: "chauhattar", 75: "pichattar", 76: "chhihattar", 77: "sattattar", 78: "athhattar",
        79: "unasi", 80: "assi", 81: "ikyaasi", 82: "bayaasi", 83: "tiraasi", 84: "chauraasi",
        85: "pachaasi", 86: "chhiyaasi", 87: "sattasi", 88: "athasi", 89: "navasi",
        90: "nabbe", 91: "ikyanabe", 92: "baanabe", 93: "tiranabe", 94: "chauranabe",
        95: "pachaanabe", 96: "chhiyaanabe", 97: "sattaanabe", 98: "athaanabe", 99: "ninyaanabe"
      };
      function convert(num) {
        if (num <= 99) return upto99[num] || num.toString();
        if (num < 1000) {
          let hundreds = Math.floor(num / 100);
          let remainder = num % 100;
          return `${upto99[hundreds] || hundreds} sau${remainder > 0 ? " " + convert(remainder) : ""}`;
        }
        if (num <= 9999) {
          let thousands = Math.floor(num / 1000);
          let remainder = num % 1000;
          return `${upto99[thousands] || thousands} hazaar${remainder > 0 ? " " + convert(remainder) : ""}`;
        }
        if (num === 10000) return "das hazaar";
        return num.toString(); // fallback
      }
      return text.replace(/\b\d{1,5}\b/g, (match) => {
        const n = parseInt(match);
        return n <= 10000 ? convert(n) : match;
      });
    },

    // Speak the built order summary using SpeechSynthesis (hi-IN)
    speakOrder() {
      if (!("speechSynthesis" in window)) {
        alert("Your browser does not support speech synthesis.");
        return;
      }

      const rawText = this.buildOrderText();
      const processedText = this.convertNumbersToHindiWords(rawText);

      // stop any current speech
      window.speechSynthesis.cancel();

      this.utterance = new SpeechSynthesisUtterance(processedText);
      this.utterance.lang = "hi-IN";
      this.utterance.rate = 0.7;
      this.utterance.pitch = 0.9;

      // try to pick hi-IN voice if available
      const hindiVoice = this.voices.find(
        (v) => (v.lang && v.lang.toLowerCase().startsWith("hi")) || (v.name && v.name.toLowerCase().includes("hindi"))
      );
      if (hindiVoice) {
        this.utterance.voice = hindiVoice;
      }

      this.utterance.onstart = () => {
        this.isSpeaking = true;
        this.isPaused = false;
      };
      this.utterance.onend = () => {
        this.isSpeaking = false;
        this.isPaused = false;
      };
      this.utterance.onerror = (e) => {
        console.error("TTS error:", e);
        this.isSpeaking = false;
        this.isPaused = false;
      };

      window.speechSynthesis.speak(this.utterance);
    },

    togglePauseResume() {
      if (!("speechSynthesis" in window)) return;
      if (window.speechSynthesis.speaking) {
        if (!this.isPaused) {
          window.speechSynthesis.pause();
          this.isPaused = true;
        } else {
          window.speechSynthesis.resume();
          this.isPaused = false;
        }
      }
    },

    stopSpeaking() {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      this.isPaused = false;
      this.isSpeaking = false;
    },
  },
};
</script>

<style scoped>
/* Global styles are handled in index.css */
button {
  transform: scale(1);
}
button:active {
  transform: scale(0.98);
}
</style>
