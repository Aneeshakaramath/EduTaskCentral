<template>
  <div class="dashboard" v-if="!store.apiCallBeingMade">
    <RouterLink to="/logout">Logout</RouterLink>
    <h1>Logged In Successfully</h1>
    <p> {{ store.userData }}</p>
    <p> Welcome {{ store?.userData?.userDetails?.name }}</p>
  </div>
  <div class="spinner-border" v-if="store.apiCallBeingMade" role="status">
      <span class="visually-hidden" ></span>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from '@/stores/User';
import { onBeforeMount } from "vue";

const store = useUserStore();
const router = useRouter();

onBeforeMount(async()=> {
  if(store.isLoggedIn) {
    const response = await store.fetchUserData();
    store.setUserData(response);
  } else {
    router.push('/login');
  }
});

</script>

<style scoped>

.log-out {
  margin: 30px;
}

</style>
