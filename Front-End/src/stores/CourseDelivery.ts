import { defineStore } from "pinia";
import addOverAllPlan from "./actions/addOverAllPlan";
import getOverALLPlanById from "./actions/getOverAllPlanById";
import sendNotification from "./actions/sendNotification";
import fetchWeeklyPlanById from "./actions/fetchWeeklyPlanById";
import submitWeeklyPlan from "./actions/submitWeeklyPlan";

export const useCourseDeliveryStore = defineStore("courseDelivery", {
    state: () => ({
        isViewingMyCourse: null,
        selectedCourseId: '',
        selectedUserId: '',
        courseName: '',
        overALLPlanById: [],
        selectedModule: {},
        weeklyPlanByid: [],
        courseDetail: {}
    }),
    actions: {
        setIsViewingMyCourse(payload) {
            this.isViewingMyCourse = payload;
        },
        setSelectedCourseId(payload) {
            this.selectedCourseId = payload;
        },
        setSelectedUserId(payload) {
            this.selectedUserId = payload;
        },
        setCourseName(payload) {
            this.courseName = payload;
        },
        setOverAllPlanById(payload) {
            this.overALLPlanById = payload
        },
        setSelectedModule(payload) {
            this.selectedModule = payload;
        },
        setCourseDetail(payload) {
            this.courseDetail = payload;
        },
        async addOverAllPlan(payload) {
            const response  = await addOverAllPlan(payload);
            console.log(response);
            return response;
        },
        async getOverALLPlanById(userId, CourseId) {
            const response = await getOverALLPlanById(userId, CourseId);
            console.log(response);
            this.setOverAllPlanById(response);
            return;
        },
        async sendNotificaion(payload) {
            const response  = await sendNotification(payload);
            console.log(response);
            return response;
        },
        async fetchWeeklyPlanById(userId, courseId, moduleNumber, moduleName) {
            const response = await fetchWeeklyPlanById(userId, courseId, moduleNumber, moduleName);
            console.log(response);
            return response;
        },
        async setWeeklyPlanById(payload) {
            this.weeklyPlanByid = payload;
        },
        async submitWeeklyPlan(payload) {
            const response  = await submitWeeklyPlan(payload);
            console.log(response);
            return response;
        }
    }
});