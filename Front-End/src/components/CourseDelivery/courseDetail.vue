<template>
    <div>
        <div class="course-detail-label boldText">Course Detail</div>
        <div v-if="courseDetails.length > 0" class="course-details">
            <div class="col-sm course-name boldText" v-for="(courseDetail,index) in courseDetails" :key="courseDetail.name">
                {{  courseDetail.name }}
                <div class="dropdown course-action boldText">
                    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split dropdown-course boldText" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu boldText" aria-labelledby="dropdownMenuButton">
                        <button class="dropdown-item boldText" @click=showDetails(courseDetail)>View Details</button>
                        <button class="dropdown-item boldText" @click="routeChange('overallPlan', courseDetail)">Overall Plan</button>
                        <button class="dropdown-item boldText" @click="routeChange('weeklyPlan', courseDetail)">Weekly Plan</button>
                        <button class="dropdown-item boldText">Daily Plan</button>
                    </div>
                </div>
            </div>  
        </div>
        <div v-else class="boldText">
            No Course Added Yet
        </div>
        <div v-if="isShowDetails">
            <SingleCourseDetail></SingleCourseDetail>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useUserStore } from '@/stores/User';
import { useCourseDeliveryStore } from '@/stores/CourseDelivery';
import { useRouter } from 'vue-router';
import SingleCourseDetail from './singleCourseDetail.vue';

const props = defineProps<{
    isViewingMyCourse: boolean
}>()

const store = useUserStore();
const courseDeliveryStore = useCourseDeliveryStore();

const isShowDetails = ref(false);
const router = useRouter();

const courseDetails = computed(() => {
    return store.courses;
})

function showDetails(courseDetail) {
    console.log(courseDetail);
    store.setSelectedCourse(courseDetail);
    isShowDetails.value = true;
}

function routeChange(routeValue, courseDetail) {
    courseDeliveryStore.setCourseName(courseDetail.name);
    courseDeliveryStore.setSelectedCourseId(courseDetail._id);
    courseDeliveryStore.setSelectedUserId(courseDetail.createdBy._id);
    courseDeliveryStore.setIsViewingMyCourse( props.isViewingMyCourse);
    router.push({ name: routeValue});
}
</script>
<style>
.course-details {
    padding: 20px;
}
.course-action {
    display: inline;
}
.course-detail-label {
    font-weight: bold;
}
.course-name {
    margin: 10px;
    padding: 10px;
    font-size: 20px;
}

.dropdown-course {
    font-size: 10px;
}
</style>