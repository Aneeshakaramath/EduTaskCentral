<template>
    <div class="course-wise-ques-details-container align-center boldText">
        <div v-if="isLoaded">
            <h1 class="ques-heading">Question paper checklist for courses</h1>
            <div v-if="isCourseAvailable">
                <vaadin-accordion>
                    <vaadin-accordion-panel v-for="questionPaper in questionPaperChecklist" :summary="questionPaper.courseName">
                        <vaadin-vertical-layout>
                            <ul v-for="questionPaperStatus in questionPaper.questionPaperDetails">
                                <li style="text-align: left;">
                                    {{ questionPaperStatus.examType }}
                                    <img v-if="questionPaperStatus.isAvailable" class='image-icon boldText' src="@/assets/images/tick_ques.png"/>
                                    <img v-else class='image-icon boldText' src="@/assets/images/cross_mark.png"/>
                                </li>
                            </ul>
                        </vaadin-vertical-layout>
                    </vaadin-accordion-panel>
                </vaadin-accordion>
            </div>
            <div v-else>
                <span class="align-center boldText">
                    No Course Available
                </span>
            </div>
        </div>
        <div class="spinner-border" v-else role="status">
            <span class="visually-hidden" ></span>
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useUserStore } from '@/stores/User';
import { useQuestionPaperStore } from '@/stores/QuestionPaper';

const store = useUserStore();

const questionPaperStore = useQuestionPaperStore();

const isApiCallMade = ref(false);
const isLoaded = ref(false);
const isCourseAvailable = ref(false);
const questionPaperChecklist = ref([]);

watch(()=>store.userData?.userDetails.id, async (newValue, oldValue)=> {
    if(store.userData?.userDetails?.id) {
        await fetchCourseWiseQuestionDetails();
        isApiCallMade.value = false;
    }
});

onBeforeMount(async()=> {
    if(store.userData?.userDetails?.id) {
        await fetchCourseWiseQuestionDetails();
        isApiCallMade.value = false;
    }
});

async function fetchCourseWiseQuestionDetails() {
    if(!isLoaded.value && !isApiCallMade.value) {
        isApiCallMade.value = true;
        const response = await store.getCourseByUserId(store.userData?.userDetails.id);
        store.setCourses(response);
        // isLoaded.value = true;
        if(response.length > 0) {
            isCourseAvailable.value = true;
            let examType = ["CAT_1", "CAT_2", "SEM"];
            response.forEach((course,index)=>{
                questionPaperChecklist.value.push({
                    courseName: course.name,
                    questionPaperDetails: [],
                })
                examType.forEach(async (examType)=> {
                    // _id
                    const questionPaperResponse = await questionPaperStore.fetchQuestionPaperByid(course._id, examType);
                    if(questionPaperResponse.length > 0) {
                        questionPaperChecklist.value[index].questionPaperDetails.push({
                            examType: examType,
                            isAvailable: true});
                    } else {
                        questionPaperChecklist.value[index].questionPaperDetails.push({
                            examType: examType,
                            isAvailable: false});
                    }
                });
            });
            isLoaded.value = true;
            
        } else {
            isCourseAvailable.value = false;
            isLoaded.value = true;
        }
    }
}
</script>
<style>

.course-wise-ques-details-container {
    margin-top: 20px;
    padding: 10px;
    background-color: #f3eff2;
}

.ques-heading {
    font-size: 15px;
    text-align: left;
    font-weight: bold;
}

.image-icon {
    margin-left: 5px;
    width: 15px;
}
</style>