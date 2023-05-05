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
        <form class="margin-top" @submit.prevent="addCatMarks">
            <div class="row">
                <div class="col heading">
                    <div class="row">
                        <div class="col heading boldText">
                            CAT Weightage
                        </div>
                        <div class="col boldText">
                            <input type="text" class="form-control boldText" v-model="catWeightage" id="question" required>
                        </div>
                    </div>
                </div>
                <div class="col heading">
                    <div class="row">
                        <div class="col heading boldText">
                            Assignment Weightage
                        </div>
                        <div class="col boldText">
                            <input type="text" class="form-control boldText" v-model="assignmentWeightage" id="question"
                                disabled>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-outline-primary op" @click="addNewRow()">
                <span class="glyphicon">&#x2b;</span>
            </button>
            <table class="table boldText margin-top">
                <thead class="boldText">
                    <tr>
                        <th scope="col" class="boldText">S.No</th>
                        <th scope="col" class="boldText">Name</th>
                        <th scope="col" class="boldText">Cat Marks</th>
                        <th scope="col" class="boldText">Cat converted</th>
                        <th scope="col" class="boldText">Assignment</th>
                        <th scope="col" class="boldText">Total</th>
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
                            <input type="text" class="form-control boldText" v-model="mark.catMarks" min="0" required>
                        </td>
                        <td class="boldText">
                            <input type="text" class="form-control boldText" :value="catConverted(mark.catMarks)" min="0" disabled>
                        </td>
                        <td class="boldText">
                            <input type="text" class="form-control boldText" v-model="mark.assignmentMarks" min="0" required>
                        </td>
                        <td class="boldText">
                            <input type="text" class="form-control boldText" :value="getTotal(mark.catMarks,mark.assignmentMarks)" min="0" disabled>
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


const catWeightage = ref(60);
const marksArray = ref([]);

const examType = computed(() => {
    return questionPaperStore?.examType;
})

const courseName = computed(() => {
    return courseDeliveryStore.courseName;
})

function catConverted(catMarks) {
    if(catWeightage.value > 0 && catMarks)
        return ((catMarks/50)*catWeightage.value).toFixed(2);
    return "0";
};

function getTotal(catMarks, assignmentMarks) {
    return (parseFloat(catConverted(catMarks)) + (parseFloat(assignmentMarks)||0)).toFixed(2);
}
const assignmentWeightage = computed(() => {
    return 100 - catWeightage.value;
})

function addNewRow() {
    marksArray.value.push(
        {
            name: "",
            catMarks: "",
            assignmentMarks: "",
        }
    )
}

function removeRow(arrayName, index) {
    console.log(arrayName);
    arrayName.splice(index, 1);
}

async function addCatMarks() {
    let addMarksPayload = {
        catMarksId: questionPaperStore?.catMarksById[0]?._id,
        catWeightage: catWeightage.value,
        marks: getMarksPayload(marksArray.value)
    }
    console.log(JSON.stringify(addMarksPayload))
    const response = await questionPaperStore.updateCatMarks(JSON.parse(JSON.stringify(addMarksPayload)));
    if(response.catWeightage == addMarksPayload.catWeightage || response.catWeightage !=null) {
        swal("Success!", "cat marks has been updated successfully", "success");
        router.push({ name: 'catMarksDetails'});
    } else {
        swal("Oops!", "cat marks Submission Failed", "error");
    }
}

function getMarksPayload(marksArray) {
    let marksPayload = [];
    marksArray.forEach((element)=> {
        marksPayload.push({
            name: element.name,
            catMarks: parseFloat(element.catMarks),
            catMarksCoverted: parseFloat(catConverted(element.catMarks)),
            assignmentMarks: parseFloat(element.assignmentMarks),
            Total: parseFloat(getTotal(element.catMarks, element.assignmentMarks))
        })
    })
    return marksPayload;
}

onBeforeMount(async()=> {
    catWeightage.value = questionPaperStore?.catMarksById[0]?.catWeightage;
    marksArray.value = questionPaperStore?.catMarksById[0]?.marks;
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