<template>
    <div class="weekly-plan-container">
            <div v-if="isOverAllPlanAvailable">
                <h1 class="select-module-heading">select the module for weekly plan</h1>
                <ul v-for="moduleData in ModulesData">
                    <li>
                        <a class='override-to-green' v-on:click.prevent="redirectToIndividualModule(moduleData)">
                            {{ moduleData.moduleName }}
                        </a>
                    </li> 
                </ul>
            </div>
            <div v-else>
                <h1> No Over All Plan Available for the selected course. Complete the overall Plan </h1>
            </div>
    </div>
</template>
<script setup>
import { useCourseDeliveryStore } from '@/stores/CourseDelivery';
import { computed } from "@vue/reactivity";
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const courseDeliveryStore = useCourseDeliveryStore();
const router = useRouter();

const isOverAllPlanAvailable = computed(()=> {
    return courseDeliveryStore.overALLPlanById.length > 0;
});

const isViewingMyCourse = computed(() => {
    return courseDeliveryStore.isViewingMyCourse;
})

const ModulesData = computed(() => {
    return ((JSON.parse(JSON.stringify(courseDeliveryStore.overALLPlanById))))[0].moduleDetails;
})

onBeforeMount(async()=> {
  await courseDeliveryStore.getOverALLPlanById(courseDeliveryStore.selectedUserId,courseDeliveryStore.selectedCourseId)
});

function redirectToIndividualModule(selectedModule) {
    courseDeliveryStore.setSelectedModule(selectedModule);
    router.push({ name: 'weeklyPlanModuleDetails'});
}

</script>
<style scoped>
.weekly-plan-container {
  margin: 30px;
  color: black
}

.select-module-heading {
    font-size: 16px;
}

.override-to-green {
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    cursor: pointer;
}

</style>