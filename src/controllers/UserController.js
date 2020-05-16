import model from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import helperMethods from './../utils/helpers';
const { User, Profile } = model;

const UserController = {
  async searchUsers(req, res) {
      try {
        const { input } = req.query;
        const users = await helperMethods.searchForUser(User, input);
        return sendSuccessResponse(res, 200, users);
      } catch (e) {
          console.log(e);
          return sendErrorResponse(res, 500, 'An error occurred finding user');
      };
  },
  
  // view a user detail
  async viewUserDetails(req, res) {
      try {
         let id;
         let uuid;
         if (req.userData) {
          uuid = req.userData.uuid
         }
        //  const { uuid } = req.userData;
         const { user_uuid } = req.query;
         if (!user_uuid) {
           id = uuid;
         } else {
           id = user_uuid
         }
         const user = await helperMethods.getAUserByUuid(User, id);
         if (!user) return sendErrorResponse(res, 404, 'User not found');
        //  return sendSuccessResponse(res, 200, user);
        return res.render('friendprofile', { user });
      } catch (e) {
          console.log(e);
          return sendErrorResponse(res, 500, 'An error occurred viewing user details');
      }
  }
};

export default UserController;
