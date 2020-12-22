"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "test@gmail.com",
          password:
            "$2b$10$wLehO8BxvecD6pustyiJTuo73i8hYTAtT3ZLglfZdQXUf..VjD.M.", //Aa123456
          nickname: "test",
          AuthTypeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Users", null, {});
  },
};
