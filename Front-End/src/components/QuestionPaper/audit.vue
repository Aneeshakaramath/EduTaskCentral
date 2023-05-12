<template>
    <div class="audit-question-paper-container boldText">
        <div>
            <label class="typo__label boldText margin-top">Select an user to search course details</label>
            <VueMultiselect
                    v-model="userValues" placeholder="Search an User" label="name" track-by="id"
                    :options="userOptions" :multiple="false" :taggable="false">
            </VueMultiselect>
        </div>
        <div class="align-center">
            <button type="submit" class="btn btn-default button-add-course boldText" @click="search">Search</button>
        </div>
        <div v-if="isLoaded">
          <div v-if="courseDetails.length > 0" class="course-details">
                <div class="col-sm course-name boldText" v-for="(courseDetail,index) in courseDetails" :key="courseDetail.name">
                    {{ courseDetail.code }} | {{  courseDetail.name }}
                    <div class="dropdown course-action boldText">
                    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split dropdown-course boldText" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu boldText" aria-labelledby="dropdownMenuButton">
                        <button class="dropdown-item boldText" @click="getQuestionPaperById('CAT_1', courseDetail)">CAT 1</button>
                        <button class="dropdown-item boldText" @click="getQuestionPaperById('CAT_2', courseDetail)">CAT 2</button>
                        <button class="dropdown-item boldText" @click="getQuestionPaperById('SEM', courseDetail)">End Sem</button>
                    </div>
                </div>
                </div>
          </div>
          <div v-else class="boldText">
                No Course Added Yet
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { onBeforeMount, ref, computed } from 'vue';
import VueMultiselect from 'vue-multiselect';
import swal from 'sweetalert';
import { useCourseDeliveryStore } from '@/stores/CourseDelivery';
import { useQuestionPaperStore } from '@/stores/QuestionPaper';
import { useRouter } from 'vue-router';

const store = useUserStore();
const courseDeliveryStore = useCourseDeliveryStore();
const router = useRouter();

const isLoaded = ref(false);
let userValues = ref([]);
let userOptions = ref([]);
const questionPaperStore = useQuestionPaperStore();

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
    } else {
        swal("Oops!", "Select an user!", "error");
        // alert('select an user');
    }
}

function setUserValues() {
    store.userList.forEach((value) => {
        userOptions.value.push({name: value.name, id: value._id});
        userOptions.value.push({name: value.rollNumber, id: value._id});
    })
}

async function getQuestionPaperById(examType, courseDetail) {
  const response = await questionPaperStore.fetchQuestionPaperByid(courseDetail._id,examType);
  if(response.length > 0) {
    courseDeliveryStore.setCourseDetail(courseDetail);
    courseDeliveryStore.setCourseName(courseDetail.name);
    courseDeliveryStore.setSelectedCourseId(courseDetail._id);
    courseDeliveryStore.setSelectedUserId(courseDetail.createdBy._id);
    questionPaperStore.setExamType(examType);
    router.push({ name: 'questionPaperDetails'});
  } else {
    swal("Oops!", "question Paper is Not Available", "error");
  }
}
const courseDetails = computed(() => {
    return store.courses;
})

</script>
<style scoped>

.audit-question-paper-container {
  margin: 30px;
  color: black
}
</style>