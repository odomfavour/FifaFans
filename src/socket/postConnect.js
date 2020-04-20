import models from '../models';
import helperMethods from '../utils/helpers';
const { ChatRoom, ChatRoomMember, RoomChat, Socket, User, Post } = models;
export default async function (socket, io, user){
  // a user joins a room onces
  socket.on('post-comment', async (data) => {
    try {
        console.log(data);
      const { post_uuid, post } = data;
      io.emit('comments', { post, post_uuid, user, date: Date() })
    } catch (error) {
        console.log(error);
    }
  })
};
