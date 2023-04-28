<template>
    <div class="notifications-container">
        <div v-if="isNotificationAvailable">
            <vaadin-tabsheet>
                <vaadin-tabs selected="0" slot="tabs">
                    <vaadin-tab v-if="isUnreadNotificaitonAvailable" id="unread">
                        Unread Notifications
                    </vaadin-tab>
                    <vaadin-tab v-if="isReadNotificaitonAvailable" id="read">
                        Read Notifications
                    </vaadin-tab>
                </vaadin-tabs>
                <div tab="unread">
                    <table class="table boldText">
                        <thead>
                            <tr class="table-header boldText">
                                <th scope="col" class="boldText">Date</th>
                                <th scope="col" class="boldText">Description</th>
                                <th scope="col" class="boldText"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="notification in unReadNotification">
                                <th scope="row">
                                    {{ notification.createdTime }}
                                </th>
                                <td>{{ notification.description }}</td>
                                <td class="boldText"> <a v-on:click.prevent.stop="handleClick(notification)"
                                        class="boldText">markAsRead</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div tab="read">
                    <table class="table boldText">
                        <thead class="boldText">
                            <tr class="table-header boldText">
                                <th scope="col" class="boldText">Date</th>
                                <th scope="col" class="boldText">Description</th>
                            </tr>
                        </thead>
                        <tbody class="boldText">
                            <tr v-for="notification in readNotifcation">
                                <th scope="row">
                                    {{ notification.createdTime }}
                                </th>
                                <td>{{ notification.description }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </vaadin-tabsheet>
        </div>
        <div v-else>
            <h1>
                You have no notifications yet
            </h1>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { computed, onBeforeMount } from "vue";
import swal from 'sweetalert';
// import '@vaadin/tabsheet/src/vaadin-tabsheet.js';
// import '@vaadin/tabsheet/theme/lumo/vaadin-tabsheet.js';
import '@vaadin/tabsheet/theme/material/vaadin-tabsheet.js';

const store = useUserStore();

onBeforeMount(async () => {
    await refreshNotification();
});

async function refreshNotification() {
    const response = await store.getNotificationByUserId(store.userData?.userDetails.id);
    store.setNotifications(response);
}
const isNotificationAvailable = computed(() => {
    return store?.notifications?.length > 0;
});

const isUnreadNotificaitonAvailable = computed(() => {
    const unReadNotificationList = store?.notifications?.filter((element) => element.isRead == false);
    return unReadNotificationList.length > 0;
});

const isReadNotificaitonAvailable = computed(() => {
    const ReadNotificationList = store?.notifications?.filter((element) => element.isRead == true);
    return ReadNotificationList.length > 0;
});

const unReadNotification = computed(() => {
    return store?.notifications?.filter((element) => element.isRead == false);
});

const readNotifcation = computed(() => {
    return store?.notifications?.filter((element) => element.isRead == true);
})

async function handleClick(notification) {
    let notificationUpdatePayload: any = {
        "notificationId": notification._id,
        "isRead": true
    }
    const response = await store.updateNotifcations(notificationUpdatePayload);
    if (response._id == notificationUpdatePayload.notificationId || response._id !== null) {
        swal("Success!", "notification updated successfully", "success");
        // alert('notification updated successfully');
        await refreshNotification();
    }
    else {
        swal("Oops!", "notification updation failed!", "error");
        // alert('notification updation failed');
    }
}
</script>
<style scoped>
.notifications-container {
    margin: 30px;
}

::v-deep vaadin-tab {
        height: 50px; /* Set the desired height here */
      }
</style>