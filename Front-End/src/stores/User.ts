import { ref, computed } from "vue";
import { defineStore } from "pinia";
import fetchUserType from "./actions/fetchUserType";
import signUpUser from "./actions/signUpUser";
import authenticateUser from "./actions/authenticateUser";

export const useUserStore = defineStore("user", {
  state: () => ({ 
    userType: [],
    apiCallBeingMade: false,
    isLoggedIn: false,
    isErrorOccured: false
  }),
  getters: {
    getUserType: (state) => state.userType,
  },
  actions: {
    async fetchUserType() {
      this.apiCallBeingMade = true;
      const response = await fetchUserType();
      this.apiCallBeingMade = false;
      return response;
    },
    setUserType(payload) {
      this.userType = payload;
    },
    async SignUp(userDetails) {
      this.apiCallBeingMade = true;
      const response = await signUpUser(userDetails);
      this.apiCallBeingMade = false;
      return response;
    },
    async Login(userDetails) {
      this.apiCallBeingMade = true;
      const response = await authenticateUser(userDetails);
      console.log(response);
      this.apiCallBeingMade = false;
      return response;
    },
    async setIsLoggedIn(payload) {
      this.isLoggedIn = payload;
    }
  },
})


