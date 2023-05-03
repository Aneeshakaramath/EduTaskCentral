import { defineStore } from "pinia";
import addQuestionpaper from "./actions/addQuestionpaper";
import fetchQuestionPaperByid from "./actions/fetchQuestionPaperByid";

export const useQuestionPaperStore = defineStore("questionPaper", {
    state: () => ({
        examType: '',
        questionPaperById: [],
    }),
    actions: {
        setExamType(payload) {
            this.examType = payload;
        },
        setQuestionPaperById(paylaod) {
            this.questionPaperById = paylaod;
        },
        async addQuestionpaper(payload) {
            const response  = await addQuestionpaper(payload);
            console.log(response);
            return response;
        },
        async fetchQuestionPaperByid(courseId, examType) {
            const response = await fetchQuestionPaperByid(courseId, examType);
            console.log(response);
            return response;
        },
    }
});