import express from 'express';
import Auth from './../middleware/Auth';
import RoomController from './../controllers/RoomController';

const router = express.Router();
router.post('/create-room', Auth, RoomController.createRoom);
router.get('/list-rooms', Auth, RoomController.getListOfGroups);
router.get('/list-user-rooms', Auth, RoomController.getMyGroups);

export default router;
