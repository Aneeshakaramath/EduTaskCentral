const express = require('express');
const notificationController = require('../controllers/notification');

const router = express.Router();

router.get('/', notificationController.getAllNotification);

router.post('/', notificationController.addNotification);

router.post('/status', notificationController.updateNotification);

router.get('/user/:userId', notificationController.getNotificationByUserId);

module.exports = router;