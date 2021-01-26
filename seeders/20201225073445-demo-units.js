'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Units',
      [
        {
          CourseId: 1,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: 'Writing a React component',
              description: 'test',
              videoUrl: 'https://www.youtube.com/watch?v=0lrHhK5wYgo',
            },
            { id: 2, title: 'React life-cycle' },
            { id: 3, title: 'The React state' },
            {
              id: 4,
              title: 'Understanding component props and re-rendering',
            },
            { id: 5, title: 'Importing CSS into React components' },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 2,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: 'Writing a React component',
              description: 'test',
              videoUrl: 'https://www.youtube.com/watch?v=0lrHhK5wYgo',
            },
            { id: 2, title: 'React life-cycle' },
            { id: 3, title: 'The React state' },
            {
              id: 4,
              title: 'Understanding component props and re-rendering',
            },
            { id: 5, title: 'Importing CSS into React components' },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 3,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: 'Writing a React component',
              description: 'test',
              videoUrl: 'https://www.youtube.com/watch?v=0lrHhK5wYgo',
            },
            { id: 2, title: 'React life-cycle' },
            { id: 3, title: 'The React state' },
            {
              id: 4,
              title: 'Understanding component props and re-rendering',
            },
            { id: 5, title: 'Importing CSS into React components' },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 4,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: 'Writing a React component',
              description: 'test',
              videoUrl: 'https://www.youtube.com/watch?v=0lrHhK5wYgo',
            },
            { id: 2, title: 'React life-cycle' },
            { id: 3, title: 'The React state' },
            {
              id: 4,
              title: 'Understanding component props and re-rendering',
            },
            { id: 5, title: 'Importing CSS into React components' },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 5,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: 'Writing a React component',
              description: 'test',
              videoUrl: 'https://www.youtube.com/watch?v=0lrHhK5wYgo',
            },
            { id: 2, title: 'React life-cycle' },
            { id: 3, title: 'The React state' },
            {
              id: 4,
              title: 'Understanding component props and re-rendering',
            },
            { id: 5, title: 'Importing CSS into React components' },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 6,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: 'Writing a React component',
              description: 'test',
              videoUrl: 'https://www.youtube.com/watch?v=0lrHhK5wYgo',
            },
            { id: 2, title: 'React life-cycle' },
            { id: 3, title: 'The React state' },
            {
              id: 4,
              title: 'Understanding component props and re-rendering',
            },
            { id: 5, title: 'Importing CSS into React components' },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 7,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: 'Writing a React component',
              description: 'test',
              videoUrl: 'https://www.youtube.com/watch?v=0lrHhK5wYgo',
            },
            { id: 2, title: 'React life-cycle' },
            { id: 3, title: 'The React state' },
            {
              id: 4,
              title: 'Understanding component props and re-rendering',
            },
            { id: 5, title: 'Importing CSS into React components' },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 8,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: 'Writing a React component',
              description: 'test',
              videoUrl: 'https://www.youtube.com/watch?v=0lrHhK5wYgo',
            },
            { id: 2, title: 'React life-cycle' },
            { id: 3, title: 'The React state' },
            {
              id: 4,
              title: 'Understanding component props and re-rendering',
            },
            { id: 5, title: 'Importing CSS into React components' },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 9,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: 'Writing a React component',
              description: 'test',
              videoUrl: 'https://www.youtube.com/watch?v=0lrHhK5wYgo',
            },
            { id: 2, title: 'React life-cycle' },
            { id: 3, title: 'The React state' },
            {
              id: 4,
              title: 'Understanding component props and re-rendering',
            },
            { id: 5, title: 'Importing CSS into React components' },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Courses', null, {});
  },
};
