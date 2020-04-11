import models from '../models';
import { joinGroup, sendMessageToGroup} from './socketUtil';

const { ChatRoom, ChatRoomMember, RoomChat, Socket, User } = models;
export default async function (socket, io, user){
  socket.on('join-room', (data) => {
    try {
      const { group_uuid } = data;
      joinGroup(group_uuid, user, socket, io);
      socket.on(`${group_uuid}-message`, (data) => {
        const { message, group_id, parent_uuid } = data;
        sendMessageToGroup(group_id, message, user, io, parent_uuid);
      })
    } catch (error) {
        console.log(error);
    }
  })
};
