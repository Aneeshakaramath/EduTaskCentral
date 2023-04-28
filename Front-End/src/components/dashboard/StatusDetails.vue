<template>
  <div>
    <div class="task-status-container">
      <div>
        <h2 class="task-status-label">Task Status</h2>
        <span class="router-link">
          <RouterLink :to="{ name: 'taskAssignedToMe' }">see All</RouterLink>
        </span>
      </div>
      <vaadin-accordion>
        <vaadin-accordion-panel summary="To Do">
          <vaadin-vertical-layout>
            <TaskStatus taskStatus="To Do" fontcolor="grey"></TaskStatus>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>
        <vaadin-accordion-panel summary="In Progress">
          <vaadin-vertical-layout>
            <TaskStatus taskStatus="In progress" fontcolor="orange"></TaskStatus>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>
        <vaadin-accordion-panel summary="Done">
          <vaadin-vertical-layout>
            <TaskStatus taskStatus="Done" fontcolor="green"></TaskStatus>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>
      </vaadin-accordion>

      <!--<TaskStatus taskStatus="To Do" fontcolor="grey"></TaskStatus>
      <TaskStatus taskStatus="In progress" fontcolor="orange"></TaskStatus>
      <TaskStatus taskStatus="Done" fontcolor="green"></TaskStatus>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import TaskStatus from './TaskStatus.vue';
import { onMounted } from "vue";
import swal from 'sweetalert';
import '@vaadin/accordion/theme/lumo/vaadin-accordion.js';

const store = useUserStore();


onMounted(async () => {
  if (!store.isNotificationCallAlreadyMadeOnPageLoad) {
    store.setIsNotificationCallAlreadyMadeOnPageLoad(true);
    setTimeout(async () => {
      let today = new Date();
      let count = 0;
      if (store.userData?.taskAssignedToMe) {
        store.userData.taskAssignedToMe.filter(function (task) {
          var endDate = new Date(task.endDate);
          if (today > endDate && task.taskStatus !== 'DONE') {
            count++;
          }
        })
      };
      if(count > 0 && store.userData?.isNewNotificationAvailable) {
        swal(`You have new notifications and ${count} over due task`);
        return;
      }
      if(count > 0) {
        swal(`You have ${count} over due task`);
        return;
      }
      if(store.userData?.isNewNotificationAvailable) {
        swal(`You have new notifications`);
        return;
      }
      /*const response = await store.getNotificationByUserId(store.userData?.userDetails.id);
      store.setNotifications(response);
      for (let i = 0; i < response.length; i++) {
        if (response[i].isRead == false) {
          alert('You have new notifications');
          break;
        }
      }*/
    }, 1)
  }
});

</script>

<style scoped>
.task-status-container {
  padding: 10px;
  background-color: #f3eff2;
  margin-top: 20px;
}

.task-status-label {
  font-size: 20px;
  display: inline-block;
  font-weight: bold;
}

.router-link {
  float: right;
}

.router-link>a {
  color: blue !important;
}
</style>
