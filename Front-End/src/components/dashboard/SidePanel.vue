<template>
  <div class="side-panel">
    <div class="project-name">Edu Task Central</div>
    <div class="options">
        <RouterLink to="#"><button type="button" class="btn btn-link">Dashboard</button></RouterLink>
        <RouterLink to="#"><button type="button" class="btn btn-link">Course Delivery</button></RouterLink>
        <RouterLink to="#"><button type="button" class="btn btn-link">Question Paper Setting</button></RouterLink>
        <RouterLink to="#"><button type="button" class="btn btn-link">Meetings</button></RouterLink>
        <RouterLink to="#"><button type="button" class="btn btn-link">Events</button></RouterLink>
        <RouterLink to="#"><button type="button" class="btn btn-link">Tasks</button></RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

</script>

<style scoped>
.side-panel {
    background-color: black;
    padding: 10px;
    border-radius: 10px;
    height: 100%;
}
.project-name{
    display: block;
    margin-bottom: 20px;
    padding: 20px;
    color: white;
    border: white;
    border-style: solid;
    border-width: 2px;
    text-align: center;
}


.btn-link {
    /*font-size: 8px;*/
    text-align: left;
    display: block;
    color: grey;
}
</style>
