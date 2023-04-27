<template>
    <table class="table boldText">
        <thead class="boldText">
            <tr class="table-header">
                <th scope="col" class="boldText">Task Name</th>
                <th scope="col" class="boldText">Created By</th>
                <th scope="col" class="boldText">End Date</th>
            </tr>
        </thead>
        <tbody class="boldText">
            <tr v-for="task in taskList">
                <th scope="row" class="boldText">
                    <RouterLink :to="{ name: 'taskById' , params : { taskId: task.id}}" class="boldText">
                        {{ task.description }}
                    </RouterLink>  
                </th>
                <td class="boldText">{{ task.assignedBy.name }}</td>
                <td class="boldText">{{ task.endDate }}</td>
            </tr>
        </tbody>
    </table>
</template>
  
<script setup lang="ts">

const props = defineProps<{
    taskList: any
}>()

</script>
  
<style scoped>
.table-header {
    font-size: 12px;
    color: grey;
}

</style>
  