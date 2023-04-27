<template>
    <div class="over-due-details-container align-center boldText">
        <h2 class="task-status-label boldText">
            Task Status 
        </h2>
        <div v-if="!isAnyTaskDone && !isAnyTaskOverDue" class="align-center boldText">
            No Task is in done status or over due status
        </div>
        <div else>
            <apexchart type="donut" width="380" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { computed } from 'vue';

const store = useUserStore();


const isAnyTaskDone = computed(() => {
    let filteredArray = [];
    if(store.userData?.taskAssignedToMe) {
        filteredArray = store.userData.taskAssignedToMe.filter( function(task) {
            return task!=null && task.taskStatus == 'DONE';
        })
    }
    return filteredArray.length > 0;
});

const isAnyTaskOverDue = computed(()=> {
    let today = new Date()
    if(store.userData?.taskAssignedToMe) {
        store.userData.taskAssignedToMe.filter( function(task) {
            var endDate = new Date(task.endDate);
            if(today > endDate && task.taskStatus !== 'DONE') {
                return true;
            }
        })
    }
    return false;
})

const chartOptions = computed(() => {
  return  {
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
              formatter: function(val, opts) {
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

const series = computed(()=> {
    console.log("test series");
    let filteredArray = [];
    if(store.userData?.taskAssignedToMe) {
        filteredArray = store.userData.taskAssignedToMe.filter( function(task) {
            return task!=null && task.taskStatus == 'DONE';
        })
    }
    
    let today = new Date();
    let count = 0;
    if(store.userData?.taskAssignedToMe) {
        store.userData.taskAssignedToMe.filter( function(task) {
            var endDate = new Date(task.endDate);
            if(today > endDate && task.taskStatus !== 'DONE') {
                count++;
            }
        })
    }

    return [count, filteredArray.length];
});
</script>
  
<style scoped>
.over-due-details-container {
    margin-top: 20px;
    padding: 10px;
    background-color: #f3eff2;
}

.task-status-label {
    font-size: 20px;
    color: black;
    text-align: left;
}
</style>
  