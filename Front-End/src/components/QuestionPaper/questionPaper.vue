<template>
    <div class="question-paper-container boldText">
      <div class="dropdown boldText">
          <select v-model="selectedValue" class="select-option custom-select custom-select-sm boldText" @change="handleSelection">
              <option value="select-one" selected class="boldText">select the option</option>
              <option value="setting" class="boldText">
                  Setting
              </option>
              <option value="audit" class="boldText">
                  Audit
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
<style scoped>

.question-paper-container {
  margin: 30px;
  color: black
}

</style>