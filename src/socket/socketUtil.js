import { generateNotification } from './messages';

const sendPersonalSms = async (socket_id, user_uuid, message, io) => {
  try {
    await io.to(socket_id).emit('message', generateNotification(user_uuid, message));
    // await io.emit('jobNotification', generateNotification(job_uuid, message));// this is for test
  } catch (error) {
    console.log(error);
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  sendPersonalSms,
};