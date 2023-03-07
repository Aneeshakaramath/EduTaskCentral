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
                           <span v-if="!isEdit"> {{ taskById.taskStatus }} <img @click="() => isEdit=!isEdit" class='edit-icon' src="@/assets/images/edit.png"/> </span>
                           <div v-else>
                                <select class="form-select userType" id="userTypeId" v-model="updatedStatus">
                                    <option v-for="status in taskStatus" :value=status>
                                        {{ status.toUpperCase() }}
                                    </option>
                                </select>
                                <span>
                                    <img @click="updateTaskStatus" class='edit-icon' src="@/assets/images/tick.png"/>
                                    <img @click="() => isEdit=!isEdit" class='edit-icon' src="@/assets/images/cross.jpg"/>
                                </span>
                           </div>
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
const store = useUserStore();

const taskStatus = ['TO DO', 'IN PROGRESS', 'DONE'];
let newComment = ref('Add a new Comments');
let isEdit = ref(false);

let updatedStatus =  ref('');

const commentsById = computed(() => {
    return store.commentsById;
})
const taskById = computed(() => {
    return getTaskByTaskId(null);
});

function getTaskByTaskId(task) {
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
}
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

async function updateTaskStatus() {
    if(updatedStatus.value !== '') {
        let task = getTaskByTaskId(null);
        
        let taskUpdatePayload: any = {
            "taskId" : route.params.taskId,
            "taskStatus" : updatedStatus.value
        }
        const response = await store.updateTask(taskUpdatePayload);
        if(response._id == route.params.taskId || response._id !== null ) {
            task.taskStatus = updatedStatus.value;
            alert('task updated successfully')
        }
        else {
            alert('task updation failed');
        }
        isEdit.value = false;
    }
}
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

.edit-icon {
    margin-left: 5px;
    width: 15px;
}
 </style>
  