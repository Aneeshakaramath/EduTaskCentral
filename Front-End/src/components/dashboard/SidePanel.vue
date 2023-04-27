<template>
  <div class="side-panel">
    <div class="project-name">
      <img class="logo" src="@/assets/favicon.png"/>
      <div class="boldText">Edu Task Central</div>
    </div>
    <div class="options">
        <RouterLink :to="{ name: 'dashboard' }"><button type="button" class="btn btn-link boldText">Dashboard</button></RouterLink>
        <RouterLink :to="{ name: 'courseDelivery' }"><button type="button" class="btn btn-link boldText">Course Delivery</button></RouterLink>
        <RouterLink :to="{ name: 'courseEnrollment' }"><button type="button" class="btn btn-link boldText">Course Enrollment</button></RouterLink>
        <RouterLink :to="{ name: 'task' }"><button type="button" class="btn btn-link boldText">Tasks</button></RouterLink>
        <RouterLink :to="{ name: 'group' }"><button type="button" class="btn btn-link boldText">Group</button></RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

</script>

<style scoped>
.side-panel {
    background-color: rgb(242, 238, 238);
    padding: 10px;
    border-radius: 10px;
    height: 100%;
    background-color: black;
}
.project-name{
    display: block;
    margin-bottom: 20px;
    padding: 20px;
    color: white;
    border: white;
    border-style: solid;
    text-align: center;
}


.btn-link {
    /*font-size: 8px;*/
    text-align: left;
    display: block;
    color: white;
}
</style>
