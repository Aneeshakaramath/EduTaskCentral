<template>
  <div class="sign-up-form">
    <form @submit.prevent="Submit" v-if="store.isUserTypeFetched">
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
      
      <!-- Confirm Password input -->
      <div class="form-group">
        <input type="password" id="form1Example2" placeholder="password" class="form-control" v-model="reenterPassword"/>
        <label class="form-label" for="form1Example2">Re-Enter password</label>
      </div>

      <select class="form-select" aria-label="Default select example">
        <option selected>Select User Type</option>
        <option v-for="user in userType" :value=user.code>
          {{ user.name.toUpperCase() }}
        </option>
      </select>

      <!-- Submit button -->
      <button type="submit" class="btn btn-default button-sign-up">Sign in</button>
    </form>
    <div class="spinner-border" role="status">
      <span class="visually-hidden" v-if="!store.isUserTypeFetched">Loading...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { ref, computed  } from 'vue'

const store = useUserStore();

store.fetchUserType();

const username = ref('');
const password = ref('');
const reenterPassword = ref('');

function Submit() {
  console.log(username.value);
  console.log(password.value);
  console.log(reenterPassword.value);
}

const userType = computed(() => {
  return store.userType;
})

</script>

<style scoped>
.sign-up-form {
  padding: 20px;
  margin: 0 auto;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-sign-up{
  margin-top: 20px;
  text-align: center;
  width: 100%;
}
</style>
