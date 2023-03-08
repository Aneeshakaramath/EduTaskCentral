<template>
    <div class="add-task-form-container">
        <h1 class="page-heading">Create Task</h1>
        <form @submit.prevent="Submit">
            <!-- number of events -->
            <div class="mb-3">
                <label class="form-label" for="description">Description</label>
                <input type="text"  id="description" placeholder="Enter the description" class="form-control form-control-sm" v-model="description" required/>
            </div>
            <!-- Task Type -->
            <div class="mb-3">
                <label class="form-label select-label" for="taskTypeId">Select the task type</label>
                <select class="form-select task-type-select" id="taskTypeId" v-model="taskType" required> 
                    <option v-for="taskType in taskTypes" :value=taskType.code>
                        {{ taskType.name.toUpperCase() }}
                    </option>
                </select>
            </div>
            <!-- number of events -->
            <div class="mb-3">
                <label class="form-label" for="no-of-events">Number of events</label>
                <input type="number"  id="no-of-events" class="form-control form-control-sm" v-model="noOfEvents" min="1" max="15" required/>
            </div>

            <!-- select user-->
            <div>
                <label class="typo__label">Assign to</label>
                <VueMultiselect
                        v-model="userName" placeholder="Search an User" label="name" track-by="id"
                        :options="userOptions" :multiple="false" :taggable="false">
                </VueMultiselect>
            </div>

            <!-- Submit button -->
            <div class="text-center">
                <button type="submit" class="btn btn-default button-add-task">submit</button>
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { computed, onBeforeMount, ref  } from 'vue'
import VueMultiselect from 'vue-multiselect';

const store = useUserStore();

let userName =  ref([]);
let description = ref('');
let taskType = ref('')
let noOfEvents = ref(1);
let userOptions = ref([]);

let add_task_data = {
  "taskType" : "t01",
  "numberOfEvents" : "5",
  "description" : "Conduct webinar on data structures",
  "assignedBy" : "6401607f067c1d45ba3db495",
  "assignedTo" : "6401613f067c1d45ba3db49c",
  "childTaskList" : [],
  "startDate" : "2023-03-08T07:31:56.563Z",
  "endDate" : "",
  "taskStatus" : "TO DO"
}

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
  if(validateParamters()) {
    var date = new Date();
    date.setDate(date.getDate() + 90);

    const addTaskDetails : any = {
        assignedTo : userName.value.id,
        assignedBy : store.userData?.userDetails.id,
        description : description.value,
        taskType : taskType.value,
        numberOfEvents : noOfEvents.value.toString(),
        childTaskList : [],
        startDate : new Date().toJSON().toString(),
        endDate : date.toJSON().toString(),
        taskStatus : "TO DO"
    }
    console.log(addTaskDetails);
    const response = await store.addNewTask(addTaskDetails);
    if(response.taskType == taskType.value) {
        alert('task added successfully');
        let userDataRefresh = await store.fetchUserData();
        store.setUserData(userDataRefresh);
    }
  };
}

function validateParamters() {
    if(description.value === '') {
        alert('descirption cannot be empty');
        return false;
    }
    if(taskType.value === '') {
        alert('task type cannot be empty');
        return false;
    }
    if(!userName?.value?.id) {
        alert('you need to select an user to assign the task to');
        return false;
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
 </style>
  