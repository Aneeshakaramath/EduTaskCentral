<template>
    <div class="row course-name">
        <div class="col heading">
            <div class="row">
                <div class="col heading">
                    Course name
                </div>
                <div class="col">
                    {{ courseName }}
                </div>
            </div>
        </div>
    </div>
    <div class="col">
        <!-- Module Count Input -->
        <div class="form-group">
            <input id="form1Example2" class="form-control" v-model="moduleNumber" disabled />
            <label class="form-label" for="form1Example2">Module Number</label>
        </div>

        <!-- Module Name Input -->
        <div class="form-group">
            <input id="form1Example2" class="form-control" v-model="moduleName" disabled />
            <label class="form-label" for="form1Example2">Module Name</label>
        </div>

        <!-- Total hours Input -->
        <div class="form-group">
            <input id="form1Example2" class="form-control" v-model="noOfHours" disabled />
            <label class="form-label" for="form1Example2">Total hours required</label>
        </div>

        <!-- Total DaysInput -->
        <div class="form-group">
            <input id="form1Example2" class="form-control" v-model="noOfClassesRequired" disabled />
            <label class="form-label" for="form1Example2">Total days required</label>
        </div>

        <!-- Start date Input -->
        <div class="form-group">
            <label for="end-date">End Date</label>
            <input class="date-input" type="date" id="end-date" name="end-date" v-model="startDate">
        </div>

        <!-- End date Input -->
        <div class="form-group">
                <label for="end-date">End Date</label>
                <input class="date-input" type="date" id="end-date" name="end-date" v-model="endDate">
        </div>

        <div>
            <label class="typo__label">Select class Days</label>
            <VueMultiselect
                    v-model="classDayValues" placeholder="Search an User" label="name" track-by="id"
                    :options="classDayOptions" :multiple="true" :taggable="false">
            </VueMultiselect>
        </div>

        <div class="btn-container">
            <button type="button" class="btn btn-secondary" @click="submit">submit</button>
        </div>
    </div>
</template>
<script setup>
import { useCourseDeliveryStore } from '@/stores/CourseDelivery';
import { computed } from "@vue/reactivity";
import { onBeforeMount, ref } from 'vue';
import VueMultiselect from 'vue-multiselect';

let startDate = ref('');
let endDate = ref('');
let classDayValues = ref([]);
let classDayOptions = ref([]);

const courseDeliveryStore = useCourseDeliveryStore();

onBeforeMount(async()=> {
   await setClassDayOptions();
});

async function setClassDayOptions() {
    const classDaysList = ["MON", "TUE", "WED", "THUR", "FRI"];
    classDaysList.forEach((classDay) => {
        classDayOptions.value.push({name: classDay, id: classDay+'id'});
    })
}
const courseName = computed(() => {
    return courseDeliveryStore.courseName;
})
const moduleNumber = computed(() => {
    return courseDeliveryStore.selectedModule.moduleNumber;
})

const moduleName = computed(()=> {
    return courseDeliveryStore.selectedModule.moduleName;
})

const noOfHours = computed(()=> {
    return courseDeliveryStore.selectedModule.NoOfHours;
})

const noOfClassesRequired = computed(()=> {
    return courseDeliveryStore.selectedModule.NoOfClassesRequired;
})

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


async function submit() {
    let startDateFromForm = new Date(startDate.value);
    let endDateFromForm = new Date(endDate.value);

    let payload = {
        courseId : courseDeliveryStore.selectedCourseId,
        createdBy: courseDeliveryStore.selectedUserId,
        moduleNumber: courseDeliveryStore.selectedModule.moduleNumber,
        moduleName: courseDeliveryStore.selectedModule.moduleName,
        NoOfHours: courseDeliveryStore.selectedModule.NoOfHours,
        NoOfClassesRequired: courseDeliveryStore.selectedModule.NoOfClassesRequired,
        startDate: formatDate(startDateFromForm),
        endDate: formatDate(endDateFromForm),
        classDays: []
    }

    if(classDayValues.value.length > 0) {
        classDayValues.value.forEach((classDay)=> {
            payload.classDays.push(classDay.name);
        });
    }
    const response = await courseDeliveryStore.submitWeeklyPlan(payload);
    if(response.courseId == payload.courseId || response.courseId!=null) {
        alert('weekly plan added successfully');
        const response 
            = await courseDeliveryStore
            .fetchWeeklyPlanById(
                courseDeliveryStore.selectedUserId,
                courseDeliveryStore.selectedCourseId,
                courseDeliveryStore.selectedModule.moduleNumber,
                courseDeliveryStore.selectedModule.moduleName
            );
        courseDeliveryStore.setWeeklyPlanById(response);
    } 
}
</script>
<style>
.btn-container {
    text-align: center;
    margin: 20px;
}
.date-input {
    margin-left: 20px;
}
</style>