<template>
    <div class="boldText mark-data-container" v-if="isLoaded">
        <button type="button" class="btn btn-outline-primary op" @click="navigateToSemUpdateForm()">
            Edit
        </button>          
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
                </tr>
            </thead>
            <tbody class="boldText">
                <tr class="boldText" v-for="(mark, index) in marksArray">
                    <td class="boldText">{{ index + 1 }}</td>
                    <td class="boldText">{{ mark.name }}</td>
                    <td class="boldText">{{ mark.semMarks }}</td>
                    <td class="boldText">{{ (parseFloat(mark.semMarks)/2).toFixed(2) }}</td>
                    <td class="boldText">{{ mark.cat1Marks }}</td>
                    <td class="boldText">{{ mark.cat2Marks }}</td>
                    <td class="boldText">{{ mark.Total }}</td>
                    <td class="boldText">{{ mark.Grade }}</td>
                </tr>
            </tbody>
        </table>
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
import { useRouter } from 'vue-router';

const store = useUserStore();
const courseDeliveryStore = useCourseDeliveryStore();
const questionPaperStore = useQuestionPaperStore();
const isLoaded = ref(false);
const router = useRouter();

const examType = computed(() => {
    return questionPaperStore?.examType;
})

const courseName = computed(() => {
    return courseDeliveryStore.courseName;
})

const marksArray = computed(()=> {
    return questionPaperStore?.semMarksById[0]?.marks;
})

onBeforeMount(async()=> {
  const response = await questionPaperStore.fetchSemMarksById(courseDeliveryStore.selectedCourseId,questionPaperStore.examType);
  if(response.length > 0) {
    questionPaperStore.setSemMarksById(response);
    isLoaded.value = true;
  } else {
    router.push({ name: 'semMarksEntryForm'});
  }
});

function navigateToSemUpdateForm() {
    router.push({ name: 'sem_marks_update_form'});
}
</script>
<style scoped>

.mark-data-container {
    margin: 30px;
    color: black
}

.edit-icon {
    margin-left: 5px;
    width: 15px;
}
.margin-top {
    margin-top: 20px;
}
</style>