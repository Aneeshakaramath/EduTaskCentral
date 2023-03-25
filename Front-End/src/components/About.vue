<template>
    <div class="about">
        <div class="project-name">
            <img class="logo" src="@/assets/logo.svg"/>
        </div>
        <h1 class="about-text">
            EduTaskCentral : A centralized task management tool for educational institutes.
        </h1>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useUserStore } from '@/stores/User';
  import { onBeforeMount, ref } from 'vue'
  import { useRouter } from 'vue-router';
  
  const store = useUserStore();
  const router = useRouter();
  
  onBeforeMount(async()=> {
    
  });
  
  </script>
  
  <style scoped>
  
  .about {
    text-align: center;
    margin-top: 20px;
  }
  
  .about-text {
    font-size: 20px;
    margin-top: 40px;
  }
  </style>
  