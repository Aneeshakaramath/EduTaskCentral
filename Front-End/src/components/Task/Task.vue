<template>
    <div class="task-details-container">
        <div class="dropdown">
            <select v-model="selectedValue" class="select-option custom-select custom-select-sm boldText" @change="showTasks">
                <option value="select-one" class="boldText" selected>select the option</option>
                <option value="taskAssignedToMe" class="boldText">
                    see task assigned to me
                </option>
                <option value="taskAssignedByMe" class="boldText">
                    see task assigned by Me
                </option>
                <option value="createTask" class="boldText">
                    add new task
                </option>
                <option value="addTaskToGroup" class="boldText">
                    add new task to group
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

.button-add-task {
    float: right;
    background-color: grey;
}
 </style>
  