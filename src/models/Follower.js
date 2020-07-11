'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_uuid: DataTypes.UUID,
    follower_uuid: DataTypes.UUID,
    blocked: DataTypes.BOOLEAN,
    messaged: DataTypes.BOOLEAN,
  }, {});
  Follower.associate = function(models) {
    Follower.belongsTo(models.User, {
      foreignKey: 'user_uuid',
      as: 'User'
    })

    Follower.belongsTo(models.User, {
      foreignKey: 'follower_uuid',
      as: 'Follower'
    })
    Follower.belongsTo(models.Profile, {
      foreignKey: 'follower_uuid',
      as : 'Profile',
      targetKey: 'user_uuid'
    })
  };
  return Follower;
};