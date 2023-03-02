import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({ 
    userType: [
      {
      "code": "u01",
      "name": "admin",
      },
      {
      "code": "u02",
      "name": "vc",
      },
      {
      "code": "u03",
      "name": "hod",
      },
      {
      "code": "u04",
      "name": "faculty",
      },
      {
      "code": "u05",
      "name": "dean",
      }
    ],
    isUserTypeFetched: false,
  }),
  getters: {
    getUserType: (state) => state.userType,
  },
  actions: {
    fetchUserType() {
      const response = this.userType;
      this.setUserType(response);
      this.isUserTypeFetched = true;
    },
    setUserType(payload) {
      this.userType = payload;
    }
  },
})
