<template>
    <div class="single-course-details-container boldText">
        Course Details For {{ selectedCourseDetail.name }}
        <div class="container">
            <div class="row field-row">
                <div class="col">
                    <div class="row">
                        <div class="col heading boldText">
                            Name
                        </div>
                        <div class="col boldText">
                            {{ selectedCourseDetail.name }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading boldText">
                            Code
                        </div>
                        <div class="col boldText">
                            {{ selectedCourseDetail.code }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row field-row boldText">
                <div class="col">
                    <div class="row">
                        <div class="col heading boldText">
                            Semester
                        </div>
                        <div class="col boldText">
                            {{ selectedCourseDetail.semester }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading boldText">
                            Year Of Study
                        </div>
                        <div class="col boldText">
                            {{ selectedCourseDetail.yearOfStudy }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row field-row">
                <div class="col">
                    <div class="row">
                        <div class="col heading boldText">
                            Credit
                        </div>
                        <div class="col boldText">
                            {{ selectedCourseDetail.credit }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading boldText">
                           Student Count
                        </div>
                        <div class="col boldText">
                            {{ selectedCourseDetail.studentCount }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row field-row">
                <div class="col">
                    <div class="row">
                        <div class="col heading boldText">
                            Start Year
                        </div>
                        <div class="col boldText">
                            {{ selectedCourseDetail.start_year }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading boldText">
                           End Year
                        </div>
                        <div class="col boldText">
                            {{ selectedCourseDetail.end_year }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row field-row">
                <div class="col">
                    <div class="row">
                        <div class="col heading boldText">
                            Type Of Course
                        </div>
                        <div class="col boldText">
                            {{ selectedCourseDetail.typeOfCourse }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading boldText">
                            isElective
                        </div>
                        <div class="col boldText">
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