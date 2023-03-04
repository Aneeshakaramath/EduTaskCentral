<template>
    <div class="task-details-container">
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select the task type
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <RouterLink :to="{ name: 'taskAssignedToMe' }">
                    <button class="dropdown-item">taskAssignedToMe</button>
                </RouterLink>
                <RouterLink :to="{ name: 'taskAssignedByMe' }">
                    <button class="dropdown-item">taskAssignedByMe</button>
                </RouterLink>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">


</script>
  
<style scoped>

.task-details-container{
  margin: 30px;
  color: black
}
 </style>
  