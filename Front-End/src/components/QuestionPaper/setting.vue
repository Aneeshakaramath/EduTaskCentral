<template>
    <div class="boldText">
        <div v-if="isLoaded" class="course-detail-container">
            <div class="course-detail-label boldText">Course Detail</div>
            <div v-if="courseDetails.length > 0" class="course-details">
                <div class="col-sm course-name boldText" v-for="(courseDetail,index) in courseDetails" :key="courseDetail.name">
                    {{ courseDetail.code }} | {{  courseDetail.name }}
                    <div class="dropdown course-action boldText">
                    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split dropdown-course boldText" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu boldText" aria-labelledby="dropdownMenuButton">
                        <button class="dropdown-item boldText" @click="routeChange('CAT_1', courseDetail)">CAT 1</button>
                        <button class="dropdown-item boldText" @click="routeChange('CAT_2', courseDetail)">CAT 2</button>
                        <button class="dropdown-item boldText" @click="routeChange('SEM', courseDetail)">End Sem</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="spinner-border" v-else role="status">
            <span class="visually-hidden" ></span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { useCourseDeliveryStore } from '@/stores/CourseDelivery';
import { useQuestionPaperStore } from '@/stores/QuestionPaper';
import { onBeforeMount, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useUserStore();
const courseDeliveryStore = useCourseDeliveryStore();
const questionPaperStore = useQuestionPaperStore();
const isLoaded = ref(false);
const router = useRouter();

onBeforeMount(async()=> {
   const response = await store.getCourseByUserId(store.userData?.userDetails.id);
   store.setCourses(response);
   isLoaded.value = true;
});

const courseDetails = computed(() => {
    return store.courses;
})

function routeChange(examType, courseDetail) {
    courseDeliveryStore.setCourseName(courseDetail.name);
    courseDeliveryStore.setSelectedCourseId(courseDetail._id);
    courseDeliveryStore.setSelectedUserId(courseDetail.createdBy._id);
    questionPaperStore.setExamType(examType);
    router.push({ name: 'questionPaperDetails'});
}

</script>
<style scoped>
.course-detail-container {
    margin: 30px;
}

</style>