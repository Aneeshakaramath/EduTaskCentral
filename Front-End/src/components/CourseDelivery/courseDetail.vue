<template>
    <div>
        Course Detail
        <div v-if="courseDetails.length > 0">
            <div class="col-sm" v-for="courseDetail in courseDetails">
                {{  courseDetail.name }}
            </div>
        </div>
        <div v-else>
            No Course Added Yet
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/User';

const store = useUserStore();

const courseDetails = computed(() => {
    return store.courses;
})


</script>
<style></style>