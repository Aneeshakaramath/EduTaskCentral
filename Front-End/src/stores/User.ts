import { defineStore } from "pinia";
import fetchUserType from "./actions/fetchUserType";
import signUpUser from "./actions/signUpUser";
import authenticateUser from "./actions/authenticateUser";
import logout from "./actions/logout";
import fetchUserData from "./actions/fetchUserData";

export const useUserStore = defineStore("user", {
  state: () => ({ 
    userType: [],
    apiCallBeingMade: false,
    isLoggedIn: false,
    isErrorOccured: false,
    userData: null,
  }),
  getters: {
    getUserType: (state) => state.userType,
    getTaskAssignedByMe: (state) => state.userData?.taskAssignedByMe,
    getTaskAssignedToMe: (state) => state.userData?.taskAssignedToMe,
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
    async signUp(userDetails) {
      this.apiCallBeingMade = true;
      const response = await signUpUser(userDetails);
      this.apiCallBeingMade = false;
      return response;
    },
    async login(userDetails) {
      this.apiCallBeingMade = true;
      const response = await authenticateUser(userDetails);
      console.log(response);
      this.apiCallBeingMade = false;
      return response;
    },
    async logout() {
      this.apiCallBeingMade = true;
      const response = await logout();
      console.log(response);
      this.apiCallBeingMade = false;
      return response;
    },
    async setIsLoggedIn(payload) {
      this.isLoggedIn = payload;
    },
    async fetchUserData() {
      this.apiCallBeingMade = true;
      const response = await fetchUserData();
      console.log(response);
      this.apiCallBeingMade = false;
      return response;
    },
    setUserData(payload) {
      this.userData = payload;
    }
  },
})


