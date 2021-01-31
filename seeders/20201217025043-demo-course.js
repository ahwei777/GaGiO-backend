'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Courses',
      [
        {
          // 1
          title: 'Web 入門',
          description:
            '〈Web 入門〉是一系列簡潔的文章，介紹網頁開發的實用範例。你將運用相關工具建構簡易網頁並發布自己的程式碼。 From https://developer.mozilla.org/zh-TW/docs/Learn/Getting_started_with_the_web',
          price: 99,
          imgUrl: 'https://i.imgur.com/DObASap.jpg',
          TeacherId: 1,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 2
          title: 'HTTP 入門',
          description:
            '超文本傳輸協定 (HTTP) 是一種用來傳輸超媒體文件 (像是HTML文件) 的應用層協定，被設計來讓瀏覽器和伺服器進行溝通，但也可做其他用途。HTTP 遵循標準客戶端—伺服器模式，由客戶端連線以發送請求，然後等待接收回應。HTTP 是一種無狀態協定，意思是伺服器不會保存任兩個請求間的任何資料 (狀態)。儘管作為 TCP/IP 的應用層，HTTP 亦可應用於其他可靠的傳輸層 (例如 UDP)，只要不會無聲無息地遺失訊息即可。',
          price: 39,
          imgUrl: 'https://i.imgur.com/AZIl7tv.jpg',
          TeacherId: 1,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 3
          title: 'HTML 入門',
          description:
            '本質上，HTML 是一種非常簡單的語言，由元素所組成。元素可以賦予文字片段不同的意義 (比方說，將它們描述成段落、項目清單，或是表格的一部分)、將文件組織成不同的邏輯區段 (如標頭(header)、三行的內文，或是導覽目錄)，以及在網頁中嵌入圖片或影片等內容。在這個主題中我們將介紹前面兩項，並介紹基本概念以及語法以讓你了解 HTML。',
          price: 99,
          imgUrl: 'https://i.imgur.com/EjIxNs2.jpg',
          TeacherId: 1,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 4
          title: 'CSS 入門',
          description:
            '階層式樣式表（CSS）是學習完 HTML 之後，您應該學習的第一項技術。HTML 用於定義內容的架構與語意，CSS 則是用來設定樣式與佈局方式。舉例來說，您可以使用 CSS 來改變內容的字體、顏色、字型大小、間距、拆分成多欄，或是加入動畫和其他裝飾性質的特性。',
          price: 199,
          imgUrl: 'https://i.imgur.com/nDc7TKQ.jpg',
          TeacherId: 1,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 5
          title: 'JavaScript 入門',
          description:
            'JavaScript 程式語言可讓你在網頁上建構複雜的事物。當網頁不僅僅呆板呈現給你靜態的內容（像是即時的內容更新，互動式地圖、2D/3D 動畫、滑鼠操控影片播放…等等），你可以大膽猜測 JavaScript 已經參與其中。',
          price: 299,
          imgUrl: 'https://i.imgur.com/NMifpow.png',
          TeacherId: 1,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 6
          title: '忍者知識入門',
          description:
            '忍術是日本一種用來進行間諜和暗殺活動的技術，修練者稱為忍者，其包括了戰鬥、製造混亂和收集情報。忍術的訓練內容包括了偽裝、逃跑、隱藏、格鬥、地理學、醫學和爆破。忍術起源於平安時代末期，其發源地為伊賀地區。但受中國許多道家方士學說影響，忍者最常用的咒語「臨兵闘者皆陣列在前」九字護身法就是出自中國丹道大家葛洪的《抱朴子》一書。',
          price: 999,
          imgUrl: 'https://i.imgur.com/9alMrXB.png',
          TeacherId: 2,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 7
          title: '中忍考試衝刺班',
          description:
            '忍術是日本一種用來進行間諜和暗殺活動的技術，修練者稱為忍者，其包括了戰鬥、製造混亂和收集情報。忍術的訓練內容包括了偽裝、逃跑、隱藏、格鬥、地理學、醫學和爆破。忍術起源於平安時代末期，其發源地為伊賀地區。但受中國許多道家方士學說影響，忍者最常用的咒語「臨兵闘者皆陣列在前」九字護身法就是出自中國丹道大家葛洪的《抱朴子》一書。',
          price: 999,
          imgUrl: 'https://i.imgur.com/2ElHPJF.png',
          TeacherId: 2,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 8
          title: '上忍考試必勝班',
          description:
            '忍術是日本一種用來進行間諜和暗殺活動的技術，修練者稱為忍者，其包括了戰鬥、製造混亂和收集情報。忍術的訓練內容包括了偽裝、逃跑、隱藏、格鬥、地理學、醫學和爆破。忍術起源於平安時代末期，其發源地為伊賀地區。但受中國許多道家方士學說影響，忍者最常用的咒語「臨兵闘者皆陣列在前」九字護身法就是出自中國丹道大家葛洪的《抱朴子》一書。',
          price: 999,
          imgUrl: 'https://i.imgur.com/2ElHPJF.png',
          TeacherId: 2,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 9
          title: '程式基礎（上）',
          description:
            '這一週的學習目標是程式基礎，包括但不限於：變數、陣列、迴圈、判斷式以及函式（以 ES5 為例）。必須要強迫自己轉換成寫程式的思考模式，否則這一週對你來說會是惡夢。對於從來沒有接觸過類似思考模式的人可能會需要點時間，但只要慢慢練習，就會越來越進入狀況。還有一點請大家注意，程式是按照你寫的跑，不是按照你想的跑。當程式執行結果超出預期時，console.log是你的好朋友，可以把東西印出來看看是不是跟你想的一樣。',
          price: 199,
          imgUrl: 'https://i.imgur.com/sw8E15m.jpg',
          TeacherId: 3,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 10
          title: '程式基礎（下）',
          description:
            '在程式基礎的部分一週是絕對不夠的，因此本週會繼續加強程式基礎。在這一週裡面我們會延伸上一週的內容，並且多講一些有關於 ES6 的語法。本週的作業有自動批改系統，請傳到 Lidemy OJ 上，並且確認每一題都有答對之後再交作業，否則我會直接退件，最後，在這週也會講到 eslint，我已經幫大家設置好了 eslint，這是一個能夠幫你自動做語法檢查的工具，在每次 commit 之前都會自動檢查程式碼的規範，不符合規範的話不會讓你 commit。',
          price: 199,
          imgUrl: 'https://i.imgur.com/sw8E15m.jpg',
          TeacherId: 3,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 11
          title: '網路基礎',
          description:
            '無論是前端還是後端，身為一個網頁工程師，必須很清楚整個網路運作的輪廓。細節可以日後再研究，但一定要能掌握大方向以及重要概念，否則未來的路絕對會走得很崎嶇。在這週裡面我們會學到兩台電腦在網路上該怎麼溝通，從上層往下，再從底層往上，一步步建立起你對網路的世界觀。當然，只有理解是不夠的，我們也會用 Node.js 串接基本的 API，帶你熟練與網路相關的知識。',
          price: 199,
          imgUrl: 'https://i.imgur.com/CcNfOsc.jpg',
          TeacherId: 3,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 12
          title: '前端基礎 JavaScript',
          description:
            '這一週將會進入到 JavaScript，讓網頁變得有互動性，並結合 <form> 做表單驗證，以及讓大家寫出簡單的網頁應用程式。這會是我們第一次把 JavaScript 應用在網頁上，來學習怎麼使用 JavaScript 操控 DOM 物件，讓網頁動起來。',
          price: 199,
          imgUrl: 'https://i.imgur.com/YBF6epu.jpg',
          TeacherId: 3,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 13
          title: '前端基礎串 API',
          description:
            '之前在第四週時有提過 API，也有讓大家試著用 node.js 寫些小程式來串接。而前端當然也能串接 API，理解前後端如何串接是很重要的一部分，因此這週會花滿多心力再來講 API 串接，讓大家複習一下 API 的概念，並且教大家什麼是 Ajax。',
          price: 199,
          imgUrl: 'https://i.imgur.com/XXPes6a.jpg',
          TeacherId: 3,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 14
          title: '後端基礎 PHP 與 MySQL',
          description:
            '前端基礎打得差不多以後，就要進入後端的課程，這次課程會以 PHP 為主要的程式語言。這週的課程會講解 PHP 基本觀念、語法，並且教大家安裝設定 MySQL，寫出簡單的 CRUD 應用。',
          price: 199,
          imgUrl: 'https://i.imgur.com/jyz1sem.jpg',
          TeacherId: 3,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 15
          title: '資訊安全',
          description:
            '無論你是前端還是後端，都必須時時刻刻在心裡惦記著資訊安全的概念，總結為一句話就是：「不要相信任何來自 client 端的資料」，只要能做到這點，其實就可以阻止掉很多的惡意攻擊。因此這一週會繼續以留言板當作主軸，介紹非常非常重要的資訊安全相關概念。一段寫不好的程式碼，有可能就跟大門破了一個洞一樣，很輕易地就可以讓攻擊者入侵，不費吹灰之力。資訊安全真的要好好學，至少要知道原理以及防禦方法。',
          price: 199,
          imgUrl: 'https://i.imgur.com/6pjVts1.jpg',
          TeacherId: 3,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 16
          title: '前後端整合',
          description:
            '前幾週我們學會怎麼用後端 PHP 開發出一個網站，而在更早的第八週，我們學會了用 JavaScript 來串接 API，前端負責顯示資料，後端只負責提供資料。這一週要整合之前學到的東西，也就是說要自己開發出 API，然後讓自己寫的前端可以串接！因此，這週的內容可能會有點複雜，但我會先示範給你看，讓你理解到底這週的模式跟以往有何不同。這是非常重要的一週，但是只要能確實理解差異在哪裡，你就能把前後端的關係跟概念弄得很清楚。除此之外，也會教兩個新的前端工具：jQuery 與 Bootstrap，前者可以讓我們快速又方便地去操作 DOM，後者可以讓我們快速打造出乾淨漂亮的頁面。',
          price: 199,
          imgUrl: 'https://i.imgur.com/jre8ASg.jpg',
          TeacherId: 3,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 17
          title: '伺服器與網站部署',
          description:
            '有了自己的前後端程式之後，就可以開始來部署了。這週的重點會放在帶大家直接去買主機（AWS、Digital Ocean、GCP、Linode），並且了解如何連上主機。關於主機的部分，想要用哪一家的都可以，AWS 有一年免費的方案，GCP 則是部分服務沒有超過用量就免費，其他的應該都是要付費的。也會讓大家購買自己的網域，理解如何將網域以及主機串連起來，讓大家可以連線到你的網站。',
          price: 199,
          imgUrl: 'https://i.imgur.com/W9qACa2.jpg',
          TeacherId: 3,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 18
          title: 'JavaScript 核心與物件導向',
          description:
            '這次的第一個重點在於物件導向，之前都沒有時間好好講過，這一週特別講一下物件導向。再來是 JavaScript 的一些重要基礎以及瀏覽器運作時的機制，這邊有兩個地方要特別注意。第一個是瀏覽器在運行 JavaScript 時的 Event Loop 機制。第二個是 JavaScript 的一些重要基礎，包含：scope、hoisting、closure、prototype、this 等等。',
          price: 199,
          imgUrl: 'https://i.imgur.com/UAWATMt.jpg',
          TeacherId: 3,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 19
          title: '現代後端開發（上）',
          description:
            'Express 是可以在 Node.js 環境下執行的輕量後端框架，自由度極高，也能夠快速開發出後端應用程式。跟其他有完整 MVC 架構的框架相比，Express 其實鬆散（或者說自由）很多，許多地方並沒有強制規範，都只是按照前人的方法或者是慣例來實踐，十個人可能會有十種不同的寫法。有了之前 PHP 以及 JS 的基礎，我相信學習 Express 會快速許多，因此在這一週裡面可以試試看能不能快速上手 Express 並完成作業。',
          price: 199,
          imgUrl: 'https://i.imgur.com/emDandf.jpg',
          TeacherId: 3,
          isPublic: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        {
          // 20
          title: '現代後端開發（下）',
          description:
            '上週已經熟悉的基本的 Express + Sequelize 開發，而這一週我們會把之前做的餐廳網站移植過來 Express，並且加入後台的功能，讓我們可以有一個相對完整的專案。',
          price: 199,
          imgUrl: 'https://i.imgur.com/emDandf.jpg',
          TeacherId: 3,
          isPublic: true,
          deletedAt: null,
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
