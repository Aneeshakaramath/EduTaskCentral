<template>
    <div class="add-task-form-container boldText" >
        <h1 class="page-heading boldText">Create Task</h1>
        <form @submit.prevent="Submit">
            <!-- number of events -->
            <div class="mb-3 boldText">
                <label class="form-label boldText" for="description">Description</label>
                <input type="text"  id="description" placeholder="Enter the description" class="form-control form-control-sm boldText" v-model="description" required/>
            </div>
            <!-- Task Type -->
            <div class="mb-3 boldText">
                <label class="form-label select-label boldText" for="taskTypeId">Select the task type</label>
                <select class="form-select task-type-select boldText" id="taskTypeId" v-model="taskType" required> 
                    <option v-for="taskType in taskTypes" :value=taskType.code class="boldText">
                        {{ taskType.name.toUpperCase() }}
                    </option>
                </select>
            </div>
            <!-- number of events -->
            <div class="mb-3 boldText">
                <label class="form-label boldText" for="no-of-events">Number of events</label>
                <input type="number"  id="no-of-events" class="form-control form-control-sm boldText" v-model="noOfEvents" min="1" max="15" required/>
            </div>

            <!-- select user-->
            <div class="mb-3">
                <label class="typo__label boldText">Assign to</label>
                <VueMultiselect
                        v-model="userName" placeholder="Search an User" label="name" track-by="id"
                        :options="userOptions" :multiple="false" :taggable="false">
                </VueMultiselect>
            </div>

            <div class="mb-3">
                <label for="start-date" class="boldText">Start Date</label>
                <input class="date-input boldText" type="date" id="start-date" name="start-date" v-model="startDate">
            </div>

            <div class="mb-3">
                <label for="end-date" class="boldText">End Date</label>
                <input class="date-input boldText" type="date" id="end-date" name="end-date" v-model="endDate">
            </div>

            <!-- Submit button -->
            <div class="text-center boldText">
                <button type="submit" class="btn btn-default button-add-task boldText">submit</button>
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { computed, onBeforeMount, ref  } from 'vue'
import VueMultiselect from 'vue-multiselect';
import swal from 'sweetalert';

const store = useUserStore();

let userName =  ref([]);
let description = ref('');
let taskType = ref('')
let noOfEvents = ref(1);
let userOptions = ref([]);
let startDate = ref('');
let endDate = ref('');

onBeforeMount(async()=> {
    const response = await store.fetchTaskType();
    store.setTaskType(response);
    const userReponse = await store.fetchUserDetails();
    store.setUserList(userReponse);
    setUserValues();
});

function setUserValues() {
    store.userList.forEach((value) => {
        userOptions.value.push({name: value.name, id: value._id});
        userOptions.value.push({name: value.rollNumber, id: value._id});
    })
}

const taskTypes = computed(() => {
  return store.taskType;
})

async function Submit() {
    let startDateFromForm = new Date(startDate.value);
    let endDateFromForm = new Date(endDate.value);

  if(validateParamters()) {

    const addTaskDetails : any = {
        assignedTo : userName.value.id,
        assignedBy : store.userData?.userDetails.id,
        description : description.value,
        taskType : taskType.value,
        numberOfEvents : noOfEvents.value.toString(),
        childTaskList : [],
        startDate : formatDate(startDateFromForm), // yy-mm-dd
        endDate : formatDate(endDateFromForm), // yy-mm-dd
        taskStatus : "TO DO"
    }
    console.log(addTaskDetails);
    const response = await store.addNewTask(addTaskDetails);
    if(response.taskType == taskType.value) {
        swal("Success!", "task added successfully", "success");
        // alert('task added successfully');
        let userDataRefresh = await store.fetchUserData();
        store.setUserData(userDataRefresh);
    }
  };
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function validateParamters() {
    if(description.value === '') {
        swal("Oops!", "descirption cannot be empty!", "error");
        // alert('descirption cannot be empty');
        return false;
    }
    if(taskType.value === '') {
        swal("Oops!", "task type cannot be empty", "error");
       //  alert('task type cannot be empty');
        return false;
    }
    if(!userName?.value?.id) {
        swal("Oops!", "you need to select an user to assign the task to", "error");
        // alert('you need to select an user to assign the task to');
        return false;
    }
    if(userName?.value?.id)  {
        console.log(userName?.value?.id);
        let taskPendingForSelectedUser = store.userData.taskAssignedByMe.filter(function(task) {
            return task.assignedTo.id == userName?.value?.id && task.taskStatus!='DONE';
        })
        if(taskPendingForSelectedUser.length >= 5) {
            swal("Oops!", "The selected user has 5 or more task already pending", "error");
            return false;
        }
    }

    return true;
}

</script>
  
<style scoped>
.page-heading {
    font-size: 15px;
}
.add-task-form-container {
    margin: 20px;
    padding: 20px;
}
.task-type-select {
    margin-left: 10px;
}
.button-add-task{
  margin-top: 30px;
  text-align: center;
  display: inline-block;
  background-color: #166df7;
  color: white;
}
.date-input {
    margin-left: 20px;
}
 </style>
  