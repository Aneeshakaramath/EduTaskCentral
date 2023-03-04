<template>
   <div class="task-level-status-container">
        <div class="row">
            <div class="col-sm" v-for="taskStatus in taskStatusList">
                <h3 class="taks-status-label" :style="{ 'background-color': taskStatus.color}">{{ taskStatus.status }} </h3>
            </div>
        </div>
        <!--<h3 class="taks-status-label" :style="{ 'background-color': fontcolor}"> {{ taskStatus.toUpperCase() }} </h3>
        <span class="count-task" v-if="taskListForCurrentStatus.length > 0"> {{ taskListForCurrentStatus.length }} TASK </span>
        <div>
            <div class="table-container" v-if="taskListForCurrentStatus.length > 0">
                <TaskTable :task-list="getMaxThreeStatus"></TaskTable>
            </div>
            <div class="no-task-available-message" v-else>
                No Task Available to Display
            </div>
        </div>-->
    </div>
</template>
  
<script setup lang="ts">

const taskStatusList = [
    {
        status: 'TODO',
        color: 'grey'
    }, 
    {
        status: 'IN PROGRESS',
        color: 'orange'
    },
    {
        status: 'DONE',
        color: 'green'
    }
];

const props = defineProps<{
    taskListType:string
}>()

/*const taskListForCurrentStatus = computed(() => {
  let filteredArray = [];
  if(store.userData?.taskAssignedToMe && props.taskStatus) {
    filteredArray = store.userData.taskAssignedToMe.filter( function(task) {
       return task!=null && task.taskStatus == props.taskStatus?.toUpperCase();
    })
  }
  return filteredArray;
});*/


</script>
  
<style scoped>
 .task-level-status-container {
    background-color: white;
    margin: 20px;
    padding: 5px;
  }

  .taks-status-label {
    font-size: 12px;
    font-weight: 700;
    color: white;
    display: inline-block;
    padding: 5px;
  }

  .no-task-available-message {
    text-align: center;
    font-size: 12px;
  }

  .count-task {
    font-size: 12px;
    padding: 5px;
    margin-left: 10px;
    color: grey;
  }

  .table-container {
    text-align: center;
  }
</style>
  