<template>
    <div class="over-all-plan-container">
        <div v-if="isViewingMyCourse">
            <div v-if="!isOverAllPlanAvailable">
                <div class="row">
                    <div class="col heading">
                        <div class="row">
                            <div class="col heading boldText">
                                Name
                            </div>
                            <div class="col boldText">
                                {{ courseName }}
                            </div>
                        </div>
                    </div>
                    <div class="col">

                    </div>
                </div>
                <div class="add-over-all-plan-form-container boldText">
                    <form @submit.prevent="addOverAllPlan">
                        <!-- Module Count Input -->
                        <div class="form-group boldText">
                            <input id="form1Example2" class="form-control boldText" v-model="moduleCount" required />
                            <label class="form-label boldText" for="form1Example2">No Of Modules</label>
                        </div>

                        <div v-for="moduleData in ModulesData">
                            <div class="module-card boldText">
                                <!-- Module Number -->
                                <div class="form-group boldText">
                                    <input id="form1Example2" class="form-control boldText" v-model="moduleData.moduleNumber"
                                        required />
                                    <label class="form-label boldText" for="form1Example2">ModuleNumber</label>
                                </div>

                                <!-- Module Name -->
                                <div class="form-group boldText">
                                    <input id="form1Example2" class="form-control boldText" v-model="moduleData.moduleName"
                                        required />
                                    <label class="form-label boldText" for="form1Example2">Module Name</label>
                                </div>

                                <!-- Module Number -->
                                <div class="form-group boldText">
                                    <input id="form1Example2" class="form-control boldText" v-model="moduleData.NoOfHours"
                                        required />
                                    <label class="form-label boldText" for="form1Example2">No Of Hours Required</label>
                                </div>

                                <!-- Module Number -->
                                <div class="form-group boldText">
                                    <input id="form1Example2" class="form-control boldText" v-model="moduleData.NoOfClassesRequired"
                                        required />
                                    <label class="form-label boldText" for="form1Example2">No Of Classes Required</label>
                                </div>
                            </div>
                        </div>

                        <!-- Document Input -->
                        <div class="form-group drive-link boldText">
                            <input id="form1Example2" class="form-control boldText" v-model="documentDetails" required />
                            <label class="form-label boldText" for="form1Example2">Drive Link for materials</label>
                        </div>

                        <div class="align-center boldText">
                            <button type="submit" class="btn btn-default button-add-course boldText">Add</button>
                        </div>

                    </form>
                </div>
            </div>
            <div v-else>
                <OverAllPlanDetails/>
            </div>
        </div>
        <div v-else>
            <div v-if="isOverAllPlanAvailable">
                <OverAllPlanDetails/>
            </div>
            <div v-else>
                <h1 class="boldText"> No Over All Plan Available for Selected Course and User</h1>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useCourseDeliveryStore } from '@/stores/CourseDelivery';
import { computed, ref } from "@vue/reactivity";
import { onBeforeMount, watch } from 'vue';
import OverAllPlanDetails from './OverAllPlanDetails.vue';

const documentDetails = ref('');
const moduleCount = ref(0);

const ModulesData = ref([]);

const courseDeliveryStore = useCourseDeliveryStore();

watch(() => {
    return moduleCount.value
}, (newValue, oldValue) => {
    let difference = parseInt(newValue) - ModulesData.value.length;
    if (difference > 0) {
        for (let i = 0; i < difference; i++) {
            ModulesData.value.push({
                moduleNumber: '',
                moduleName: '',
                NoOfHours: '',
                NoOfClassesRequired: ''
            });
        }
    }
    if (difference < 0 && parseInt(oldValue) >= 0 && parseInt(newValue) >= 0) {
        ModulesData.value = ModulesData.value.slice(0, ModulesData.value.length + difference);
    }
})

const isOverAllPlanAvailable = computed(()=> {
    return courseDeliveryStore.overALLPlanById.length > 0;
});
const courseName = computed(() => {
    return courseDeliveryStore.courseName;
})

const isViewingMyCourse = computed(() => {
    return courseDeliveryStore.isViewingMyCourse;
})

async function addOverAllPlan() {
    let overAllPlanPayload = {
        courseId : courseDeliveryStore.selectedCourseId,
        createdBy : courseDeliveryStore.selectedUserId,
        moduleDetails : ModulesData.value,
        driveLinkForMaterials: documentDetails.value,
    }
    console.log(JSON.parse(JSON.stringify(overAllPlanPayload)));
    const response = await courseDeliveryStore.addOverAllPlan(JSON.parse(JSON.stringify(overAllPlanPayload)));
    if(response.courseId) {
        alert('overAll Plan Added');
        await courseDeliveryStore.getOverALLPlanById(courseDeliveryStore.selectedUserId,courseDeliveryStore.selectedCourseId)
    } else {
        alert('overAll Plan Addition Failed');
    }
}

onBeforeMount(async()=> {
  await courseDeliveryStore.getOverALLPlanById(courseDeliveryStore.selectedUserId,courseDeliveryStore.selectedCourseId)
});

</script>
<style>
.over-all-plan-container {
    margin: 30px;
}

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