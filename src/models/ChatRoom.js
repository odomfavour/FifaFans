'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define('ChatRoom', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    icon: DataTypes.STRING,
    visibility: DataTypes.STRING
  }, {});
  ChatRoom.associate = function(models) {
    // associations can be defined here
    ChatRoom.hasMany(models.ChatRoomMember, {
      foreignKey: 'chatroom_uuid', sourceKey: 'uuid', as: 'members'
    })
  };
  return ChatRoom;
};
