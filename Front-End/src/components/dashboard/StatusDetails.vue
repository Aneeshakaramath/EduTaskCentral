<template>
  <div class="status-details-container">
    <h1 class="welcome-message">Welcome back, {{ store?.userData?.userDetails?.name }}! </h1>
    <div class="task-status-container">
      <h2 class="task-status-label">Task Status</h2>
      <TaskStatus taskStatus="To Do" fontcolor="grey" ></TaskStatus>
      <TaskStatus  taskStatus="In progress" fontcolor="orange"></TaskStatus>
      <TaskStatus taskStatus="Done" fontcolor="green"></TaskStatus>
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
  font-size: 20px;
}
.task-status-container {
  margin: 20px;
  padding: 10px;
  background-color: #FFF5EE;
}
.task-status-label {
  font-size: 15px;
}
</style>
