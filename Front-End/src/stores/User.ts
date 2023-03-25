import { defineStore } from "pinia";
import fetchUserType from "./actions/fetchUserType";
import signUpUser from "./actions/signUpUser";
import authenticateUser from "./actions/authenticateUser";
import logout from "./actions/logout";
import fetchUserData from "./actions/fetchUserData";
import fetchGroupDetails from "./actions/fetchGroupDetails";
import fetchAllUser from "./actions/getAllUser";
import createNewGroup from "./actions/createGroup";
import modifyGroup from "./actions/modifyGroup";
import addComment from "./actions/addComment";
import getComemntById from "./actions/getCommentById";
import modifyTask from  "./actions/modifyTask";
import fetchTaskTYpe from "./actions/fetchTaskType";
import addNewTask from "./actions/addNewTask";
import getCourseByUserId from "./actions/getCourseByUserId";
import addNewCourse from "./actions/addNewCourse";

export const useUserStore = defineStore("user", {
  state: () => ({ 
    userType: [],
    taskType: [],
    apiCallBeingMade: false,
    groupDetails: [],
    isGetGroupCallInProgress: false,
    isLoggedIn: false,
    isErrorOccured: false,
    userData: null,
    userList: [],
    commentsById: [],
    fromRoute: '',
    courses: [],
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
    async fetchTaskType() {
      const response = await fetchTaskTYpe();
      return response;
    },
    setUserType(payload) {
      this.userType = payload;
    },
    setCourses(payload) {
      this.courses = payload;
    },
    setTaskType(payload) {
      this.taskType = payload;
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
    async refreshUserData() {
      const response = await fetchUserData();
      this.userData = response;
      console.log(response);
      return response;
    },
    setUserData(payload) {
      this.userData = payload;
    },
    setGroupDetails(payload) {
      this.groupDetails = payload;
    },
    async fetchGroupDetails() {
      this.isGetGroupCallInProgress = true;
      const response = await fetchGroupDetails();
      console.log(response);
      this.isGetGroupCallInProgress = false;
      return response;
    },
    async fetchUserDetails() {
      const response = await fetchAllUser();
      console.log(response);
      return response;
    },
    setUserList(payload) {
      this.userList = payload;
    },
    async addNewGroup(groupDetails) {
      const response = await createNewGroup(groupDetails);
      console.log(response);
      return response;
    },
    async modifyGroup(groupDetails) {
      const response  = await modifyGroup(groupDetails);
      console.log(response);
      return response;
    },
    async addComments(commentsPayload) {
      const response  = await addComment(commentsPayload);
      console.log(response);
      return response;
    },
    async getCommentsById(commentId) {
      const response  = await getComemntById(commentId);
      console.log(response);
      this.commentsById = response;
    },
    async updateTask(modifyTaskPayload) {
      const response  = await modifyTask(modifyTaskPayload);
      console.log(response);
      return response;
    },
    async addNewTask(addNewTaskPayload) {
      const response  = await addNewTask(addNewTaskPayload);
      console.log(response);
      return response;
    },
    async addNewCourse(addNewCoursePayload) {
      const response  = await addNewCourse(addNewCoursePayload);
      console.log(response);
      return response;
    },
    async getCourseByUserId(userId) {
      const response = await getCourseByUserId(userId);
      console.log(response);
      return response;
    }
  },
})


