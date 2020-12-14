"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Auth_types",
      [
        {
          name: "一般會員",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "開課者",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "管理員",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("People", null, {});
  },
};
