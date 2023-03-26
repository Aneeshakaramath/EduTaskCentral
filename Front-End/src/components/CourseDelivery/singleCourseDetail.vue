<template>
    <div class="single-course-details-container">
        Course Details For {{ selectedCourseDetail.name }}
        <div class="container">
            <div class="row field-row">
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            Name
                        </div>
                        <div class="col">
                            {{ selectedCourseDetail.name }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            Code
                        </div>
                        <div class="col">
                            {{ selectedCourseDetail.code }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row field-row">
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            Semested
                        </div>
                        <div class="col">
                            {{ selectedCourseDetail.semester }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            Year Of Study
                        </div>
                        <div class="col">
                            {{ selectedCourseDetail.yearOfStudy }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row field-row">
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            Credit
                        </div>
                        <div class="col">
                            {{ selectedCourseDetail.credit }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                           Student Count
                        </div>
                        <div class="col">
                            {{ selectedCourseDetail.studentCount }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row field-row">
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            Start Year
                        </div>
                        <div class="col">
                            {{ selectedCourseDetail.start_year }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                           End Year
                        </div>
                        <div class="col">
                            {{ selectedCourseDetail.end_year }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row field-row">
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            Type Of Course
                        </div>
                        <div class="col">
                            {{ selectedCourseDetail.typeOfCourse }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            isElective
                        </div>
                        <div class="col">
                            {{ selectedCourseDetail.isElective }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { computed } from 'vue';

const store = useUserStore();

const selectedCourseDetail = computed(() => {
    return store.selectedCourse;
})

</script>
<style>

.single-course-details-container {
  margin: 30px;
  color: black
}

.container {
    margin: 5px;
}

.field-row {
    margin-top: 15px;
}

.heading {
    font-weight: 700;
}
</style>