import model from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import helperMethods from './../utils/helpers';
import uploadImage from './../services/imageuploader';
const { User, Profile, Post, Friend, ChatRoom, ChatRoomMember } = model;


const RoomController = {
  async createRoom(req, res) {
    try {
        const { uuid } = req.userData;
        if(!uuid) return res.status(403).send('Access denied');
        const { groupname, description } = req.body;
        if (!groupname && !description) return sendErrorResponse(res, 409, 'Groupname and description cannot be empty!!!');
        const group = await ChatRoom.create({
            name: groupname,
            description,
            icon:'https://res.cloudinary.com/psirius-eem/image/upload/v1569882118/phznouadimmqzj09zhg4.jpg',
            visibility: 'private',
        });
        if(!group) return sendErrorResponse(res, 500, 'Failed to create group please try again later');
        const groupMember = await ChatRoomMember.create({
            chatroom_uuid: group.dataValues.uuid,
            member_uuid: uuid,
            is_banned: false,
        });
          return sendSuccessResponse(res, 200, 'Successfully created a group');
        } catch (error) {
          return sendErrorResponse(res, 500, error);
        }
        },

           /**this method handles the listing of groups
         * @param req this is the incoming request
         * @param res this is the response after the request have been implemented
         */
        async getListOfGroups (req, res){
            try {
            const { uuid } = req.userData;
              if(!uuid) return res.status(403).send('Access denied');
              const groups = await  ChatRoom.findAll();      
              return sendSuccessResponse(res, 200, { message:'Success', data: groups });
            } catch (error) {
              return res.status(500).send(error);
            }
            
        },

         /**this method handles the listing of users group
         * @param req this is the incoming request
         * @param res this is the response after the request have been implemented
         */
        async getMyGroups (req, res){
            try {
            const { uuid } = req.userData;
              if(!uuid) return res.status(403).send('Access denied');
              const groups = await helperMethods.getUserGroups(uuid, ChatRoomMember);     
              return sendSuccessResponse(res, 200, { message:'Success', data: groups })
            } catch (e) {
              console.log(e);
              return res.status(500).send(e);
            }
            
       },
};

export default RoomController;
