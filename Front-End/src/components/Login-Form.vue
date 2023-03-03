<template>
  <div class="login-form">
    <form @submit.prevent="Submit" v-if="!store.apiCallBeingMade">
      <!-- username input -->
      <div class="form-group">
        <input type="text" id="form1Example1" placeholder="Username" class="form-control" v-model="username"/>
        <label class="form-label" for="form1Example1">Username</label>
      </div>

      <!-- Password input -->
      <div class="form-group">
        <input type="password" id="form1Example2" placeholder="password" class="form-control" v-model="password"/>
        <label class="form-label" for="form1Example2">Password</label>
      </div>
     
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="showPassword" @change="showPasswordFlipped">
        <label class="form-check-label" for="flexCheckDefault">
          Show Password
        </label>
      </div>

      <!-- Submit button -->
      <button type="submit" class="btn btn-default button-sign-in">Sign in</button>
    </form>
    <div class="spinner-border" v-if="store.apiCallBeingMade" role="status">
      <span class="visually-hidden" ></span>
  </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const showPassword = ref(false);

onBeforeMount(async()=> {
  if(store.isLoggedIn) {
    router.push('/dashboard');
  } 
});

async function Submit() {
  const userDetails : any = {
        "username" : username.value,
        "password" : password.value,
  }; 
  const response = await store.login(userDetails);
  console.log(response);
  if(response.isAuthenticated) {
    store.setIsLoggedIn(true);
    router.push('/dashboard');
  } else {
    store.$reset();
    router.push('/login');
  }
}

function showPasswordFlipped() {
  let passwordElement = document.getElementById("form1Example2");
  if (passwordElement.type === "password") {
    passwordElement.type = "text";
  } else {
    passwordElement.type = "password";
  }
}

</script>

<style scoped>

.login-form {
  padding: 20px;
  margin: 0 auto;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-sign-in{
  margin-top: 20px;
  text-align: center;
  width: 100%;
}
</style>
