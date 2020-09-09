module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.addColumn(
      'Followers',
      'messaged',
      {
        type: Sequelize.BOOLEAN,
      },
    ),
  
    down: (queryInterface, Sequelize) => queryInterface.removeColumn(
      'Followers',
      'messaged',
      {
        type: Sequelize.BOOLEAN,
      },
    ),
  };