import { defineStore } from "pinia";
import addOverAllPlan from "./actions/addOverAllPlan";
import getOverALLPlanById from "./actions/getOverAllPlanById";

export const useCourseDeliveryStore = defineStore("courseDelivery", {
    state: () => ({
        isViewingMyCourse: null,
        selectedCourseId: '',
        selectedUserId: '',
        courseName: '',
        overALLPlanById: [],
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
        }
    }
});