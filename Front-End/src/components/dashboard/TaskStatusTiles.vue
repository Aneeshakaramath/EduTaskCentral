<template>
    <div class="status-tile-message-container boldText">
        <div class="flex-box-row">
            <div class="totalTask flex-box-row all">
                <div>
                    <img class="image-size" src="@/assets/images/total.png" />
                </div>
                <div class="flex-box-column">
                    <div class="margin-auto bold-text">{{ totalTask }}</div>
                    <div class="margin-auto task-status-header bold-text">Total Task</div>
                </div>
            </div>
            <div class="totalTask flex-box-row margin-left-tiles inprogress">
                <div>
                    <img class="image-size" src="@/assets/images/inprogress.png" />
                </div>
                <div class="flex-box-column">
                    <div class="margin-auto bold-text">{{ InProgress }}</div>
                    <div class="margin-auto task-status-header bold-text">Inprogress</div>
                </div>
            </div>
            <div class="totalTask flex-box-row margin-left-tiles todo">
                <div>
                    <img class="image-size" src="@/assets/images/todo.png" />
                </div>
                <div class="flex-box-column">
                    <div class="margin-auto bold-text">{{ TODO }}</div>
                    <div class="margin-auto task-status-header bold-text">To-do</div>
                </div>
            </div>
            <div class="totalTask flex-box-row margin-left-tiles done">
                <div>
                    <img class="image-size" src="@/assets/images/done.png" />
                </div>
                <div class="flex-box-column">
                    <div class="margin-auto bold-text">{{ Done }}</div>
                    <div class="margin-auto task-status-header bold-text">Done</div>
                </div>
            </div>
            <!--<div class="flex-box-column">
                <div class="totalTask flex-box-row">
                    <div>
                        <img class="dashboard-logo" src="@/assets/images/total.png"/>
                    </div>
                    <div class="flex-box-column">
                        <div class="margin-auto">{{  totalTask }}</div>
                        <div class="margin-auto">Total Task</div>
                    </div>
                </div>
                <div>
                    {{  pendingTask }}
                </div>
            </div>
            <div class="flex-box-column">
                <h1 class="margin-auto">Welcome to you Dashboard!</h1>
                <div class="margin-auto">
                    You have {{ pendingTask }} number of tasks pending. You already completed % of task assigned to you
                </div>
            </div>-->
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { computed } from 'vue';

const store = useUserStore();


const InProgress = computed(() => {
    let filteredArray = [];
    if (store.userData?.taskAssignedToMe) {
        filteredArray = store.userData.taskAssignedToMe.filter(function (task) {
            return task != null && task.taskStatus !== 'IN PROGRESS';
        })
    }
    return filteredArray.length;
});

const TODO = computed(()=> {
    let filteredArray = [];
    if (store.userData?.taskAssignedToMe) {
        filteredArray = store.userData.taskAssignedToMe.filter(function (task) {
            return task != null && task.taskStatus !== 'TO DO';
        })
    }
    return filteredArray.length;
})

const Done = computed(()=> {
    let filteredArray = [];
    if (store.userData?.taskAssignedToMe) {
        filteredArray = store.userData.taskAssignedToMe.filter(function (task) {
            return task != null && task.taskStatus !== 'DONE';
        })
    }
    return filteredArray.length;
})
const totalTask = computed(() => {
    return store.userData?.taskAssignedToMe?.length || 0;
});


</script>
    
<style scoped>
.status-tile-message-container {
    background-color: transparent;
    margin-top: 10px;
    margin-bottom: 10px;
}

.flex-box-row {
    align-items: center;
    display: flex;
    flex-direction: row;
}

.flex-box-column {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    color: white;
}

.totalTask {
    height: 90px;
    border-radius: 8px;
    font-size: 25px;
    width: 100%;
}

.all {
    background-image: linear-gradient(to right, #9733EE 0%, #DA22FF 51%);
}

.inprogress {
    background-image: linear-gradient(to right, #F2994A 0%, #F2C94C  51%, #F2994A  100%);
}

.todo {
    background-image: linear-gradient(to right, #6190E8 0%, #A7BFE8  51%, #6190E8  100%);
}

.done {
    background-image: linear-gradient(to right, #DCE35B 0%, #45B649  51%, #DCE35B  100%);
}
.margin-left-tiles {
    margin-left: 5px;
}
.image-size {
    width: 50px;
    height: 50px;
    padding-left: 5px;
}

.task-status-header {
    font-size: 15px;
}

.bold-text {
    font-weight: bold;
}
</style>
    