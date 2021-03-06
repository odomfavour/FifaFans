import express from 'express';
import AuthController from './../controllers/AuthController';
import Auth from './../middleware/Auth';

const userRouter = express.Router();

const prfx = 'auth';

userRouter.post(`/${prfx}/signup`, AuthController.signup);
userRouter.post(`/${prfx}/signin`, AuthController.signin);
userRouter.get(`/${prfx}/me`, Auth, AuthController.me);
userRouter.get(`/${prfx}/verification/:token/:email/:id`, AuthController.verifyUser);
userRouter.post(`/${prfx}/forgetpassword`, AuthController.forgetPassword);
userRouter.get(`/${prfx}/verifypassword/:token/:email/:id`, AuthController.verifyPasswordLink);
userRouter.post(`/${prfx}/resetpassword`, Auth, AuthController.resetPassword);
userRouter.patch(`/${prfx}/updateprofile`, Auth, AuthController.updateUser);
userRouter.post(`/${prfx}/refresh-email-token`, AuthController.getNewEmailToken);
userRouter.get(`/${prfx}/form/validations`, AuthController.getAllUserUsernameAndEmail);

export default userRouter;
