import { defineStore } from "pinia";
import addQuestionpaper from "./actions/addQuestionpaper";

export const useQuestionPaperStore = defineStore("questionPaper", {
    state: () => ({
        examType: ''
    }),
    actions: {
        setExamType(payload) {
            this.examType = payload;
        },
        async addQuestionpaper(payload) {
            const response  = await addQuestionpaper(payload);
            console.log(response);
            return response;
        }
    }
});