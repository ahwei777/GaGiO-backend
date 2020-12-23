'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Courses', [
       {
       title: '從零開始學習 HTML',
       description: '教到你會',
       price: 1000,
       imgUrl: 'https://i.imgur.com/q4rE8Sd.jpg',
       TeacherId: 1,
       isPublic: true,
       deletedAt: null,
       createdAt: new Date(),
       updatedAt: new Date(),
     },
    {
      title: '初級 JavaScript',
      description: '教到你會',
      price: 2000,
      imgUrl: 'https://i.imgur.com/jMwZsxx.jpg',
      TeacherId: 1,
      isPublic: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: '中級 JavaScript',
      description: '教到你會',
      price: 1000,
      imgUrl: 'https://i.imgur.com/jMwZsxx.jpg',
      TeacherId: 1,
      isPublic: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: '進階 JavaScript',
      description: '教到你會',
      price: 1000,
      imgUrl: 'https://i.imgur.com/jMwZsxx.jpg',
      TeacherId: 1,
      isPublic: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'React 入門',
      description: '教到你會',
      price: 1000,
      imgUrl: 'https://i.imgur.com/jMwZsxx.jpg',
      TeacherId: 1,
      isPublic: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'React 進階',
      description: '教到你會',
      price: 2000,
      imgUrl: 'https://i.imgur.com/jMwZsxx.jpg',
      TeacherId: 1,
      isPublic: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'React 實作',
      description: '教到你會',
      price: 3000,
      imgUrl: 'https://i.imgur.com/jMwZsxx.jpg',
      TeacherId: 1,
      isPublic: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'React Redux',
      description: '教到你會',
      price: 5000,
      imgUrl: 'https://i.imgur.com/jMwZsxx.jpg',
      TeacherId: 1,
      isPublic: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: '籌備中課程',
      description: '敬請期待',
      price: 1000,
      imgUrl: 'https://i.imgur.com/jMwZsxx.jpg',
      TeacherId: 1,
      isPublic: false,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
