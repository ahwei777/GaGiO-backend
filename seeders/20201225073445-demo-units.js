"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Units",
      [
        {
          CourseId: 1,
          TeacherId: 1,
          unit_list: JSON.stringify({
            unit_list: [
              { id: 1, unitTitle: "Writing a React component" },
              { id: 2, unitTitle: "React life-cycle" },
              { id: 3, unitTitle: "The React state" },
              {
                id: 4,
                unitTitle: "Understanding component props and re-rendering",
              },
              { id: 5, unitTitle: "Importing CSS into React components" },
            ],
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Courses", null, {});
  },
};
