import express from 'express';
import Auth from './../middleware/Auth';
import PersonalMessageController from './../controllers/PersonalMessageController';

const router = express.Router();
router.get('/list-friend-message', Auth, PersonalMessageController.getChats);
router.get('/list-my-messages', Auth, PersonalMessageController.getFriendsMessages);

export default router;
