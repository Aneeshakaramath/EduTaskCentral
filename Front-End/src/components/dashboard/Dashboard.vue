<template>
  <div class="dashboard-container">
    <h1 class="welcome-message boldText">Welcome back, {{ store?.userData?.userDetails?.name }}! </h1>
    <div class="row">
        <div class="col-sm">
          <OverDueTask></OverDueTask>
          <StatusDetails></StatusDetails>
          <CourseWiseQuesChecklist></CourseWiseQuesChecklist>
        </div>
        <div class="col-sm">
          <DatePicker></DatePicker>
          <GroupDetails></GroupDetails>
          <MarksGraphVue></MarksGraphVue>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import StatusDetails from './StatusDetails.vue';
import GroupDetails from './GroupDetails.vue';
import OverDueTask from './OverDueTask.vue';
import DatePicker from './DatePicker.vue';
import CourseWiseQuesChecklist from "./CourseWiseQuesChecklist.vue";
import MarksGraphVue from './MarksGraph.vue';
import { useUserStore } from '@/stores/User';

const store = useUserStore();

</script>
  
<style scoped>

  .dashboard-container {
    margin: 30px;
  }
  .welcome-message{
    font-size: 20px;
  }
 </style>
  