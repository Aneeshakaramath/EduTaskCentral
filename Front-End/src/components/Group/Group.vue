<template>
    <div class="group-details-container">
        <div>
            <label class="typo__label">Select an existing group or Add a Group Name</label>
            <VueMultiselect
                    v-model="groupValue" tag-placeholder="Add this as new group" placeholder="Search or add a group" label="name" track-by="id"
                    :options="groupOptions" :multiple="false" :taggable="true" @tag="addTag">
            </VueMultiselect>
        </div>
        <div>
            <label class="typo__label">Add or remove users from the group</label>
            <VueMultiselect
                    v-model="userValues" placeholder="Search an User" label="name" track-by="id"
                    :options="userOptions" :multiple="true" :taggable="false">
            </VueMultiselect>
        </div>
        <div class="btn-container">
            <button type="button" class="btn btn-secondary" @click="submit">submit</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { onBeforeMount, ref, watch } from 'vue';
import VueMultiselect from 'vue-multiselect';

const store = useUserStore();

let groupValue =  ref([]);
let groupOptions =  ref([]);
let userValues = ref([]);
let userOptions = ref([]);

function addTag (newTag) {
      const tag = {
        name: newTag,
        id: 'newGroup' + Math.floor((Math.random() * 10000000))
      }
      groupOptions.value.push(tag);
      groupValue.value.push(tag);  
}

onBeforeMount(async()=> {
    console.log('etner skfsjdf sdf')
    const response = await store.fetchGroupDetails();
    store.setGroupDetails(response);
    setGroupValues();
    const userReponse = await store.fetchUserDetails();
    store.setUserList(userReponse);
    setUserValues();
});

function setGroupValues() {
    store.groupDetails.forEach((value) => {
        groupOptions.value.push({name: value.groupName, id: value._id});
    })
}

function setUserValues() {
    store.userList.forEach((value) => {
        userOptions.value.push({name: value.name, id: value._id});
        userOptions.value.push({name: value.rollNumber, id: value._id});
    })
}
watch(groupValue, (newValue, oldValue)=> {
    userValues.value = [];
    store.groupDetails.forEach((value) => {
        if(value._id == newValue.id) {
            value.userId.forEach((user)=> {
                userValues.value.push({name: user.name, id: user._id});
            })
        }
    })
});

async function submit() {
    if(groupValue.value.id.includes('newGroup')) {

    } else {
        
    }
    console.log(groupValue.value);
    console.log(userValues.value);
}
</script>


<style scoped>

.group-details-container {
    margin: 30px;
    color: black;
}

.btn-container {
    text-align: center;
    margin: 20px;
}
 </style>
  