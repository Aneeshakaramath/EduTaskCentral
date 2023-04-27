<template>
    <div class="selected-weekly-plan-container">
        <div v-if="!showSpinner"> 
            <div v-if="isWeeklyPlanAvailable">
                <div v-if="isViewingMyCourse" class="send-notification-container boldText">
                    <div>
                        <label class="typo__label boldText">Select an user to send notification</label>
                        <VueMultiselect
                                v-model="userValues" placeholder="Search an User" label="name" track-by="id"
                                :options="userOptions" :multiple="false" :taggable="false">
                        </VueMultiselect>
                    </div>
                    <div class="align-center">
                        <button type="submit" class="btn btn-default button-add-course boldText" @click="sendNotification">Send</button>
                    </div>
                </div>
                <div>
                    <WeeklyPlanDetails></WeeklyPlanDetails>
                </div>
            </div>
            <div v-else>
                <div v-if="isViewingMyCourse">
                    <AddWeeklyPlan></AddWeeklyPlan>
                </div>
                <div v-else>
                    <h1> Weekly Plan is not available for this module</h1>
                </div>
            </div>
        </div>
        <div class="align-center spinner-container" v-if="showSpinner">
            <div class="spinner-border" role="status">
                <span class="visually-hidden" ></span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from '@/stores/User';
import { useCourseDeliveryStore } from '@/stores/CourseDelivery';
import { computed, ref } from "@vue/reactivity";
import { onBeforeMount } from 'vue';
import VueMultiselect from 'vue-multiselect';
import WeeklyPlanDetails from './weeklyPlanDetailsModule.vue';
import AddWeeklyPlan from './addWeeklyPlan.vue';
import swal from 'sweetalert';

const courseDeliveryStore = useCourseDeliveryStore();
const store = useUserStore();

const showSpinner = ref(true);

let userValues = ref([]);
let userOptions = ref([]);

onBeforeMount(async()=> {
    const userReponse = await store.fetchUserDetails();
    store.setUserList(userReponse);
    setUserValues();
    await fetchWeeklyPlanByid();
    showSpinner.value = false;
});

function setUserValues() {
    store.userList.forEach((value) => {
        userOptions.value.push({name: value.name, id: value._id});
        userOptions.value.push({name: value.rollNumber, id: value._id});
    })
}

async function fetchWeeklyPlanByid() {
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

const isViewingMyCourse = computed(() => {
    return courseDeliveryStore.isViewingMyCourse;
})

const isWeeklyPlanAvailable = computed(()=> {
    return courseDeliveryStore.weeklyPlanByid.length > 0;
});

async function sendNotification() {
    if(!userValues.value.id) {
        swal("Oops!", "Select an user!", "error");
        // alert('select an user');
        return;
    }
    let descriptionNotificaiton = `weekly plan details has been submitted for course ${courseDeliveryStore.courseName} for module ${courseDeliveryStore.selectedModule.moduleName} by ${store.userData.userDetails.name}`;
    let notificationCreatePayload = {
        "userId" : userValues?.value?.id ,
        "description" : descriptionNotificaiton
    };
    const response = await courseDeliveryStore.sendNotificaion(notificationCreatePayload);
    if (response._id == notificationCreatePayload.userId || response.userId !== null) {
        swal("Success!", "notification sent successfully", "success");
        // alert('notification sent successfully');
    }
    else {
        swal("Oops!", "notification failed!", "error");
        // alert('notification failed');
    }
}

</script>
<style scoped>

.spinner-container {
    margin-top: 20px;
}

.selected-weekly-plan-container {
  margin: 30px;
  color: black
}
</style>