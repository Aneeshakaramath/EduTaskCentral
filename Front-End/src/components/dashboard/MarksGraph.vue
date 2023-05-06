<template>
    <div class="mark-details-container align-center boldText">
        <div v-if="isLoaded">
            <h1 class="ques-heading">Question paper checklist for courses</h1>
            <div v-if="isCourseAvailable">
                <vaadin-accordion>
                    <vaadin-accordion-panel v-for="course in courseList" :summary="course.courseName">
                        <vaadin-vertical-layout>
                            <span v-for="markDetails in course.markDetailsForExamType.markDetailsForExamType">
                                <button class="btn btn-default button-sign-in" @click=showMarksChart(course,markDetails)>{{markDetails.examType}}</button>
                            </span>  
                            <div class="spinner-border marks-spinner" v-if="course.markDetailsForExamType.isApiCallBeingMade" role="status">
                                <span class="visually-hidden"></span>
                            </div>
                            <div class="marks-spinner" v-if="course.markDetailsForExamType.isApiCallDone && !course.markDetailsForExamType.isApiCallBeingMade">
                                <div v-if="course.markDetailsForExamType.marks.length>0">
                                    <apexchart width="500" type="bar" :options="options" :series="calulateSeries(course.markDetailsForExamType.marks[0].marks)"></apexchart>
                                </div>
                                <div v-else>
                                    No marks available
                                </div>
                            </div>
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
            <span class="visually-hidden"></span>
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, ref, watch, computed } from 'vue';
import { useUserStore } from '@/stores/User';
import { useQuestionPaperStore } from '@/stores/QuestionPaper';

const store = useUserStore();

const questionPaperStore = useQuestionPaperStore();

const isApiCallMade = ref(false);
const isLoaded = ref(false);
const isCourseAvailable = ref(false);
const courseList = ref([]);

const options = computed(() => {
    return {
        chart: {
            width: 250,
            id: 'vuechart-example'
        },
        xaxis: {
          categories: ["<40", "40-60", "60-80", "80-100"]
        }
    }
});

const series = computed(()=> {
    return [{
        name: 'series-1',
        data: [30, 40, 45, 50]
      }]
})

function calulateSeries(marksArray) {
    let result = [{
        name: 'series-1',
        data: [0, 0, 0, 0]
    }]
    marksArray.forEach((mark)=> {
        if(mark.Total < 40) {
            result[0].data[0]++;
        } else if(mark.Total < 61) {
            result[0].data[1]++;
        } else if(mark.Total < 80) {
            result[0].data[2]++;
        } else if(mark.Total <= 100) {
            result[0].data[3]++;
        }
    });
    return result;
}
watch(() => store.userData?.userDetails.id, async (newValue, oldValue) => {
    if (store.userData?.userDetails?.id) {
        await fetchCourseWiseQuestionDetails();
        isApiCallMade.value = false;
    }
});

onBeforeMount(async () => {
    if (store.userData?.userDetails?.id) {
        await fetchCourseWiseQuestionDetails();
        isApiCallMade.value = false;
    }
});

async function fetchCourseWiseQuestionDetails() {
    if (!isLoaded.value && !isApiCallMade.value) {
        isApiCallMade.value = true;
        const response = await store.getCourseByUserId(store.userData?.userDetails.id);
        // isLoaded.value = true;
        if (response.length > 0) {
            let examType = ["CAT_1", "CAT_2", "SEM"];
            isCourseAvailable.value = true;
            response.forEach((course, index) => {
                courseList.value.push({
                    courseName: course.name,
                    courseId: course._id,
                    markDetailsForExamType: {
                        isApiCallBeingMade: false,
                        isApiCallDone: false,
                        markDetailsForExamType: [],
                        marks: [],
                    },
                })
                examType.forEach( (examType)=> {
                    courseList.value[index].markDetailsForExamType.markDetailsForExamType.push({
                            examType: examType,
                        });
                });
            });
            isLoaded.value = true;

        } else {
            isCourseAvailable.value = false;
            isLoaded.value = true;
        }
    }
}

async function showMarksChart(course,markDetails) {
    course.markDetailsForExamType.isApiCallBeingMade = true;
    if(markDetails.examType == 'SEM') {
        const response = await questionPaperStore.fetchSemMarksById(course.courseId,markDetails.examType);
        if(response.length > 0) {
            course.markDetailsForExamType.marks = response;
        } else {
            course.markDetailsForExamType.marks = [];
        }
        course.markDetailsForExamType.isApiCallDone = true;
        course.markDetailsForExamType.isApiCallBeingMade = false;  
    } else {
        const response = await questionPaperStore.fetchCatMarksById(course.courseId,markDetails.examType);
        if(response.length > 0) {
            course.markDetailsForExamType.marks = response;
        } else {
            course.markDetailsForExamType.marks = [];
        }
        course.markDetailsForExamType.isApiCallDone = true;
        course.markDetailsForExamType.isApiCallBeingMade = false;
    }
}   

</script>
<style>
.mark-details-container {
    margin-top: 20px;
    padding: 10px;
    background-color: #f3eff2;
}

.margin-left {
    margin-left: 20px;
}

.marks-spinner {
    display: block;
    margin: auto;
}
</style>