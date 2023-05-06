<template>
  <div class="flex-container-nav">
    <RouterLink to="/logout">
      Logout
      <img class="logout_icon" src="@/assets/images/logout.png"/>
    </RouterLink>
    <div class="user-name-container">
      <span class="hello-message">
        <span> Hello, {{ store?.userData?.userDetails?.userName }} </span>
      </span>
      <span class="user_icon"><img src="@/assets/images/user_icon.png"/></span>
    </div>
    <RouterLink :to="{ name: 'notification' }">
      <img class="bell-icon" src="@/assets/images/bell.jpg"/>
    </RouterLink>
    <div class="current-date">
      {{ currentDate }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, } from "vue-router";
import { useUserStore } from '@/stores/User';
import { computed } from "vue";

const store = useUserStore();


const currentDate = computed(() => {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const current = new Date();   monthNames[current.getMonth()]
      const date = `${current.getDate()} ${monthNames[current.getMonth()]}, ${current.getFullYear()}`;
      return date;
});

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
}

.hello-message {
  margin-right: 20px;
  color: black;
  font-weight: 900;
}

.user_icon > img {
    height: 25px;
    margin-right: 10px;
}

.logout_icon {
  height: 20px;
  width: 20px;
}

.bell-icon {
  height: 25px;
  width: 25px;
  margin-right: 10px;
}

.user-name-container {
    padding: 10px;
    border: black 1px solid;
    border-radius: 8px;
    margin-right: 10px;
}

.current-date {
    padding: 10px;
    border: 1px black solid;
    border-radius: 8px;
    margin-right: 10px;
}
</style>
