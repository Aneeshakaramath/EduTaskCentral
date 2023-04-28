<template>
    <div>
        <label class="typo__label boldText">Select a group</label>
        <VueMultiselect v-model="groupValue" tag-placeholder="Select a group" placeholder="Search" label="name"
            track-by="id" :options="groupOptions" :multiple="false" :taggable="false">
        </VueMultiselect>
        <div class="btn-container">
            <button type="button" class="btn btn-secondary boldText" @click="openChat">select</button>
        </div>
        <div class="comments-container boldText" v-if="showCommentsForSelectedGroup">
            <div class="comment-container boldText" v-if="commentsById.length > 0" v-for="comment in commentsById">
                <span class="boldText"> Messaged By : {{  comment.commentedBy.name }}</span>
                <textarea class="form-control boldText" :value="comment.description" id="exampleFormControlTextarea1" rows="2" readonly></textarea>
            </div>
            <div class="comment-container boldText">
                <span class="boldText"> Add New Message </span>
                <textarea class="form-control boldText" v-model="newComment" id="exampleFormControlTextarea1" rows="2">
                </textarea>
                <div class="align-center boldText">
                    <button type="submit" class="btn btn-default add-comments boldText" @click="addComment">Send</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from '@/stores/User';
import { onBeforeMount, ref, computed } from 'vue';
import VueMultiselect from 'vue-multiselect';
import swal from 'sweetalert';

const store = useUserStore();
let groupValue = ref([]);
let groupOptions = ref([]);
let showCommentsForSelectedGroup = ref(false);
let newComment = ref('');
let currentGroupId = ref('');

onBeforeMount(async () => {
    await setAndFetchGroupDetails();
});

async function setAndFetchGroupDetails() {
    const response = await store.fetchGroupDetails();
    store.setGroupDetails(response);
    setGroupValues();
}

const commentsById = computed(() => {
    return store.commentForSelectedGroup;
})

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
    if(groupValue?.value?.id) {
        currentGroupId.value = groupValue.value.id;
        const response = await store.fetchCommentsForSelectedGroup(groupValue.value.id);
        store.setCommentForSelectedGroup(response);
        showCommentsForSelectedGroup.value = true;
    } else {
        swal("Oops!", "Select a group!", "error");
    }
}

async function addComment() {
    console.log(newComment);
    let commentPayload = {
        description : newComment.value,
        commentedBy : store.userData?.userDetails.id,
        groupId: currentGroupId.value
    }
    console.log(commentPayload);
    const response = await store.addCommentsForGorup(commentPayload);
    if(response.commentedBy == commentPayload.commentedBy || response.commentedBy) {
        swal("Success!", "comment Added", "success");
        // alert('comment Added');
        newComment.value = '';
        const response = await store.fetchCommentsForSelectedGroup(commentPayload.groupId);
        store.setCommentForSelectedGroup(response);
    }
}

</script>
<style>
.comment-container {
    margin: 10px;
    border: 1px black solid;
    padding: 15px;
}

.add-comments {
    margin: 20px;
    align-content: center;
    background-color: lightskyblue;
}

.comments-heading-label {
    font-weight: 700;
    margin-left: 20px;
    margin-top: 30px;
}

.comments-container {
    margin: 10px;
}
</style>