<template>
    <div v-if="isLoaded" class="date-picker-container">
        <!-- :day-labels="dayArray" -->
        <mp-calendar theme="light-grey" :day-labels="dayArray" :events-object="importantDates"></mp-calendar>
    </div>
</template>
<script setup>
import { useUserStore } from '@/stores/User';
import '@mpachnis/mp-calendar/mp-calendar.js';
import { onBeforeMount, ref } from 'vue';
import { computed } from 'vue';
const store = useUserStore();


onBeforeMount(async()=> {
   /*const response = await store.getCourseByUserId(store.userData?.userDetails.id);
   store.setCourses(response);*/
});

const dayArray = computed(()=> {
    return JSON.stringify(["sun", "mon", "tue", "wed", "thur", "fri", "sat"]);
});

const isLoaded = computed(()=> {
    return store.userData != null;
})
const importantDates = computed(() => {
    let dataArray = [];

    if (store.userData?.taskAssignedToMe) {
        store.userData?.taskAssignedToMe?.forEach(element => {
            dataArray.push({
                "title": element.description,
                "content": element.assignedTo.name,
                "date": element.startDate,
                "category": "green",
                "color": "#d60000"
            })

            dataArray.push({
                "title": element.description,
                "content": element.assignedTo.name,
                "date": element.endDate,
                "category": "red",
                "color": "#d60000"
            })
        });
    }

    if (store.userData?.taskAssignedByMe) {
        store.userData?.taskAssignedByMe?.forEach(element => {
            dataArray.push({
                "title": element.description,
                "content": element.assignedTo.name,
                "date": element.startDate,
                "category": "green",
               // "color": "#d60000"
            })

            dataArray.push({
                "title": element.description,
                "content": element.assignedTo.name,
                "date": element.endDate,
                "category": "red",
               // "color": "#d60000"
            })
        });
    }

    /*if(store.courses?.lenght > 0) {
        store.courses?.forEach(async element => {
            await courseDeliveryStore.getOverALLPlanById(courseDeliveryStore.selectedUserId,courseDeliveryStore.selectedCourseId)
        });
    }*/
    
    return JSON.stringify(dataArray);
});
</script>
<style>

.date-picker-container {
    background-color: white;
    margin-top: 10px;
    border-radius: 20px;
    padding: 10px;
}

</style>