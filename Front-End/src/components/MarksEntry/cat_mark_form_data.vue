<template>
    <div class="boldText mark-data-container" v-if="isLoaded">
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
        <div class="row">
            <div class="col heading">
                <div class="row">
                    <div class="col heading boldText">
                        CAT Weightage
                    </div>
                    <div class="col boldText">
                        {{ catWeightage }}
                    </div>
                </div>
            </div>
            <div class="col heading">
                <div class="row">
                    <div class="col heading boldText">
                        Assignment Weightage
                    </div>
                    <div class="col boldText">
                        {{ 100 - catWeightage }}
                    </div>
                </div>
            </div>
        </div>
        <table class="table boldText margin-top">
            <thead class="boldText">
                <tr>
                    <th scope="col" class="boldText">S.No</th>
                    <th scope="col" class="boldText">Name</th>
                    <th scope="col" class="boldText">Cat Marks</th>
                    <th scope="col" class="boldText">Cat converted</th>
                    <th scope="col" class="boldText">Assignment</th>
                    <th scope="col" class="boldText">Total</th>
                </tr>
            </thead>
            <tbody class="boldText">
                <tr class="boldText" v-for="(mark, index) in marksArray">
                    <td class="boldText">{{ index + 1 }}</td>
                    <td class="boldText">{{ mark.name }}</td>
                    <td class="boldText">{{ mark.catMarks }}</td>
                    <td class="boldText">{{ mark.catMarksCoverted }}</td>
                    <td class="boldText">{{ mark.assignmentMarks }}</td>
                    <td class="boldText">{{ mark.Total }}</td>
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


const marksById = computed(()=> {
    return questionPaperStore.catMarksById
})

const examType = computed(() => {
    return questionPaperStore?.examType;
})

const courseName = computed(() => {
    return courseDeliveryStore.courseName;
})

const catWeightage = computed(()=> {
    return questionPaperStore?.catMarksById[0]?.catWeightage;
})

const marksArray = computed(()=> {
    return questionPaperStore?.catMarksById[0]?.marks;
})

onBeforeMount(async()=> {
  const response = await questionPaperStore.fetchCatMarksById(courseDeliveryStore.selectedCourseId,questionPaperStore.examType);
  console.log("Entered")
  if(response.length > 0) {
    questionPaperStore.setCatMarksById(response);
    isLoaded.value = true;
  } else {
    router.push({ name: 'catMarkEntryForm'});
  }
});

</script>
<style scoped>

.mark-data-container {
    margin: 30px;
    color: black
}

.margin-top {
    margin-top: 20px;
}
</style>