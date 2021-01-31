"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "user@mail.com",
          password:
            "$2b$10$wLehO8BxvecD6pustyiJTuo73i8hYTAtT3ZLglfZdQXUf..VjD.M.", //Aa123456
          nickname: "測試用 user",
          AuthTypeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "admin@mail.com",
          password:
            "$2b$10$MAcFEavjRaCu7oO6XiFwK.oUQnuPufuUe9HZksyHArYZccK4nidE2", //Admin123
          nickname: "測試用 admin",
          AuthTypeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "teacher_mdn@mail.com", // id 3
          password:
            "$2b$10$wLehO8BxvecD6pustyiJTuo73i8hYTAtT3ZLglfZdQXUf..VjD.M.", //Aa123456
          nickname: "teacher_mdn",
          AuthTypeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "teacher_ninja@mail.com", // id 4
          password:
            "$2b$10$wLehO8BxvecD6pustyiJTuo73i8hYTAtT3ZLglfZdQXUf..VjD.M.", //Aa123456
          nickname: "teacher_ninja",
          AuthTypeId: 2,
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
