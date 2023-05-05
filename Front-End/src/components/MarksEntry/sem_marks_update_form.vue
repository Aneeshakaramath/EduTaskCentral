<template>
    <div class="boldText mark-form-container">
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
        <form class="margin-top" @submit.prevent="addSemMarks">
            <button type="button" class="btn btn-outline-primary op" @click="addNewRow()">
                <span class="glyphicon">&#x2b;</span>
            </button>
            <table class="table boldText margin-top">
                <thead class="boldText">
                    <tr>
                        <th scope="col" class="boldText">S.No</th>
                        <th scope="col" class="boldText">Name</th>
                        <th scope="col" class="boldText">Sem Marks(100)</th>
                        <th scope="col" class="boldText">Sem Mark(50)</th>
                        <th scope="col" class="boldText">Cat 1(100)</th>
                        <th scope="col" class="boldText">Cat 2(100)</th>
                        <th scope="col" class="boldText">Total</th>
                        <th scope="col" class="boldText">Grade</th>
                        <th scope="col" class="boldText">#</th>
                    </tr>
                </thead>
                <tbody class="boldText">
                    <tr class="boldText" v-for="(mark, index) in marksArray">
                        <td class="boldText">{{ index + 1 }}</td>
                        <td class="boldText">
                            <input type="text" class="form-control boldText" v-model="mark.name" required>
                        </td>
                        <td class="boldText">
                            <input type="number" class="form-control boldText" v-model="mark.semMarks" min="0" max="100" required>
                        </td>
                        <td class="boldText">
                            <input type="text" class="form-control boldText" :value="semMarksByTwo(mark.semMarks)" min="0" disabled>
                        </td>
                        <td class="boldText">
                            <input type="number" class="form-control boldText" v-model="mark.cat1Marks" min="0" max="100" required>
                        </td>
                        <td class="boldText">
                            <input type="number" class="form-control boldText" v-model="mark.cat2Marks" min="0" max="100" required>
                        </td>
                        <td class="boldText">
                            <input type="text" class="form-control boldText" :value="getTotal(mark.semMarks,mark.cat1Marks,mark.cat2Marks)" min="0" disabled>
                        </td>
                        <td class="boldText">
                            <input type="text" class="form-control boldText" :value="getGrade(mark.semMarks,mark.cat1Marks,mark.cat2Marks)" disabled>
                        </td>
                        <td class="boldText">
                            <button type="button" class="btn btn-outline-primary" @click="removeRow(marksArray, index)">
                                <span class="glyphicon">-</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="align-center boldText">
                <button type="submit" class="btn btn-default button-add-course boldText">Submit</button>
            </div>
        </form>
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
const isLoaded = ref(false);
const router = useRouter();

const marksArray = ref([]);

const examType = computed(() => {
    return questionPaperStore?.examType;
})

const courseName = computed(() => {
    return courseDeliveryStore.courseName;
})


function semMarksByTwo(marks) {
    if(marks>0)
        return (parseFloat(marks)/2).toFixed(2);
    return "0";
}
function getTotal(semMark, cat1, cat2) {
    return ((parseFloat(semMarksByTwo(semMark)) + (parseFloat(cat1 || "0")+parseFloat(cat2 || "0"))/4).toFixed(2));
}

function getGrade(semMark, cat1, cat2) {
    let total = getTotal(semMark, cat1, cat2);
    let numberTotal = parseFloat(total);
    let x ="";
    switch(true) {
        case numberTotal >= 90:
            x="S";
            break;
        case numberTotal >= 80:
            x="A";
            break;
        case numberTotal >= 70:
            x="B";
            break;
        case numberTotal >= 60:
            x="C";
            break;
        case numberTotal >= 50:
            x="D";
            break;
        case numberTotal >= 40:
            x="E";
            break;
        default:
            x="F";
            break;
    }
    return x;
}
function addNewRow() {
    marksArray.value.push(
        {
            name: "",
            semMarks: "",
            cat1Marks: "",
            cat2Marks: "",
        }
    )
}

function removeRow(arrayName, index) {
    console.log(arrayName);
    arrayName.splice(index, 1);
}

async function addSemMarks() {
    let addSemMarksPayload = {
        semMarksById : questionPaperStore?.semMarksById[0]?._id,
        marks: getMarksPayload(marksArray.value)
    }
    console.log(JSON.stringify(addSemMarksPayload))
    const response = await questionPaperStore.updateSemMarks(JSON.parse(JSON.stringify(addSemMarksPayload)));
    if(response.courseId == addSemMarksPayload.courseId || response.courseId!=null) {
        swal("Success!", "Sem marks has been added successfully", "success");
        router.push({ name: 'semMarksDetails'});
    } else {
        swal("Oops!", "cat marks Submission Failed", "error");
    }
}

function getMarksPayload(marksArray) {
    let marksPayload = [];
    marksArray.forEach((element)=> {
        marksPayload.push({
            name: element.name,
            semMarks: parseFloat(element.semMarks),
            cat1Marks: parseFloat(element.cat1Marks),
            cat2Marks: parseFloat(element.cat2Marks),
            Total: getTotal(element.semMarks, element.cat1Marks, element.cat2Marks),
            Grade: getGrade(element.semMarks, element.cat1Marks, element.cat2Marks)
        })
    })
    return marksPayload;
}

onBeforeMount(async()=> {
    marksArray.value = JSON.parse(JSON.stringify(questionPaperStore?.semMarksById[0]?.marks));
});
</script>
<style scoped>
.mark-form-container {
    margin: 30px;
    color: black
}

.margin-top {
    margin-top: 20px;
}
</style>