<template>
  <div>
    <div class="task-status-container">
      <div>
        <h2 class="task-status-label">Task Status</h2>
        <span class="router-link">
          <RouterLink :to="{ name: 'taskAssignedToMe' }">see All</RouterLink>
        </span>
      </div>
      <TaskStatus taskStatus="To Do" fontcolor="grey"></TaskStatus>
      <TaskStatus taskStatus="In progress" fontcolor="orange"></TaskStatus>
      <TaskStatus taskStatus="Done" fontcolor="green"></TaskStatus>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import TaskStatus from './TaskStatus.vue';
import { onMounted } from "vue";

const store = useUserStore();


onMounted(async () => {
  if (!store.isNotificationCallAlreadyMadeOnPageLoad) {
    store.setIsNotificationCallAlreadyMadeOnPageLoad(true);
    setTimeout(async () => {
      const response = await store.getNotificationByUserId(store.userData?.userDetails.id);
      store.setNotifications(response);
      for (let i = 0; i < response.length; i++) {
        if (response[i].isRead == false) {
          alert('You have new notifications');
          break;
        }
      }
    }, 1)
  }
});

</script>

<style scoped>
.task-status-container {
  padding: 10px;
  background-color: #f3d5ec;
}

.task-status-label {
  font-size: 15px;
  display: inline-block;
}

.router-link {
  float: right;
}

.router-link>a {
  color: blue !important;
}
</style>
