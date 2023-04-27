<template>
    <div>
        <div>
            <label class="typo__label boldText margin-top">Select an user to search course details</label>
            <VueMultiselect
                    v-model="userValues" placeholder="Search an User" label="name" track-by="id"
                    :options="userOptions" :multiple="false" :taggable="false">
            </VueMultiselect>
        </div>
        <div class="align-center">
            <button type="submit" class="btn btn-default button-add-course boldText" @click="search">Search</button>
        </div>
        <div v-if="isLoaded">
            <CourseDetail :isViewingMyCourse=false></CourseDetail>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import CourseDetail from './courseDetail.vue';
import { onBeforeMount, ref } from 'vue';
import VueMultiselect from 'vue-multiselect';
import swal from 'sweetalert';

const store = useUserStore();

const isLoaded = ref(false);
let userValues = ref([]);
let userOptions = ref([]);

onBeforeMount(async()=> {
    const userReponse = await store.fetchUserDetails();
    store.setUserList(userReponse);
    setUserValues();
});

async function search() {
    if(userValues.value.id) {
        const response = await store.getCourseByUserId(userValues.value.id);
        store.setCourses(response);
        isLoaded.value = true;
    } else {
        swal("Oops!", "Select an user!", "error");
        // alert('select an user');
    }
}

function setUserValues() {
    store.userList.forEach((value) => {
        userOptions.value.push({name: value.name, id: value._id});
        userOptions.value.push({name: value.rollNumber, id: value._id});
    })
}
</script>
<style>
.margin-top{
    margin-top: 20px;
}
</style>