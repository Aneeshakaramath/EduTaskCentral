<template>
  <div class="dashboard flexcontainer" v-if="!store.apiCallBeingMade">
    <div class="columns side-panel">
      <SidePanel></SidePanel>
    </div>
    <div class="columns dashboard-container-radius">
      <NavBar></NavBar>
      <router-view></router-view>
    </div>
  </div>
  <div class="spinner-border" v-if="store.apiCallBeingMade" role="status">
      <span class="visually-hidden" ></span>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from '@/stores/User';
import { onBeforeMount } from "vue";
import SidePanel from './dashboard/SidePanel.vue';
import NavBar from './dashboard/NavBar.vue';

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

.dashboard {
  padding: 20px;
}

.flexcontainer {
  display: flex;
  font-size:15px;
}
.side-panel {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.dashboard-container-radius {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}
.columns{
  flex: 1;
  background-color: white;
}
.columns:nth-of-type(even){
  flex: 5; 
  background-color: #f3eff2;;
}

</style>
