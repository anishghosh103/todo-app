const express = require('express');

const auth = require('../../middlewares/auth');
const controller = require('../../controllers/users');

const router = express.Router();

router.get('/', auth, controller.getAllUsers);
router.get('/auth-status', auth, controller.getAuthStatus);
router.get('/lists', auth, controller.getLists);
router.get('/notifications', auth, controller.getNotifications);
router.get('/:id', auth, controller.getUserById);
router.get('/:id/lists', auth, controller.getListsOfUser);
router.get('/:id/friends', auth, controller.getFriendsOfUser);
router.get('/:id/friend-status', auth, controller.getFriendStatus);

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.post('/logout', auth, controller.logout);
router.post('/forgot-password', controller.forgotPassword);
router.post('/activate', controller.activateUser);

router.put('/reset-password', controller.resetPassword);
router.put('/:id/send-friend-request', auth, controller.sendFriendRequest);
router.put('/:id/accept-friend-request', auth, controller.acceptFriendRequest);
router.put('/:id/reject-friend-request', auth, controller.rejectFriendRequest);
router.put('/:id/unfriend', auth, controller.unfriend);

// COULDDO:
// router.delete('/', controller.deleteUser);
router.delete('/notifications', auth, controller.deleteAllNotifications);
router.delete('/notifications/:id', auth, controller.deleteNotificationById);

module.exports = router;