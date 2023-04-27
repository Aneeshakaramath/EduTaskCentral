<template>
    <div class="task-details-container boldText">
        <div class="container boldText">
            <div class="row field-row boldText">
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            Name
                        </div>
                        <div class="col boldText">
                            {{ taskById.name }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading">
                            Number Of Events
                        </div>
                        <div class="col boldText">
                            {{ taskById.numberOfEvents }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row field-row boldText">
                <div class="col boldText">
                    <div class="row boldText">
                        <div class="col heading boldText">
                            Description
                        </div>
                        <div class="col boldText">
                            {{ taskById.description }}
                        </div>
                    </div>
                </div>
                <div class="col boldText">
                    <div class="row boldText">
                        <div class="col heading boldText">
                            Start Date
                        </div>
                        <div class="col boldText">
                            {{ taskById.startDate }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row field-row boldText">
                <div class="col boldText">
                    <div class="row boldText">
                        <div class="col heading boldText">
                            End Date
                        </div>
                        <div class="col boldText">
                            {{ taskById.endDate }}
                        </div>
                    </div>
                </div>
                <div class="col boldText">
                    <div class="row boldText">
                        <div class="col heading boldText">
                            Task Status
                        </div>
                        <div class="col boldText">
                           <span v-if="!isEdit" class="boldText"> {{ taskById.taskStatus }} <img @click="() => isEdit=!isEdit" v-if="!(taskById.taskStatus == 'DONE')" class='edit-icon' src="@/assets/images/edit.png"/> </span>
                           <div v-else>
                                <select class="form-select userType boldText" id="userTypeId" v-model="updatedStatus">
                                    <option v-for="status in taskStatus" :value=status class="boldText">
                                        {{ status.toUpperCase() }}
                                    </option>
                                </select>
                                <span>
                                    <img @click="updateTaskStatus" class='edit-icon boldText' src="@/assets/images/tick.png"/>
                                    <img @click="() => isEdit=!isEdit" class='edit-icon boldText' src="@/assets/images/cross.jpg"/>
                                </span>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row field-row">
                <div class="col">
                    <div class="row">
                        <div class="col heading boldText">
                            Assigned By
                        </div>
                        <div class="col boldText">
                            {{ taskById.assignedBy.name }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col heading boldText">
                            Assigned To
                        </div>
                        <div class="col boldText">
                            {{ taskById.assignedTo.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="comments-heading-label boldText"  v-if="commentsById.length > 0 || !(taskById.taskStatus == 'DONE')">
            Comments
        </div>
        <div class="comments-container boldText">
            <div class="comment-container boldText" v-if="commentsById.length > 0" v-for="comment in commentsById">
                <span class="boldText"> Commented By : {{  comment.commentedBy.name }}</span>
                <textarea class="form-control boldText" :value="comment.description" id="exampleFormControlTextarea1" rows="2" readonly></textarea>
            </div>
            <div class="comment-container boldText" v-if="!(taskById.taskStatus == 'DONE')">
                <span class="boldText"> Add New Comments </span>
                <!--<input class="form-control" type="text" v-model="newComment" aria-label="readonly input example">-->
                <textarea class="form-control boldText" v-model="newComment" id="exampleFormControlTextarea1" rows="2">
                </textarea>
                <div class="align-center boldText">
                    <button type="submit" class="btn btn-default add-comments boldText" @click="addComment">Add Comment</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../../stores/User';
import swal from 'sweetalert';

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
        swal("Success!", "comment Added", "success");
        // alert('comment Added');
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

        if(updatedStatus.value == 'DONE') {
            taskUpdatePayload["endDate"] = new Date().toJSON().toString();
        }

        const response = await store.updateTask(taskUpdatePayload);
        if(response._id == route.params.taskId || response._id !== null ) {
            task.taskStatus = updatedStatus.value;
            swal("Success!", "task updated successfully", "success");
            // alert('task updated successfully');
            await store.refreshUserData();
        }
        else {
            swal("Oops!", "task updation failed", "error");
            // alert('task updation failed');
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
    font-size: 20px;
}
.field-row {
    margin-top: 15px;
}

.edit-icon {
    margin-left: 5px;
    width: 15px;
}

.align-right {
    text-align: right;
}
 </style>
  