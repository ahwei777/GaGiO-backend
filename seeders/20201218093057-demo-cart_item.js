'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cart_items', [{
      UserId: 1,
      CourseId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      UserId: 1,
      CourseId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      UserId: 1,
      CourseId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
