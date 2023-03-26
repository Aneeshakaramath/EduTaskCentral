<template>
    <div>
        <div class="course-detail-label">Course Detail</div>
        <div v-if="courseDetails.length > 0" class="course-details">
            <div class="col-sm course-name" v-for="(courseDetail,index) in courseDetails" :key="courseDetail.name">
                {{  courseDetail.name }}
                <div class="dropdown course-action">
                    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split dropdown-course" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button class="dropdown-item" @click=showDetails(courseDetail)>View Details</button>
                        <button class="dropdown-item">Overall Plan</button>
                        <button class="dropdown-item">Weekly Plan</button>
                        <button class="dropdown-item">Daily Plan</button>
                    </div>
                </div>
            </div>  
        </div>
        <div v-else>
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
import SingleCourseDetail from './singleCourseDetail.vue';

const store = useUserStore();
const isShowDetails = ref(false);

const courseDetails = computed(() => {
    return store.courses;
})

function showDetails(courseDetail) {
    console.log(courseDetail);
    store.setSelectedCourse(courseDetail);
    isShowDetails.value = true;
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