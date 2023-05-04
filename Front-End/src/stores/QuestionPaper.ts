import { defineStore } from "pinia";
import addQuestionpaper from "./actions/addQuestionpaper";
import addCatMarks from "./actions/addCatMarks";
import fetchQuestionPaperByid from "./actions/fetchQuestionPaperByid";
import fetchCatMarksById from "./actions/fetchCatMarksById";

export const useQuestionPaperStore = defineStore("questionPaper", {
    state: () => ({
        examType: '',
        questionPaperById: [],
        catMarksById: [],
    }),
    actions: {
        setExamType(payload) {
            this.examType = payload;
        },
        setQuestionPaperById(paylaod) {
            this.questionPaperById = paylaod;
        },
        setCatMarksById(payload) {
            this.catMarksById = payload;
        },
        async addQuestionpaper(payload) {
            const response  = await addQuestionpaper(payload);
            console.log(response);
            return response;
        },
        async addCatMarks(payload) {
            const response  = await addCatMarks(payload);
            console.log(response);
            return response;
        },
        async fetchQuestionPaperByid(courseId, examType) {
            const response = await fetchQuestionPaperByid(courseId, examType);
            console.log(response);
            return response;
        },
        async fetchCatMarksById(courseId, examType) {
            const response = await fetchCatMarksById(courseId, examType);
            console.log(response);
            return response;
        }
    }
});