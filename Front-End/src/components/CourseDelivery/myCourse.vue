<template>
    <div>
        <div>
            <button type="submit" class="btn btn-default button-add-course" @click="addCourse">Add New Course</button>
        </div>
        <div v-if="isLoaded" class="course-detail-container">
            <CourseDetail :isViewingMyCourse=true></CourseDetail>
        </div>
    </div>
</template>
<script setup lang="ts">
import CourseDetail from './courseDetail.vue';
import { useUserStore } from '@/stores/User';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useUserStore();
const isLoaded = ref(false);

const router = useRouter();

onBeforeMount(async()=> {
   const response = await store.getCourseByUserId(store.userData?.userDetails.id);
   store.setCourses(response);
   isLoaded.value = true;
});

function addCourse() {
    router.push({ name: 'courseEnrollment'});
}
</script>
<style>

.button-add-course{
  margin-top: 30px;
  text-align: center;
  display: inline-block;
  background-color: #166df7;
  color: white;
}

.course-detail-container {
    margin: 30px;
}
</style>