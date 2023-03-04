<template>
    <div class="task-level-status-container">
      <h3 :style="{ color: fontcolor}"> {{ heading }} </h3>
    </div>
  </template>
  
  <script setup lang="ts">
 defineProps<{
  heading?: string,
  fontcolor: string
}>()
  </script>
  
  <style scoped>
  .task-level-status-container {
    background-color: white;
    margin: 20px;
  }
  </style>
  