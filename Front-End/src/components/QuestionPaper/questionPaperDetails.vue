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
            <div class="col">

            </div>
        </div>
        <div class="add-question-paper-form-container boldText">
           
        </div>
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
const router = useRouter();

const courseName = computed(() => {
    return courseDeliveryStore.courseName;
})

async function addQuestionPaper() {
    
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
</style>