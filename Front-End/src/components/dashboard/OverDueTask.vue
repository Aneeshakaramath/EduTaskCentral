<template>
  <div class="over-due-details-container align-center boldText">
    <h2 class="task-status-label boldText">
      Over Due
    </h2>
    <div v-if="!isAnyTaskDone && !isAnyTaskOverDue" class="align-center boldText">
      No Task is in done status or over due status
    </div>
    <div v-else>
      <div class="align-center">
        <apexchart type="donut" width="380" :options="chartOptions" :series="series"></apexchart>
      </div>
      <p class="over-due-task-button" v-if="taskList.length > 0">
        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample"
          aria-expanded="false" aria-controls="collapseExample">
          show overdue tasks
        </button>
      </p>
      <div class="collapse" id="collapseExample" v-if="taskList.length > 0">
        <ul v-for="task in taskList">
          <RouterLink :to="{ name: 'taskById' , params : { taskId: task.id}}">
                        {{ task.description }}
          </RouterLink>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { computed } from 'vue';

const store = useUserStore();


const isAnyTaskDone = computed(() => {
  let filteredArray = [];
  if (store.userData?.taskAssignedToMe) {
    filteredArray = store.userData.taskAssignedToMe.filter(function (task) {
      return task != null && task.taskStatus == 'DONE';
    })
  }
  return filteredArray.length > 0;
});

const isAnyTaskOverDue = computed(() => {
  let today = new Date()
  if (store.userData?.taskAssignedToMe) {
    store.userData.taskAssignedToMe.filter(function (task) {
      var endDate = new Date(task.endDate);
      if (today > endDate && task.taskStatus !== 'DONE') {
        return true;
      }
    })
  }
  return false;
})

const taskList = computed(()=> {
  let filteredArray = [];
  let today = new Date()
  if (store.userData?.taskAssignedToMe) {
    filteredArray = store.userData.taskAssignedToMe.filter(function (task) {
      var endDate = new Date(task.endDate);
      if ( task!= null && today > endDate && task.taskStatus !== 'DONE') {
        return true;
      }
      return false;
    })
  }
  return filteredArray;
})
const chartOptions = computed(() => {
  return {
    chart: {
      width: 250,
      type: 'donut',
    },
    labels: ['OVER DUE', 'DONE'],
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
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex]
      }
    },
    title: {
      text: 'Task Consolidated View'
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
});

const series = computed(() => {
  let filteredArray = [];
  if (store.userData?.taskAssignedToMe) {
    filteredArray = store.userData.taskAssignedToMe.filter(function (task) {
      return task != null && task.taskStatus == 'DONE';
    })
  }

  let today = new Date();
  let count = 0;
  if (store.userData?.taskAssignedToMe) {
    store.userData.taskAssignedToMe.filter(function (task) {
      var endDate = new Date(task.endDate);
      if (today > endDate && task.taskStatus !== 'DONE') {
        count++;
      }
    })
  }

  return [count, filteredArray.length];
});
</script>
  
<style scoped>
.over-due-details-container {
  padding: 10px;
  background-color: white;
  border-radius: 20px;
}

.task-status-label {
  font-size: 20px;
  color: black;
  text-align: left;
}

.over-due-task-button {
  text-align: left;
  margin-top: 10px;
}

::v-deep .apexcharts-canvas {
  margin: auto!important;;
}
</style>
  