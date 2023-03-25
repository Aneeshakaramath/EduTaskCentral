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


                <!-- Submit button -->
                <div class="align-center">
                    <button type="submit" class="btn btn-default add-course">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const fromAcademicYear = ref('');
const ToAcademicYear = ref('');

async function Submit() {
    alert('form submitted');
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
.add-course {
    margin: 20px;
    align-content: center;
    background-color: lightskyblue;
}
</style>