<template>
    <table class="table">
        <thead>
            <tr class="table-header">
                <th scope="col">Task Name</th>
                <th scope="col">Created By</th>
                <th scope="col">End Date</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="task in taskList">
                <th scope="row">
                    <RouterLink :to="{ name: 'taskById' , params : { taskId: task.id}}">
                        {{ task.description }}
                    </RouterLink>  
                </th>
                <td>{{ task.assignedBy.name }}</td>
                <td>{{ task.endDate }}</td>
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
  