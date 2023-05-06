<template>
    <div class="memo-container boldText">
        <div class="send-notification-container boldText">
            <div>
                <label class="typo__label boldText">Select an user to send notification</label>
                <VueMultiselect v-model="userValues" placeholder="Search an User" label="name" track-by="id"
                    :options="userOptions" :multiple="false" :taggable="false">
                </VueMultiselect>
            </div>
        </div>
        <div class="row margin-top" v-for="message in memeArrayValues">
            <div class="col heading">
                <div class="row">
                    <div class="col heading boldText">
                        <textarea type="text" id="semester" class="form-control form-control-sm boldText" :value="message" rows="4" disabled />
                    </div>
                    <div class="col boldText">
                        <button type="submit" class="btn btn-default send_button boldText"
                            @click="sendNotification(message)">Send</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row margin-top">
            <div class="col heading">
                <div class="row">
                    <div class="col heading boldText">
                        <textarea type="text" id="semester" class="form-control form-control-sm boldText" v-model="customMessage" rows="2" />
                    </div>
                    <div class="col boldText">
                        <button type="submit" class="btn btn-default send_button boldText"
                            @click="sendNotification(customMessage)">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from '@/stores/User';
import { onBeforeMount, ref, computed } from 'vue';
import VueMultiselect from 'vue-multiselect';
import swal from 'sweetalert';
import { useCourseDeliveryStore } from '@/stores/CourseDelivery';

const store = useUserStore();
const courseDeliveryStore = useCourseDeliveryStore();

let userValues = ref([]);
let userOptions = ref([]);

let customMessage = ref('');

let memeArrayValues = ref([
    "Thank you for completing all tasks on time. Your commitment to excellence and organizational skills are truly appreciated",
    "Please be aware that you have 5 overdue tasks that have not been completed. This situation is causing delays and disruptions to our educational institution's operations. Please prioritize these tasks and complete them promptly.",
]);

onBeforeMount(async () => {
    const userReponse = await store.fetchUserDetails();
    store.setUserList(userReponse);
    setUserValues();
});

function setUserValues() {
    store.userList.forEach((value) => {
        userOptions.value.push({name: value.name, id: value._id});
        userOptions.value.push({name: value.rollNumber, id: value._id});
    })
}

async function sendNotification(notificationContent) {
    if(!userValues.value.id) {
        swal("Oops!", "Select an user!", "error");
        return;
    }
    let notificationCreatePayload = {
        "userId" : userValues?.value?.id ,
        "description" : notificationContent
    };
    const response = await courseDeliveryStore.sendNotificaion(notificationCreatePayload);
    if (response._id == notificationCreatePayload.userId || response.userId !== null) {
        swal("Success!", "notification sent successfully", "success");
    }
    else {
        swal("Oops!", "notification failed!", "error");
    }
}

</script>
<style>
.memo-container {
    margin: 30px;
    color: black
}

.send-notification-container {
    margin-bottom: 10px;
}

.send_button {
  text-align: center;
  display: inline-block;
  background-color: #166df7;
  color: white;
}

.margin-top {
    margin-top: 10px;
}
</style>