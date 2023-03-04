<template>
  <div class="log-out" v-if="!store.apiCallBeingMade" >
    <h1>Logout Successful</h1>
    <p> You are now logged out</p>
    <RouterLink to="/login">Login Again</RouterLink>
  </div>
  <div class="spinner-border" v-if="store.apiCallBeingMade" role="status">
      <span class="visually-hidden" ></span>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();

onBeforeMount(async()=> {
  if(!store.isLoggedIn) {
    store.$reset();
    router.push('/login');
  } else {
    const response = await store.logout();
    store.$reset();
  }
});

</script>

<style scoped>

.log-out {
  margin: 30px;
}

</style>
