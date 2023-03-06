<template>
    <div class="task-details-container">
        <div class="container">
            <div class="row field-row">
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            Name
                        </div>
                        <div class="col">
                            {{ taskById.name }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            number of Events
                        </div>
                        <div class="col">
                            {{ taskById.numberOfEvents }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row field-row">
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            description
                        </div>
                        <div class="col">
                            {{ taskById.description }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            start Date
                        </div>
                        <div class="col">
                            {{ taskById.startDate }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row field-row">
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            description
                        </div>
                        <div class="col">
                            {{ taskById.endDate }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            task Status
                        </div>
                        <div class="col">
                           <span> {{ taskById.taskStatus }}</span>
                           <!--<select class="form-select userType" id="userTypeId" v-model="userType">
                                <option v-for="user in userTypes" :value=user.code>
                                    {{ user.name.toUpperCase() }}
                                </option>
                            </select>-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="row field-row">
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            assigned By
                        </div>
                        <div class="col">
                            {{ taskById.assignedBy.name }}
                        </div>
                    </div>
                </div>
                <div class="col">

                </div>
            </div>
        </div>
        <div class="comments-heading-label">
            Comments
        </div>
        <div class="comments-container">
            <div class="comment-container" v-if="commentsById.length > 0" v-for="comment in commentsById">
                <span> commented By : {{  comment.commentedBy.name }}</span>
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
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../../stores/User';

const route = useRoute();
const router = useRouter();
const store = useUserStore();

let taskStatus = ref(['TO DO', 'IN PROGRESS', 'DONE']);
let newComment = ref('Add a new Comments');

const commentsById = computed(() => {
    return store.commentsById;
})
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
        taskId : route.params.taskId,
        description : newComment.value,
        commentedBy : store.userData?.userDetails.id,
    }
    console.log(commentPayload);
    const response = await store.addComments(commentPayload);
    if(response.commentedBy == commentPayload.commentedBy) {
        alert('comment Added');
        newComment.value = '';
        await store.getCommentsById(route.params.taskId);
    }
}

onBeforeMount(async()=> {
  await store.getCommentsById(route.params.taskId);
});

</script>
  
<style scoped>
.container {
    margin: 5px;
}
.task-details-container{
  margin: 30px;
  color: black
}
.comment-container {
    margin: 10px;
    border: 1px black solid;
    padding: 15px;
}

.add-comments {
    margin: 20px;
    align-content: center;
    background-color: lightskyblue;
}

.comments-heading-label {
    font-weight: 700;
    margin-left: 20px;
    margin-top: 30px;
}

.comments-container {
    margin: 10px;
}

.heading {
    font-weight: 700;
}
.field-row {
    margin-top: 15px;
}
 </style>
  