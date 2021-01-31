'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Teachers',
      [
        {
          UserId: 3,
          name: 'MDN Web Docs',
          description:
            'MDN Web Docs（舊稱Mozilla Developer Network、Mozilla Developer Center，簡稱MDN）是一個匯集眾多Mozilla基金會產品和網路技術開發文件的免費網站。 From Wikipedia',
          avatarUrl: 'https://i.imgur.com/15lky0X.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserId: 4,
          name: '忍者',
          description:
            '忍者是日本自鎌倉時代至江戶時代（約1185年到1867年）出現的一種特殊職業身份，其工作類似現代的間諜與情報人員。「忍」即「隱」，有漢語詞「隱忍」。忍者們接受忍術（即秘密行動的技術）的訓練，主要從事間諜活動。像日本武士的武士道一樣，忍者也遵循一套自己引以為榮的專門規範（忍道）但受中國許多道家方士學說影響，忍者最常用的咒語「臨兵闘者皆陣列在前」九字護身法就是出自中國丹道大家葛洪的《抱朴子》一書。 From Wikipedia',
          avatarUrl: 'https://i.imgur.com/kJZf526.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserId: 5,
          name: 'Holi 程式導師',
          description:
            '小時候開始自學程式，考大學時因為討厭物理化學所以念了個與程式不相干的文組科系，唸到大二就休學出去工作了。在新加坡工作過兩年半，是專職的前端工程師。 一直都對教學有很大的熱忱，相信把話講得清楚又明白是一種專業，相信分享與交流可以讓世界更美好。',
          avatarUrl: 'https://i.imgur.com/u7lJGtA.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Teachers', null, {});
  },
};
