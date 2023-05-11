<template>
    <div class="question-paper-form-container boldText" v-if="isLoaded">
        <button @click="downloadStudentQuestionPaper(false)" class="btn btn-default button-download boldText">download student question paper</button>
        <button @click="downloadStudentQuestionPaper(true)" class="btn btn-default button-download boldText">download audit version</button>
        <div class="send-notification-container boldText">
            <div>
                <label class="typo__label boldText">Select an user to send notification</label>
                <VueMultiselect v-model="userValues" placeholder="Search an User" label="name" track-by="id"
                    :options="userOptions" :multiple="false" :taggable="false">
                </VueMultiselect>
            </div>
            <div class="align-center">
                <button type="submit" class="btn btn-default button-add-course boldText"
                    @click="sendNotification">Send</button>
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
            <div class="col heading">
                <div class="row">
                    <div class="col heading boldText">
                        Exam Type
                    </div>
                    <div class="col boldText">
                        {{ examType }}
                    </div>
                </div>
            </div>
        </div>
        <div class="add-question-paper-form-container boldText">
            <div>
                <!-- Semester -->
                <div class="mb-3">
                    <label class="form-label boldText" for="semester">Semester</label>
                    <input type="number" id="semester" class="form-control form-control-sm boldText" v-model="semester"
                        disabled />
                </div>

                <!-- exam date Input -->
                <div class="form-group">
                    <label for="end-date" class="boldText">Exam Date</label>
                    <input class="date-input boldText" type="text" id="end-date" name="end-date" v-model="examDate"
                        disabled>
                </div>

                <!-- Session Type -->
                <div class="mb-3">
                    <label class="form-label boldText" for="userTypeId">Session</label>
                    <select class="form-select sessionType" id="userTypeId" v-model="session" disabled>
                        <option value="FN">FN</option>
                        <option value="AN">AN</option>
                    </select>
                </div>

                <!-- Duration -->
                <div class="boldText">
                    Duration
                </div>
                <div class="form-row">
                    <div class="col">
                        <label class="form-label boldText" for="hoursId">hours</label>
                        <input type="number" class="form-control" v-model="hours" id="hoursId" disabled>
                    </div>
                    <div class="col">
                        <label class="form-label boldText" for="minsId">Mins</label>
                        <input type="number" class="form-control" v-model="mins" id="minsId" disabled>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label boldText" for="total">Total marks</label>
                    <input type="number" id="total" class="form-control form-control-sm boldText" v-model="totalMarks"
                        disabled />
                </div>

                <!-- Part A -->
                <div class="part-container">
                    <div class="boldText">
                        Part A
                    </div>
                    <div v-for="(questionA, index) in partA">
                        question {{ index + 1 }}
                        <div class="form-row each-question-container">
                            <div class="col boldText">
                                <!--<label class="form-label boldText" for="question">Question</label>-->
                                <input type="text" class="form-control boldText" v-model="questionA.question" id="question"
                                    disabled>
                            </div>
                            <div class="col boldText align-center">
                                <!--<label class="form-label boldText" for="BT">BT</label>-->
                                <select class="form-select" id="BT" v-model="questionA.bt" disabled>
                                    <option value="remember" class="boldText">remember</option>
                                    <option value="understand" class="boldText">understand</option>
                                    <option value="apply" class="boldText">apply</option>
                                    <option value="analyze" class="boldText">analyze</option>
                                    <option value="evaluate" class="boldText">evaluate</option>
                                    <option value="create" class="boldText">create</option>
                                </select>
                            </div>
                            <div class="col boldText align-center">
                                <!--<label class="form-label boldText" for="CO">CO</label>-->
                                <select class="form-select" id="CO" v-model="questionA.couseOutcome" disabled>
                                    <option value="CO1" class="boldText">CO1</option>
                                    <option value="CO2" class="boldText">CO2</option>
                                    <option value="CO3" class="boldText">CO3</option>
                                    <option value="CO4" class="boldText">CO4</option>
                                    <option value="CO5" class="boldText">CO5</option>
                                    <option value="CO6" class="boldText">CO6</option>
                                </select>
                            </div>
                            <div class="col boldText">
                                <!--<label class="form-label boldText" for="Marks">Marks</label>-->
                                <input id="marks" type="number" class="form-control boldText" v-model="questionA.marks"
                                    disabled />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Part B -->
                <div class="part-container">
                    <div class="boldText">
                        Part B
                    </div>
                    <div v-for="(questionB, index) in partB">
                        question {{ index + 1 }}
                        <div v-for="(subQuestionB, subQuestionindex) in questionB.questions">
                            {{ (subQuestionindex + 10).toString(36) }}
                            <div class="form-row each-question-container">
                                <div class="col boldText">
                                    <!--<label class="form-label boldText" for="question">Question</label>-->
                                    <input type="text" class="form-control boldText" v-model="subQuestionB.question"
                                        id="question" disabled>
                                </div>
                                <div class="col boldText align-center">
                                    <!--<label class="form-label boldText" for="BT">BT</label>-->
                                    <select class="form-select" id="BT" v-model="subQuestionB.bt" disabled>
                                        <option value="select-one" selected class="boldText">BT</option>
                                        <option value="remember" class="boldText">remember</option>
                                        <option value="understand" class="boldText">understand</option>
                                        <option value="apply" class="boldText">apply</option>
                                        <option value="analyze" class="boldText">analyze</option>
                                        <option value="evaluate" class="boldText">evaluate</option>
                                        <option value="create" class="boldText">create</option>
                                    </select>
                                </div>
                                <div class="col boldText align-center">
                                    <!--<label class="form-label boldText" for="CO">CO</label>-->
                                    <select class="form-select" id="CO" v-model="subQuestionB.couseOutcome" disabled>
                                        <option value="select-one" selected class="boldText">CO</option>
                                        <option value="CO1" class="boldText">CO1</option>
                                        <option value="CO2" class="boldText">CO2</option>
                                        <option value="CO3" class="boldText">CO3</option>
                                        <option value="CO4" class="boldText">CO4</option>
                                        <option value="CO5" class="boldText">CO5</option>
                                        <option value="CO6" class="boldText">CO6</option>
                                    </select>
                                </div>
                                <div class="col boldText">
                                    <!--<label class="form-label boldText" for="Marks">Marks</label>-->
                                    <input id="marks" type="number" class="form-control boldText"
                                        v-model="subQuestionB.marks" disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Part C -->
                <div class="part-container">
                    <div class="boldText">
                        Part C
                    </div>
                    <div v-for="(questionC, index) in partC">
                        question {{ index + 1 }}
                        <div v-for="(subQuestionC, subQuestionindex) in questionC.questions">
                            {{ (subQuestionindex + 10).toString(36) }}
                            <div class="form-row each-question-container">
                                <div class="col boldText">
                                    <!--<label class="form-label boldText" for="question">Question</label>-->
                                    <input type="text" class="form-control boldText" v-model="subQuestionC.question"
                                        id="question" disabled>
                                </div>
                                <div class="col boldText align-center">
                                    <!--<label class="form-label boldText" for="BT">BT</label>-->
                                    <select class="form-select" id="BT" v-model="subQuestionC.bt" disabled>
                                        <option value="remember" class="boldText">remember</option>
                                        <option value="understand" class="boldText">understand</option>
                                        <option value="apply" class="boldText">apply</option>
                                        <option value="analyze" class="boldText">analyze</option>
                                        <option value="evaluate" class="boldText">evaluate</option>
                                        <option value="create" class="boldText">create</option>
                                    </select>
                                </div>
                                <div class="col boldText align-center">
                                    <!--<label class="form-label boldText" for="CO">CO</label>-->
                                    <select class="form-select" id="CO" v-model="subQuestionC.couseOutcome" disabled>
                                        <option value="CO1" class="boldText">CO1</option>
                                        <option value="CO2" class="boldText">CO2</option>
                                        <option value="CO3" class="boldText">CO3</option>
                                        <option value="CO4" class="boldText">CO4</option>
                                        <option value="CO5" class="boldText">CO5</option>
                                        <option value="CO6" class="boldText">CO6</option>
                                    </select>
                                </div>
                                <div class="col boldText">
                                    <!--<label class="form-label boldText" for="Marks">Marks</label>-->
                                    <input id="marks" type="number" class="form-control boldText"
                                        v-model="subQuestionC.marks" disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="spinner-border" v-else role="status">
        <span class="visually-hidden"></span>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { useCourseDeliveryStore } from '@/stores/CourseDelivery';
import { useQuestionPaperStore } from '@/stores/QuestionPaper';
import { onBeforeMount, ref, computed } from 'vue';
import VueMultiselect from 'vue-multiselect';
import { useRouter } from 'vue-router';
import swal from 'sweetalert';
import printPdf from '@/Util/createPrintablePdf';

const store = useUserStore();
const courseDeliveryStore = useCourseDeliveryStore();
const questionPaperStore = useQuestionPaperStore();
const router = useRouter();
const isLoaded = ref(false);
let userValues = ref([]);
let userOptions = ref([]);


const courseName = computed(() => {
    return courseDeliveryStore.courseName;
})


onBeforeMount(async () => {
    const response = await questionPaperStore.fetchQuestionPaperByid(courseDeliveryStore.selectedCourseId, questionPaperStore.examType);
    if (response.length > 0) {
        questionPaperStore.setQuestionPaperById(response);
        isLoaded.value = true;
    } else {
        router.push({ name: 'questionPaperForm' });
    }

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

const semester = computed(() => {
    return questionPaperStore?.questionPaperById[0]?.semester;
});

const examDate = computed(() => {
    return questionPaperStore?.questionPaperById[0]?.examDate;
});

const session = computed(() => {
    return questionPaperStore?.questionPaperById[0]?.session;
});
const hours = computed(() => {
    return questionPaperStore?.questionPaperById[0]?.duration.hours;
});
const mins = computed(() => {
    return questionPaperStore?.questionPaperById[0]?.duration.mins;
});
const totalMarks = computed(() => {
    return questionPaperStore?.questionPaperById[0]?.totalMarks;
});
const partA = computed(() => {
    return questionPaperStore?.questionPaperById[0]?.partA;
});

const partB = computed(() => {
    return questionPaperStore?.questionPaperById[0]?.partB;
});

const partC = computed(() => {
    return questionPaperStore?.questionPaperById[0]?.partC;
});
const examType = computed(() => {
    return questionPaperStore?.examType;
})

async function sendNotification() {
    if(!userValues.value.id) {
        swal("Oops!", "Select an user!", "error");
        // alert('select an user');
        return;
    }
    let descriptionNotificaiton = `${examType.value} question paper for the course ${courseDeliveryStore.courseName} was submitted by ${store.userData.userDetails.name}`;
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

function downloadStudentQuestionPaper(isBTVersion) {
    printPdf(questionPaperStore?.questionPaperById[0], courseDeliveryStore.courseDetail, isBTVersion)
}

</script>
<style scoped>
.question-paper-form-container {
    margin: 30px;
    color: black
}

.add-over-all-plan-form-container {
    margin-top: 20px;
    margin-bottom: 20px;
}

.question-paper-form-container {
    margin: 30px;
    color: black
}

.add-over-all-plan-form-container {
    margin-top: 20px;
    margin-bottom: 20px;
}

.sessionType {
    margin: 15px;
}

.part-container {
    margin-top: 10px;
    margin-bottom: 10px;
}

.each-question-container {
    margin-top: 10px;
}

.send-notification-container {
    margin-bottom: 10px;
}

.button-download {
    margin: 10px;
    text-align: center;
    display: inline-block;
    background-color: #166df7;
    color: white;
}
</style>