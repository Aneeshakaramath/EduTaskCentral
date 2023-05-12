<template>
    <div class="comments-heading-label boldText">
            Comments
        </div>
        <div class="comments-container boldText">
            <div class="comment-container boldText" v-if="commentsById.length > 0" v-for="comment in commentsById">
                <span class="boldText"> Commented By : {{  comment.commentedBy.name }}</span>
                <textarea class="form-control boldText" :value="comment.description" id="exampleFormControlTextarea1" rows="2" readonly></textarea>
            </div>
            <div class="comment-container boldText">
                <span class="boldText"> Add New Comments </span>
                <!--<input class="form-control" type="text" v-model="newComment" aria-label="readonly input example">-->
                <textarea class="form-control boldText" v-model="newComment" id="exampleFormControlTextarea1" rows="2">
                </textarea>
                <div class="align-center boldText">
                    <button type="submit" class="btn btn-default add-comments boldText" @click="addComment">Add Comment</button>
                </div>
            </div>
        </div>
</template>
<script setup>
import { useUserStore } from '@/stores/User';
import { onBeforeMount, ref, computed } from 'vue';
import swal from 'sweetalert';
import { useCourseDeliveryStore } from '@/stores/CourseDelivery';
import { useQuestionPaperStore } from '@/stores/QuestionPaper';

const store = useUserStore();
const questionPaperStore = useQuestionPaperStore();
const courseDeliveryStore = useCourseDeliveryStore();

let newComment = ref('');

onBeforeMount(async()=> {
  await questionPaperStore.getCommentsById(questionPaperStore?.questionPaperById[0]?._id, questionPaperStore.examType);
});


const commentsById = computed(() => {
    return questionPaperStore.commentForSelectedQuestion;
})

async function addComment() {
    console.log(newComment);
    let commentPayload = {
        description : newComment.value,
        commentedBy : store.userData?.userDetails.id,
        questionPaperId: questionPaperStore?.questionPaperById[0]?._id,
        examType: questionPaperStore.examType
    }
    console.log(commentPayload);
    const response = await questionPaperStore.addCommentsForQuestionPaper(commentPayload);
    if(response.commentedBy == commentPayload.commentedBy || response.commentedBy) {
        swal("Success!", "comment Added", "success");
        // alert('comment Added');
        newComment.value = '';
        await questionPaperStore.getCommentsById(questionPaperStore?.questionPaperById[0]?._id, questionPaperStore.examType);
    }
}

</script>
<style>
.comments-heading-label {
    font-weight: 700;
    margin-left: 20px;
    margin-top: 30px;
}


.comments-container {
    margin: 10px;
}

.comment-container {
    margin: 10px;
    border: 1px black solid;
    padding: 15px;
}

</style>