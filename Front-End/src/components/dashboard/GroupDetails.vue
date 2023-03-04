<template>
    <div class="group-details-container align-center">
        <h2 class="group-details-label">Group Details</h2>
        <div v-if="!store.isGetGroupCallInProgress">
            <div class="groups-container" v-if="store.groupDetails.length > 0">
                <table class="table group-table">
                    <thead>
                        <tr class="table-header">
                            <th scope="col" class="col-header">Group Name</th>
                            <th scope="col" class="col-header">Members</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        <tr v-for="group in store.groupDetails">
                            <th scope="row" class="group-name"> {{ group.groupName }} </th>
                            <td>
                                <div class="group-members" v-if="group.userId.length > 0">
                                    <span v-for="(user,index) in group.userId">
                                        {{ user.name + ((index + 1) == group.userId.length ? "" : "," ) }}
                                    </span>
                                </div>
                                <div class="group-members" v-else>
                                    0 member
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="no-group-available-message" v-else>
                No Groups Created Yet
            </div>
        </div>
        <div class="spinner-border" v-if="store.isGetGroupCallInProgress" role="status">
            <span class="visually-hidden" ></span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { onBeforeMount } from 'vue';

const store = useUserStore();

onBeforeMount(async()=> {
    const response = await store.fetchGroupDetails();
    store.setGroupDetails(response);
});

</script>
  
<style scoped>
.group-details-container {
    padding: 10px;
    background-color: #f3d5ec;
}
.group-details-label {
    font-size: 15px;
    text-align: left;
}
.spinner-border {
    margin: 20px;
}
.no-group-available-message {
    text-align: center;
    font-size: 12px;
}
.groups-container {
    background-color: white;
    margin-top: 20px!important;
    margin: 10px;
    padding: 10px;
}

.table-header {
    font-size: 10px;
}

.col-header {
    font-weight: 900;
}
.group-members {
    font-weight: 400;
    font-size: 10px;
}
.group-table{
    margin: 0px;
}
.group-name {
    font-size: 10px;
}
</style>
  