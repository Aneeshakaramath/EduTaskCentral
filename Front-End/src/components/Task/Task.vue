<template>
    <div class="task-details-container">
        <div class="dropdown">
            <select v-model="selectedValue" class="select-option custom-select custom-select-sm" @change="showTasks">
                <option value="select-one" selected>Select the Task Type</option>
                <option value="taskAssignedToMe">
                    task Assigned To Me
                </option>
                <option value="taskAssignedByMe">
                    task Assigned By Me
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

function showTasks() {
    if(selectedValue.value !== 'select-one') {
        router.push({ name: selectedValue.value})
    }
}

</script>
  
<style scoped>
.task-details-container{
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
  