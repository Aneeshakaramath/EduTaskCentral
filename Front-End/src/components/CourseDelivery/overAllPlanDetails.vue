<template>
    <div>
        <div class="row">
            <div class="col heading">
                <div class="row">
                    <div class="col heading">
                        Name
                    </div>
                    <div class="col">
                        {{ courseName }}
                    </div>
                </div>
            </div>
            <div class="col">

            </div>
        </div>
        <div class="add-over-all-plan-form-container">
            <!-- Module Count Input -->
            <div class="form-group">
                <input id="form1Example2" class="form-control" v-model="moduleCount" disabled />
                <label class="form-label" for="form1Example2">No Of Modules</label>
            </div>

            <div v-for="moduleData in ModulesData">
                <div class="module-card">
                    <!-- Module Number -->
                    <div class="form-group">
                        <input id="form1Example2" class="form-control" v-model="moduleData.moduleNumber" disabled />
                        <label class="form-label" for="form1Example2">ModuleNumber</label>
                    </div>

                    <!-- Module Name -->
                    <div class="form-group">
                        <input id="form1Example2" class="form-control" v-model="moduleData.moduleName" disabled />
                        <label class="form-label" for="form1Example2">Module Name</label>
                    </div>

                    <!-- Module Number -->
                    <div class="form-group">
                        <input id="form1Example2" class="form-control" v-model="moduleData.NoOfHours" disabled />
                        <label class="form-label" for="form1Example2">No Of Hours Required</label>
                    </div>

                    <!-- Module Number -->
                    <div class="form-group">
                        <input id="form1Example2" class="form-control" v-model="moduleData.NoOfClassesRequired" disabled />
                        <label class="form-label" for="form1Example2">No Of Classes Required</label>
                    </div>
                </div>
            </div>

            <!-- Document Input -->
            <div class="form-group drive-link">
                <input id="form1Example2" class="form-control" v-model="documentDetails" disabled />
                <label class="form-label" for="form1Example2">Drive Link for materials</label>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useCourseDeliveryStore } from '@/stores/CourseDelivery';
import { computed } from "@vue/reactivity";
const courseDeliveryStore = useCourseDeliveryStore();

const courseName = computed(() => {
    return courseDeliveryStore.courseName;
})

const moduleCount = computed(() => {
    return ((JSON.parse(JSON.stringify(courseDeliveryStore.overALLPlanById))))[0].moduleDetails.length;
})

const documentDetails = computed(() => {
    return ((JSON.parse(JSON.stringify(courseDeliveryStore.overALLPlanById))))[0].driveLinkForMaterials;
})

const ModulesData = computed(() => {
    return ((JSON.parse(JSON.stringify(courseDeliveryStore.overALLPlanById))))[0].moduleDetails;
})
</script>
<style>
.module-card {
    background-color: lightblue;
    padding: 20px;
    margin-top: 10px;
}

.add-over-all-plan-form-container {
    margin-top: 20px;
    margin-bottom: 20px;
}

.drive-link {
    margin-top: 10px;
}
</style>