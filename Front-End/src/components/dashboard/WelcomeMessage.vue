<template>
    <div class="welcome-message-container boldText">
        <div class="flex-box-row">
            <img class="dashboard-logo" src="@/assets/images/dashboard.jpeg"/>
            <div class="flex-box-column">
                <h1 class="margin-auto">Welcome to you Dashboard!</h1>
                <div class="margin-auto">
                    You have {{ pendingTask }} number of tasks pending. You already completed {{  getPercentage }}% of task assigned to you
                </div>
            </div>
        </div>
    </div>
  </template>
  <script setup lang="ts">
  import { useUserStore } from '@/stores/User';
  import { computed } from 'vue';
  
  const store = useUserStore();
  
  
  const pendingTask = computed(()=> {
    let filteredArray = [];
    if (store.userData?.taskAssignedToMe) {
      filteredArray = store.userData.taskAssignedToMe.filter(function (task) {
        return task != null && task.taskStatus !== 'DONE';
      })
    }
    return filteredArray.length;
  });

  const getPercentage = computed(()=> {
    let filteredArray = [];
    if (store.userData?.taskAssignedToMe) {
      filteredArray = store.userData.taskAssignedToMe.filter(function (task) {
        return task != null && task.taskStatus == 'DONE';
      })
    }
    return (filteredArray.length/store.userData?.taskAssignedToMe?.length)*100 || 0;
  });
  
  </script>
    
  <style scoped>
  .welcome-message-container {
    padding: 10px;
    background-color: white;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
  }
  
  .flex-box-row {
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  .flex-box-column {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
  }

  .dashboard-logo {
    height: 90px;
  }
  </style>
    