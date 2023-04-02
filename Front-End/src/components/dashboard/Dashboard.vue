<template>
  <div class="dashboard-container">
    <h1 class="welcome-message">Welcome back, {{ store?.userData?.userDetails?.name }}! </h1>
    <div class="row">
        <div class="col-sm-8">
          <StatusDetails></StatusDetails>
        </div>
        <div class="col-sm-4">
          <GroupDetails></GroupDetails>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import StatusDetails from './StatusDetails.vue';
import GroupDetails from './GroupDetails.vue';
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
  