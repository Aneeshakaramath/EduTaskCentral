<template>
    <div class="group-details-container align-center boldText">
        <RouterLink :to="{ name: 'group' }">
            <h2 class="group-details-label boldText">
                Group Details 
                <img class='edit-icon' src="@/assets/images/edit.png"/>
            </h2>
        </RouterLink>
        <div v-if="!store.isGetGroupCallInProgress">
            <div class="groups-container boldText" v-if="store.groupDetails.length > 0">
                <table class="table group-table boldText">
                    <thead>
                        <tr class="table-header">
                            <th scope="col" class="col-header boldText">Group Name</th>
                            <th scope="col" class="col-header boldText">Members</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        <tr v-for="group in store.groupDetails">
                            <th scope="row" class="group-name boldText"> {{ group.groupName }} </th>
                            <td>
                                <div class="group-members" v-if="group.userId.length > 0">
                                    <span v-for="(user,index) in group.userId">
                                        {{ user.name + ((index + 1) == group.userId.length ? "" : ", " ) }}
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
            <div class="no-group-available-message boldText" v-else>
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
    margin-top: 20px;
    padding: 10px;
    background-color: white;
    border-radius: 20px;
}
.group-details-label {
    font-size: 15px;
    color: black;
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
    font-size: 20px;
}
.group-table{
    margin: 0px;
}
.group-name {
    font-size: 10px;
}

.edit-icon {
    margin-left: 5px;
    width: 15px;
}
</style>
  