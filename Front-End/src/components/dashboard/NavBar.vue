<template>
  <div class="flex-container-nav">
    <RouterLink to="/logout">Logout</RouterLink>
    <div class="hello-message">
      <span> Hello, {{ store?.userData?.userDetails?.name }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, } from "vue-router";
import { useUserStore } from '@/stores/User';

const store = useUserStore();
</script>

<style scoped>

.flex-container-nav {
  display: flex;
  flex-flow: row-reverse;
  align-content: flex-end;
  margin-right: 30px;
  margin-top: 10px;
}

.flex-container-nav > * {
  text-align: center;
  /*line-height: 75px;*/
  font-size: 30px;
}

.hello-message {
  margin-right: 20px;
}
</style>
