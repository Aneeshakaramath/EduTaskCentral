<template>
   <div class="task-level-status-container">
        <div class="row">
            <div class="col-sm" v-for="taskStatus in taskStatusList">
                <h3 class="taks-status-label" :style="{ 'background-color': taskStatus.color}">{{ taskStatus.status }} </h3>
                <span class="count-task" v-if="taskStatus.taskList.length > 0"> {{ taskStatus.taskList.length }} TASK </span>
                <div>
                    <div class="table-container" v-if="taskStatus.taskList.length > 0">
                        <TaskTable :task-list="taskStatus.taskList"></TaskTable>
                    </div>
                    <div class="no-task-available-message" v-else>
                        No Task Available to Display
                    </div>
                </div>
            </div>
        </div>
        <div id="chart" class="donut-chart">
            <apexchart type="donut" width="380" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import TaskTable from './TaskTable.vue';

const props = defineProps<{
    taskListType:string
}>()

const store = useUserStore();
const route = useRoute();

let taskStatusList = [
    {
        status: 'TO DO',
        color: 'grey',
        taskList: getTaskList('TO DO')
    }, 
    {
        status: 'IN PROGRESS',
        color: 'orange',
        taskList: getTaskList('IN PROGRESS')
    },
    {
        status: 'DONE',
        color: 'green',
        taskList: getTaskList('DONE')
    }
];

let series = [0,0,0];

watch(()=> route.name, () => {
    console.log("getting called ********8")
    series = [taskStatusList[0].taskList.length, taskStatusList[1].taskList.length, taskStatusList[2].taskList.length];
});


watch(()=>props.taskListType, (newValue, oldValue)=> {
    for (let i = 0; i < taskStatusList.length; i++) {
        taskStatusList[i].taskList = getTaskList(taskStatusList[i].status);
    }
    series = [taskStatusList[0].taskList.length, taskStatusList[1].taskList.length, taskStatusList[2].taskList.length];
});

function getTaskList(taskStatus: string) {
    let filteredArray = [];

    if(props.taskListType == 'taskAssignedToMe') {
        filteredArray = store.userData.taskAssignedToMe.filter(function(task) {
            return task!=null && task.taskStatus == taskStatus;
        })
    }

    else if (props.taskListType == 'taskAssignedByMe') {
        filteredArray = store.userData.taskAssignedByMe.filter(function(task) {
            return task!=null && task.taskStatus == taskStatus;
        })
    }

    return filteredArray;
}

const chartOptions = computed(() => {
  return  {
            chart: {
              width: 380,
              type: 'donut',
            },
            labels: ['TO DO', 'IN PROGRESS', 'DONE'],
            plotOptions: {
              pie: {
                startAngle: -90,
                endAngle: 270
              }
            },
            dataLabels: {
              enabled: false
            },
            fill: {
              type: 'gradient',
            },
            legend: {
              formatter: function(val, opts) {
                return val + " - " + opts.w.globals.series[opts.seriesIndex]
              }
            },
            title: {
              text: 'Donut Chart'
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          }
})
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

  .donut-chart {
    text-align: center;
  }
</style>
  