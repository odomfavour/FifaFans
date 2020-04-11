import { socketAuth } from '../middleware/socketAuth';
import models from '../models';

const emmiter = require('./EventHandler');

const { Socket } = models;
export default (io) => {
  // let onlineSockets = [];
  if (io) {
    io.on('connection', async (socket) => {
      let user = 'anonymous';
      const { handshake } = socket;
      socket.on('authenticate', async (data) => {
        try {
          const header = data.token;
          user = await socketAuth(header);
          const token = await Socket.findOne({ where: { user_uuid: user.uuid } });
          if (token) {
            await Socket.update({ socket_id: socket.id },
              {
                returning: true,
                where: {
                  user_uuid: user.uuid,
                },
              });
          } else {
            await Socket.create({ user_uuid: user.uuid, socket_id: socket.id });
          }
        } catch (error) {
          console.log(error);
        }
      });
      if (handshake.headers.token) {
        const header = handshake.headers.token;
        if (header) {
          user = await socketAuth(header);
          // await saveSocketId(user.uuid, socket.id);
          try {
            const token = await Socket.findOne({ where: { user_uuid: user.uuid } });
            if (token) {
              await Socket.update({ socket_id: socket.id },
                {
                  returning: true,
                  where: {
                    user_uuid: user.uuid,
                  },
                });
            } else {
              await Socket.create({ user_uuid: user.uuid, socket_id: socket.id });
            }
          } catch (error) {
            console.log(error);
          }
        }
      }

      emmiter.default(io);
      
      // Disconnect event
      socket.on('disconnect', (reason) => {
        // Clean-up, set socket_id for the user to null
      });
    });
  }
};