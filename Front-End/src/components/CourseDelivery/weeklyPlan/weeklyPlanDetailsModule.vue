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
            <input id="form1Example2" class="form-control" v-model="weeklyPlanModule.moduleNumber" disabled />
            <label class="form-label" for="form1Example2">Module Number</label>
        </div>

        <!-- Module Name Input -->
        <div class="form-group">
            <input id="form1Example2" class="form-control" v-model="weeklyPlanModule.moduleName" disabled />
            <label class="form-label" for="form1Example2">Module Name</label>
        </div>

        <!-- Total hours Input -->
        <div class="form-group">
            <input id="form1Example2" class="form-control" v-model="weeklyPlanModule.NoOfHours" disabled />
            <label class="form-label" for="form1Example2">Total hours required</label>
        </div>

        <!-- Total DaysInput -->
        <div class="form-group">
            <input id="form1Example2" class="form-control" v-model="weeklyPlanModule.NoOfClassesRequired" disabled />
            <label class="form-label" for="form1Example2">Total days required</label>
        </div>

        <!-- Start date Input -->
        <div class="form-group">
            <input id="form1Example2" class="form-control" v-model="weeklyPlanModule.startDate" disabled />
            <label class="form-label" for="form1Example2">Start date</label>
        </div>

        <!-- End date Input -->
        <div class="form-group">
            <input id="form1Example2" class="form-control" v-model="weeklyPlanModule.endDate" disabled />
            <label class="form-label" for="form1Example2">End date</label>
        </div>

        <div class="form-group">
            <input id="form1Example2" class="form-control" v-model="weeklyPlanModule.classDays" disabled />
            <label class="form-label" for="form1Example2">Class Days</label>
        </div>
    </div>
</template>
<script setup>
import { useCourseDeliveryStore } from '@/stores/CourseDelivery';
import { computed } from "@vue/reactivity";

const courseDeliveryStore = useCourseDeliveryStore();

const weeklyPlanModule = computed(() => {
    return courseDeliveryStore.weeklyPlanByid[0];
})

const courseName = computed(() => {
    return courseDeliveryStore.courseName;
})

</script>
<style scoped>

.course-name {
    margin-bottom: 20px;
}
</style>