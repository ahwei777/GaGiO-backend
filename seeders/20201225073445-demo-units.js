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
              {
                id: 1,
                title: "Writing a React component",
                discription: "test",
                videoUrl: "https://www.youtube.com/watch?v=0lrHhK5wYgo",
              },
              { id: 2, title: "React life-cycle" },
              { id: 3, title: "The React state" },
              {
                id: 4,
                title: "Understanding component props and re-rendering",
              },
              { id: 5, title: "Importing CSS into React components" },
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
