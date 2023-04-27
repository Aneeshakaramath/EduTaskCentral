<template>
    <div>
        <div v-if="isViewingMyCourse" class="send-notification-container boldText">
            <div>
                <label class="typo__label boldText">Select an user to send notification</label>
                <VueMultiselect
                        v-model="userValues" placeholder="Search an User" label="name" track-by="id"
                        :options="userOptions" :multiple="false" :taggable="false">
                </VueMultiselect>
            </div>
            <div class="align-center boldText">
                <button type="submit" class="btn btn-default button-add-course boldText" @click="sendNotification">Send</button>
            </div>
        </div>
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
            <!-- Module Count Input -->
            <div class="form-group boldText">
                <input id="form1Example2" class="form-control boldText" v-model="moduleCount" disabled />
                <label class="form-label boldText" for="form1Example2">No Of Modules</label>
            </div>

            <div v-for="moduleData in ModulesData">
                <div class="module-card boldText">
                    <!-- Module Number -->
                    <div class="form-group boldText">
                        <input id="form1Example2" class="form-control boldText" v-model="moduleData.moduleNumber" disabled />
                        <label class="form-label boldText" for="form1Example2">ModuleNumber</label>
                    </div>

                    <!-- Module Name -->
                    <div class="form-group">
                        <input id="form1Example2" class="form-control boldText" v-model="moduleData.moduleName" disabled />
                        <label class="form-label boldText" for="form1Example2">Module Name</label>
                    </div>

                    <!-- Module Number -->
                    <div class="form-group">
                        <input id="form1Example2" class="form-control boldText" v-model="moduleData.NoOfHours" disabled />
                        <label class="form-label boldText" for="form1Example2">No Of Classes Required</label>
                    </div>

                    <!-- Module Number -->
                    <div class="form-group">
                        <input id="form1Example2" class="form-control boldText" v-model="moduleData.NoOfClassesRequired" disabled />
                        <label class="form-label boldText" for="form1Example2">No Of Days Required</label>
                    </div>
                </div>
            </div>

            <!-- Document Input -->
            <div class="form-group drive-link">
                <input id="form1Example2" class="form-control boldText" v-model="documentDetails" disabled />
                <label class="form-label boldText" for="form1Example2">Drive Link for materials</label>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from '@/stores/User';
import { useCourseDeliveryStore } from '@/stores/CourseDelivery';
import { computed } from "@vue/reactivity";
import { onBeforeMount, ref } from 'vue';
import VueMultiselect from 'vue-multiselect';
import swal from 'sweetalert';

const store = useUserStore();

let userValues = ref([]);
let userOptions = ref([]);

onBeforeMount(async()=> {
    const userReponse = await store.fetchUserDetails();
    store.setUserList(userReponse);
    setUserValues();
});

async function search() {
    if(userValues.value.id) {
        const response = await store.getCourseByUserId(userValues.value.id);
        store.setCourses(response);
        isLoaded.value = true;
    }
}

function setUserValues() {
    store.userList.forEach((value) => {
        userOptions.value.push({name: value.name, id: value._id});
        userOptions.value.push({name: value.rollNumber, id: value._id});
    })
}

const courseDeliveryStore = useCourseDeliveryStore();

const courseName = computed(() => {
    return courseDeliveryStore.courseName;
})

const moduleCount = computed(() => {
    return ((JSON.parse(JSON.stringify(courseDeliveryStore.overALLPlanById))))[0].moduleDetails.length;
})

const isViewingMyCourse = computed(() => {
    return courseDeliveryStore.isViewingMyCourse;
})

const documentDetails = computed(() => {
    return ((JSON.parse(JSON.stringify(courseDeliveryStore.overALLPlanById))))[0].driveLinkForMaterials;
})

const ModulesData = computed(() => {
    return ((JSON.parse(JSON.stringify(courseDeliveryStore.overALLPlanById))))[0].moduleDetails;
})

async function sendNotification() {
    if(!userValues.value.id) {
        swal("Oops!", "Select an user!", "error");
        // alert('select an user');
        return;
    }
    let descriptionNotificaiton = `over all plan details has been submitted for ${courseDeliveryStore.courseName} by ${store.userData.userDetails.name}`;
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

.send-notification-container {
    margin-bottom: 10px;
}
</style>