<template>
  <div class="status-details-container">
    <h1 class="welcome-message">Welcome {{ store?.userData?.userDetails?.name }} </h1>
    <div class="task-status-container">
      <h2>Task Status</h2>
      <TaskStatus heading="To Do" fontcolor="grey"></TaskStatus>
      <TaskStatus  heading="In progress" fontcolor="orange"></TaskStatus>
      <TaskStatus heading="Done" fontcolor="green"></TaskStatus>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import TaskStatus from './TaskStatus.vue';

const store = useUserStore();
</script>

<style scoped>
.status-details-container{
  margin: 30px;
  color: black
}
.welcome-message{

}
.task-status-container {
  margin: 20px;
  padding: 10px;
  background-color: #FFF5EE;
}
</style>
