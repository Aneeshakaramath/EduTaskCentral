<template>
  <div class="dashboard flexcontainer" v-if="!store.apiCallBeingMade">
    <div class="columns">
      <SidePanel></SidePanel>
    </div>
    <div class="columns">
      <NavBar></NavBar>
      <div class="row">
        <div class="col-sm-8">
          <StatusDetails></StatusDetails>
        </div>
        <div class="col-sm-4">
          
        </div>
      </div>
    </div>
    <!--<RouterLink to="/logout">Logout</RouterLink>
    <h1>Logged In Successfully</h1>
    <p> {{ store.userData }}</p>
    <p> Welcome {{ store?.userData?.userDetails?.name }}</p>-->
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
import StatusDetails from './dashboard/StatusDetails.vue'
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

.columns{
  flex: 1;
  background-color: white;
  border-radius: 10px;
}
.columns:nth-of-type(even){
  flex: 3; 
}

</style>
