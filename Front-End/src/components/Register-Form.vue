<template>
  <div class="sign-up-form">
    <form @submit.prevent="Submit" v-if="!store.apiCallBeingMade">
      <!-- name input -->
      <div class="mb-3">
        <label class="form-label" for="name">Name</label>
        <input type="text" id="name" placeholder="Name" class="form-control" v-model="name"/>
      </div>

      <!-- username input -->
      <div class="mb-3">
        <label class="form-label" for="form1Example1">Username</label>
        <input type="text" id="form1Example1" placeholder="Username" class="form-control" v-model="username"/>
      </div>

      <!-- Password input -->
      <div class="mb-3">
        <label class="form-label" for="form1Example2">Password</label>
        <input type="password" id="form1Example2" placeholder="password" class="form-control" v-model="password"/>
      </div>
      
      <!-- Confirm Password input -->
      <div class="mb-3">
        <label class="form-label" for="form1Example2">Re-Enter password</label>
        <input @blur="validatePassword" type="password" id="form1Example2" placeholder="password" class="form-control" v-model="reenterPassword"/>
      </div>

      <div class="alert alert-danger" v-if="!passwordMatch">
        <strong>password Doens't Match</strong>
      </div>
      <!-- User Type -->
      <div class="mb-3">
        <label class="form-label" for="userTypeId">Select the User Type</label>
        <select class="form-select userType" id="userTypeId" v-model="userType">
            <option v-for="user in userTypes" :value=user.code>
              {{ user.name.toUpperCase() }}
            </option>
        </select>
      </div>
      
      <!-- register number -->
      <div class="mb-3">
        <label class="form-label" for="rollNumber">Roll Number</label>
        <input type="text" id="rollNumber" placeholder="rollNumber" class="form-control" v-model="rollNumber"/>
      </div>

      <!-- Submit button -->
      <button type="submit" class="btn btn-default button-sign-up">Sign in</button>
    </form>
    <div class="spinner-border" v-if="store.apiCallBeingMade" role="status">
      <span class="visually-hidden" ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { ref, computed, onBeforeMount  } from 'vue'
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();

store.fetchUserType();

const name = ref('');
const username = ref('');
const password = ref('');
const reenterPassword = ref('');
const userType = ref('')
const rollNumber = ref('');
const passwordMatch = ref(true);

onBeforeMount(async()=> {
  const response = await store.fetchUserType();
  store.setUserType(response);
});

async function Submit() {
  if(validatePassword()) {
    const userDetails : any = {
        "name" : name.value,
        "username" : username.value,
        "password" : password.value,
        "usertype" : userType.value,
        "rollNumber" : rollNumber.value
    };
    const response = await store.SignUp(userDetails);
    router.push('/login');
  };
}

function validatePassword() {
  passwordMatch.value = password.value == reenterPassword.value;
  return password.value == reenterPassword.value
}
const userTypes = computed(() => {
  return store.userType;
})

</script>

<style scoped>
.sign-up-form {
  padding: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-sign-up{
  margin-top: 30px;
  text-align: center;
  width: 100%;
}

.userType{
  margin: 15px;
}

</style>
