import model from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import helperMethods from './../utils/helpers';
import uploadImage from './../services/imageuploader';
const { User, Profile, Post, Friend, ChatRoom, ChatRoomMember, RoomChat, Follower } = model;


const PersonalMessageController = {
         /**this method handles listing chats between two users
         * @param req this is the incoming request
         * @param res this is the response after the request have been implemented
         */
        async getChats(req, res) {
          try {
              const { uuid } = req.userData;
              const { follower_uuid } = req.query;
              const data = await helperMethods.getChats(uuid, follower_uuid); 
              return sendSuccessResponse(res, 200, data);
            } catch (e) {
              console.log(e);
              return sendErrorResponse(res, 500, e);
            }
        },

        async getFriendsMessages(req, res) {
          try {
            const { uuid } = req.userData;
            const data = await helperMethods.listAllFollowersMessages(Follower, uuid);
            return sendSuccessResponse(res, 200, data);
          } catch (error) {
            console.log(error)
            return sendErrorResponse(res, 500, error);
          }
        }
        
};

export default PersonalMessageController;
