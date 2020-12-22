'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Teachers', [{
      UserId: 1,
      name: '管理員兼職老師',
      description: '首次開課，請大家多多指教',
      avatarUrl: 'https://i.imgur.com/1e41zbm.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Teachers', null, {});
  }
};
