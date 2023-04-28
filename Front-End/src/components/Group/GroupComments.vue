<template>
    <div>
        <label class="typo__label boldText">Select a group</label>
        <VueMultiselect v-model="groupValue" tag-placeholder="Select a group" placeholder="Search" label="name"
            track-by="id" :options="groupOptions" :multiple="false" :taggable="false">
        </VueMultiselect>
        <div class="btn-container">
            <button type="button" class="btn btn-secondary boldText" @click="openChat">select</button>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from '@/stores/User';
import { onBeforeMount, ref, watch } from 'vue';
import VueMultiselect from 'vue-multiselect';

const store = useUserStore();
let groupValue = ref([]);
let groupOptions = ref([]);

onBeforeMount(async () => {
    await setAndFetchGroupDetails();
});

async function setAndFetchGroupDetails() {
    const response = await store.fetchGroupDetails();
    store.setGroupDetails(response);
    setGroupValues();
}

function setGroupValues() {
    console.log("testing");
    store.groupDetails.forEach((value) => {
        if (isUserAvailableInThisGroup(value.userId, store?.userData?.userDetails?.id)) {
            groupOptions.value.push({ name: value.groupName, id: value._id });
        }
    })
}

function isUserAvailableInThisGroup(userIdList, userId) {
    let isAvailable = false
    userIdList.forEach((value)=> {
        if(value._id == userId) {
            isAvailable = true;
        }
    });
    return isAvailable;
}

async function openChat() {
    alert('selected a group for chat');
}
</script>
<style></style>