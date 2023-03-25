<template>
  <header v-if="isNavbarVisible">
    <div class="wrapper">
      <nav class="router-link">
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/signup">Sign Up</RouterLink>
      </nav>
    </div>
  </header>
  <router-view></router-view>
  <!--<RouterView />-->
</template>
<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import { useUserStore } from "./stores/User";

const route = useRoute();
const store = useUserStore();

const isNavbarVisible = computed(() => {
  return  !store.isLoggedIn && route.name != 'logout';
})
</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  color: black;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
   /* display: flex; */
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
