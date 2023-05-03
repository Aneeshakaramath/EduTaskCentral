<template>
    <div class="question-paper-form-container boldText">
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
        <div class="add-over-all-plan-form-container boldText">
            <form @submit.prevent="addQuestionPaper">
                <!-- Semester -->
                <div class="mb-3">
                    <label class="form-label boldText" for="semester">Semester</label>
                    <input type="number" id="semester" class="form-control form-control-sm boldText" v-model="semester"
                        min="1" max="8" required />
                </div>

                <!-- exam date Input -->
                <div class="form-group">
                    <label for="end-date" class="boldText">Exam Date</label>
                    <input class="date-input boldText" type="date" id="end-date" name="end-date" v-model="examDate">
                </div>

                <!-- Session Type -->
                <div class="mb-3">
                    <label class="form-label boldText" for="userTypeId">Session</label>
                    <select class="form-select sessionType" id="userTypeId" v-model="session" required>
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
                        <input type="number" class="form-control" v-model="hours" id="hoursId">
                    </div>
                    <div class="col">
                        <label class="form-label boldText" for="minsId">Mins</label>
                        <input type="number" class="form-control" v-model="mins" id="minsId">
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
                        <button type="button" class="btn btn-outline-primary" @click="addNewRow(partA)">
                            <span class="glyphicon">&#x2b;</span>
                        </button>
                    </div>
                    <div v-for="(questionA, index) in partA">
                        question {{ index + 1 }}
                        <div class="form-row each-question-container">
                            <div class="col boldText">
                                <!--<label class="form-label boldText" for="question">Question</label>-->
                                <input type="text" class="form-control boldText" placeholder="question"
                                    v-model="questionA.question" id="question" required>
                            </div>
                            <div class="col boldText align-center">
                                <!--<label class="form-label boldText" for="BT">BT</label>-->
                                <select class="form-select" id="BT" v-model="questionA.bt" required>
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
                                <select class="form-select" id="CO" v-model="questionA.couseOutcome" required>
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
                                <input id="marks" type="number" placeholder="marks" class="form-control boldText"
                                    v-model="questionA.marks" required />
                            </div>

                            <div class="col boldText">
                                <button type="button" class="btn btn-outline-primary" @click="removeRow(partA, index)">
                                    delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Part B -->
                <div class="part-container">

                    <div class="boldText">
                        Part B
                        <button type="button" class="btn btn-outline-primary" @click="addNewEntry(partB)">
                            <span class="glyphicon">&#x2b;</span>
                        </button>
                    </div>
                    <div v-for="(questionB, index) in partB">
                        question {{ index + 1 }}
                        <button type="button" class="btn btn-outline-primary" @click="addNewRow(questionB)">
                            <span class="glyphicon">&#x2b;</span>
                        </button>

                        <button type="button" class="btn btn-outline-primary" @click="removeRow(partB, index)">
                            delete
                        </button>

                        <div v-for="(subQuestionB, subQuestionindex) in questionB">
                            {{ (subQuestionindex + 10).toString(36) }}
                            <div class="form-row each-question-container">
                                <div class="col boldText">
                                    <!--<label class="form-label boldText" for="question">Question</label>-->
                                    <input type="text" class="form-control boldText" placeholder="question"
                                        v-model="subQuestionB.question" id="question" required>
                                </div>
                                <div class="col boldText align-center">
                                    <!--<label class="form-label boldText" for="BT">BT</label>-->
                                    <select class="form-select" id="BT" v-model="subQuestionB.bt" required>
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
                                    <select class="form-select" id="CO" v-model="subQuestionB.couseOutcome" required>
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
                                    <input id="marks" type="number" placeholder="marks" class="form-control boldText"
                                        v-model="subQuestionB.marks" required />
                                </div>

                                <div class="col boldText" v-if="questionB.length > 1">
                                    <button type="button" class="btn btn-outline-primary"
                                        @click="removeRow(questionB, subQuestionindex)">
                                        delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Part C -->
                <div class="part-container">
                    <div class="boldText">
                        Part C
                        <button type="button" class="btn btn-outline-primary" @click="addNewEntry(partC)">
                            <span class="glyphicon">&#x2b;</span>
                        </button>
                    </div>
                    <div v-for="(questionC, index) in partC">
                        question {{ index + 1 }}
                        <button type="button" class="btn btn-outline-primary" @click="addNewRow(questionC)">
                            <span class="glyphicon">&#x2b;</span>
                        </button>

                        <button type="button" class="btn btn-outline-primary" @click="removeRow(partC, index)">
                            delete
                        </button>

                        <div v-for="(subQuestionC, subQuestionindex) in questionC">
                            {{ (subQuestionindex + 10).toString(36) }}
                            <div class="form-row each-question-container">
                                <div class="col boldText">
                                    <!--<label class="form-label boldText" for="question">Question</label>-->
                                    <input type="text" class="form-control boldText" placeholder="question"
                                        v-model="subQuestionC.question" id="question" required>
                                </div>
                                <div class="col boldText align-center">
                                    <!--<label class="form-label boldText" for="BT">BT</label>-->
                                    <select class="form-select" id="BT" v-model="subQuestionC.bt" required>
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
                                    <select class="form-select" id="CO" v-model="subQuestionC.couseOutcome" required>
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
                                    <input id="marks" type="number" placeholder="marks" class="form-control boldText"
                                        v-model="subQuestionC.marks" required />
                                </div>

                                <div class="col boldText" v-if="questionC.length > 1">
                                    <button type="button" class="btn btn-outline-primary"
                                        @click="removeRow(questionC, subQuestionindex)">
                                        delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="align-center boldText">
                    <button type="submit" class="btn btn-default button-add-course boldText">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { useCourseDeliveryStore } from '@/stores/CourseDelivery';
import { useQuestionPaperStore } from '@/stores/QuestionPaper';
import { onBeforeMount, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import swal from 'sweetalert';

const store = useUserStore();
const courseDeliveryStore = useCourseDeliveryStore();
const questionPaperStore = useQuestionPaperStore();
const router = useRouter();

const semester = ref('');
const examDate = ref('');
const session = ref('');
const hours = ref(0);
const mins = ref(0);
const partA = ref([]);
const partB = ref([]);
const partC = ref([]);

function addNewRow(arrayName) {
    arrayName.push({
        question: '',
        bt: 'select-one',
        couseOutcome: 'select-one',
        marks: ''
    })
};

function addNewEntry(arrayName) {
    arrayName.push([{
        question: '',
        bt: 'select-one',
        CO: 'select-one',
        marks: ''
    }])
}

function removeRow(arrayName, index) {
    console.log(arrayName);
    arrayName.splice(index, 1);
}
const courseName = computed(() => {
    return courseDeliveryStore.courseName;
})

const examType = computed(() => {
    return questionPaperStore.examType;
})

const totalMarks = computed(() => {
    let total = 0;

    partA.value.forEach((value) => {
        if (value.marks && value.marks > 0) {
            total += value.marks;
        }
    });

    partB.value.forEach((partBSubQuestion) => {
        partBSubQuestion.forEach((value) => {
            if (value.marks && value.marks > 0) {
                total += value.marks;
            }
        });
    });

    partC.value.forEach((partBSubQuestion) => {
        partBSubQuestion.forEach((value) => {
            if (value.marks && value.marks > 0) {
                total += value.marks;
            }
        });
    });

    return total;
})
async function addQuestionPaper() {

    let examDateFromForm = new Date(examDate.value);

    let questionPaperPayload = {
        courseId : courseDeliveryStore.selectedCourseId,
        createdBy : store.userData?.userDetails.id,
        examType: questionPaperStore.examType,
        session : session.value,
        semester: semester.value,
        examDate: formatDate(examDateFromForm),
        duration: {
            hours: hours.value,
            mins: mins.value
        },
        totalMarks: totalMarks.value,
        partA: partA.value,
        partB: partB.value,
        partC: partC.value
    }
    const response = await questionPaperStore.addQuestionpaper(JSON.parse(JSON.stringify(questionPaperPayload)));
    if(response.courseId == questionPaperPayload.courseId || response.courseId!=null) {
        swal("Success!", "question paper added successfully", "success");
        // alert('task added successfully');
        /*let userDataRefresh = await store.fetchUserData();
        store.setUserData(userDataRefresh);*/
    } else {
        swal("Oops!", "question Paper Submission Failed", "error");
    }
}

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

.sessionType {
    margin: 15px;
}

.part-container {
    margin-top: 10px;
    margin-bottom: 10px;
}

.each-question-container {
    margin-top: 10px;
}</style>