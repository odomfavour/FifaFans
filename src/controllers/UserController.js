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
         const { user_uuid } = req.query;
         const user = await helperMethods.getAUserByUuid(User, user_uuid);
         if (!user) return sendErrorResponse(res, 404, 'User not found');
         return sendSuccessResponse(res, 200, user);
      } catch (e) {
          console.log(e);
          return sendErrorResponse(res, 500, 'An error occurred viewing user details');
      }
  }
};

export default UserController;
