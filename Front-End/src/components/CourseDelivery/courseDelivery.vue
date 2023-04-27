<template>
  <div class="course-details-container boldText">
      <div class="dropdown boldText">
          <select v-model="selectedValue" class="select-option custom-select custom-select-sm boldText" @change="handleSelection">
              <option value="select-one" selected class="boldText">select the option</option>
              <option value="myCourses" class="boldText">
                  My Courses
              </option>
              <option value="otherCourses" class="boldText">
                  Other Courses
              </option>
          </select>
      </div>

      <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let selectedValue = ref('select-one');

const router = useRouter();

function handleSelection() {
    if(selectedValue.value !== 'select-one') {
       router.push({ name: selectedValue.value})
    }
}

</script>
<style>
.course-details-container {
  margin: 30px;
  color: black
}

.select-option {
    width: unset;
    display: block;
    background-color: grey;
    color: white;
}

</style>