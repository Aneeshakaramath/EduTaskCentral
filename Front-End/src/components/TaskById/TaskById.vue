<template>
    <div class="task-details-container">
        <p>
            {{ taskById }}
        </p>
        <p>
            {{  newComment }}
        </p>
        <div class="comments-heading-label">

        </div>
        <div class="comments-container">
            <div class="comment-container" v-for="comment in taskById.commentDetails">
                <span> commented By : {{  comment.commentedByName }}</span>
                <textarea class="form-control" :value="comment.description" id="exampleFormControlTextarea1" rows="2" readonly></textarea>
            </div> 
            <div class="comment-container">
                <span> Add New Comments </span>
                <!--<input class="form-control" type="text" v-model="newComment" aria-label="readonly input example">-->
                <textarea class="form-control" v-model="newComment" id="exampleFormControlTextarea1" rows="2">
                </textarea>
                <div class="align-center">
                    <button type="submit" class="btn btn-default add-comments" @click="addComment">Add Comment</button>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../../stores/User';

const route = useRoute();
const router = useRouter();
const store = useUserStore();

let newComment = ref('Add a new Comments');

const taskById = computed(() => {
    let task = null;
    if(store.getTaskAssignedByMe.length>0) {
        let taskById = store.getTaskAssignedByMe.find((item) => {
          return item.id == route.params.taskId;
        });
        if(taskById) {
          return taskById;
        }
    }
    if(store.getTaskAssignedToMe.length>0) {
        let taskById = store.getTaskAssignedToMe.find((item) => {
          return item.id == route.params.taskId;
        });
        if(taskById) {
          return taskById;
        }
    }
    return task;
});

async function addComment() {
    console.log(newComment);
    let commentPayload = {
        taskId : taskById.id,
        description : newComment.value,
        commentedBy : store.userData?.userDetails.id,
    }
    console.log(commentPayload);
    const response = await store.addComments(commentPayload);
    if(response.commentedBy == commentPayload.commentedBy) {
        alert('comment Added');
        newComment.value = '';
    }
}
</script>
  
<style scoped>
.task-details-container{
  margin: 30px;
  color: black
}
.comment-container {
    margin: 10px;
    border: 1px black solid;
    padding: 5px;
}

.add-comments {
    margin: 20px;
    align-content: center;
    background-color: grey;
}
 </style>
  