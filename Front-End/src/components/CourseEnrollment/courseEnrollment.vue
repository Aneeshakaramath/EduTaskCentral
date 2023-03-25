<template>
    <div class="course-enrollment-container">
        <h1 class="course-enrollment-heading">
            Course Enrollment
        </h1>
        <div class="add-course-form-container">
            <form @submit.prevent="Submit">

                <label class="form-label">Academic year</label>
                <!-- Academic Year -->
                <div class="mb-3">
                    <div class="row">
                        <div class="col">
                            <div class="row">
                                <div class="col">
                                    <label class="form-label" for="from">From</label>
                                    <input type="text"  id="from" class="form-control form-control-sm"  v-model="fromAcademicYear" required/>
                                </div>
                                <div class="col">
                                    <label class="form-label" for="to">To</label>
                                    <input type="text"  id="to" class="form-control form-control-sm" v-model="ToAcademicYear" required/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Year Of study -->
                <div class="mb-3">
                    <label class="form-label" for="yearOfStudy">Year Of Study</label>
                    <input type="number"  id="yearOfStudy" class="form-control form-control-sm" v-model="yearOfStudy" min="1" max="4" required/>
                </div>

                <!-- Semester -->
                <div class="mb-3">
                    <label class="form-label" for="semester">Semester</label>
                    <input type="number"  id="semester" class="form-control form-control-sm" v-model="semester" min="1" max="8" required/>
                </div>

                <!-- Course name -->
                <div class="mb-3">
                    <label class="form-label" for="course-name">Course Name</label>
                    <input type="text"  id="course-name" class="form-control form-control-sm" v-model="courseName" required/>
                </div>

                <!-- Course Code -->
                <div class="mb-3">
                    <label class="form-label" for="course-code">Course Code</label>
                    <input type="text"  id="course-code" class="form-control form-control-sm" v-model="courseCode" required/>
                </div>

                <!-- Course Type -->
                <div class="mb-3">
                    <label class="form-label select-label" for="courseType">Select the Course Type</label>
                    <select class="form-select course-type-select" id="courseType" v-model="courseType" required> 
                        <option value="Theory">
                            Theory
                        </option>
                        <option value="Lab">
                            Lab
                        </option>
                        <option value="Lab Integrated Theory">
                            Lab Integrated Theory
                        </option>
                    </select>
                </div>

                <!-- Elective  -->
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="isElective">
                    <label class="form-check-label" for="flexCheckDefault">
                        Elective Course
                    </label>
                </div>

                <!-- Credit -->
                <div class="mb-3">
                    <label class="form-label" for="credit">Credit</label>
                    <input type="number"  id="credit" class="form-control form-control-sm" v-model="credit" min="1" max="10" required/>
                </div>

                <!-- Strength Of Students -->
                <div class="mb-3">
                    <label class="form-label" for="student-count">Strength Of Students</label>
                    <input type="number"  id="student-count" class="form-control form-control-sm" v-model="studentCount" required/>
                </div>

                <!-- Submit button -->
                <div class="align-center">
                    <button type="submit" class="btn btn-default add-course">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { ref } from 'vue'

const store = useUserStore();

const fromAcademicYear = ref('');
const ToAcademicYear = ref('');
const yearOfStudy = ref('');
const semester = ref('');
const courseName = ref('');
const courseCode = ref('');
const courseType = ref('');
const credit = ref('');
const studentCount = ref('');
const isElective = ref(false);

async function Submit() {
    const addCourseDetails : any = {
        code: courseCode.value,
        name: courseName.value,
        semester: semester.value.toString(),
        yearOfStudy: yearOfStudy.value.toString(),
        credit: credit.value.toString(),
        studentCount: studentCount.value.toString(),
        start_year: fromAcademicYear.value.toString(),
        end_year: ToAcademicYear.value.toString(),
        typeOfCourse: courseType.value,
        isElective: isElective.value,
        createdBy : store.userData?.userDetails.id,
    }
    console.log(addCourseDetails);
    const response = await store.addNewCourse(addCourseDetails);
    if(response.name == addCourseDetails.name) {
        alert('task added successfully');
    }
}
</script>
<style>
.course-enrollment-container {
    margin: 30px;
    color: black
}

.course-enrollment-heading {
    font-size: 20px;
    font-weight: bold;
}

.add-course-form-container {
    margin-left: 10px;
}
.course-type-select {
    margin-left: 10px;
}
.add-course {
    margin: 20px;
    align-content: center;
    background-color: lightskyblue;
}
</style>