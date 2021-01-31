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
              title: '安裝基本軟體',
              description:
                '現有許多工具可建構網站。如果你剛起步，你可能不知從何選擇程式碼編輯器、框架、測試工具等等。我們將透過〈安裝基本軟體〉逐步引領你安裝基本的網頁開發軟體。',
              videoUrl: 'https://www.youtube.com/watch?v=oTzNRv6X51o',
            },
            {
              id: 2,
              title: '你的網站看起來會是什麼樣子？',
              description:
                '在開始為自己的網站寫程式碼之前，你應該先規劃要呈現哪些資訊？要採用哪種字體與顏色？你可依照〈你的網站看起來會是什麼樣子？〉所提供的簡易方法，照著來規劃網站的內容與設計。',
            },
            {
              id: 3,
              title: '與各式各樣檔案打交道',
              description:
                '在一個網站包含許多檔案：文字內容、程式碼、樣式表、多媒體內容等等。當建立網站時，你需要將這些檔案組合成清晰的架構，並確保它們能彼此互動溝通。〈與各式各樣檔案打交道〉將引領你安排合理的檔案架構，以及你應該注意的問題。',
            },
            {
              id: 4,
              title: 'HTML 基本概念',
              description:
                '超文字標籤語言 (Hypertext Markup Language；HTML) 可用以建構網頁內容，並賦予其含意和用途。例如某段內容要分為多個段落，或是用項目符號列成幾個重點？要在網頁插入圖片？這裡需要以資料表格整理嗎？如果這些沒有嚇到你，〈HTML 基本概念〉將提供足夠的資訊。',
            },
            {
              id: 5,
              title: 'CSS 基本概念',
              description:
                '串接樣式表 (Cascading Stylesheets；CSS) 可用以塑造網站的特殊風格。例如這段文字要用一般的黑色，或是改用紅色標明重點？某段重要內容應該置於畫面的何處？想用什麼背景圖片及顏色裝飾你的網站？〈CSS 基本概念〉帶你入門。',
            },
            {
              id: 6,
              title: 'JavaScript 基本概念',
              description:
                '程式設計語言 JavaScript 可為你的網站增加互動功能，例如動畫、遊戲、按下按鈕的後續動作、將資料輸入表單、動態套用樣式的效果等等。〈JavaScript 基本概念〉將帶你瞭解此一有趣的程式語言及其能耐，並讓你快速入門。',
            },
            {
              id: 7,
              title: '將你的網站發佈上線',
              description:
                '在寫完程式碼並整理好檔案之後，接著就是將網站發佈上線，讓其他人可以瀏覽、欣賞內容。〈將你的網站發佈上線〉將帶領你以最輕鬆的方法發佈你的範例程式碼。',
            },
            {
              id: 8,
              title: '網站的運作方式',
              description:
                '在瀏覽喜愛的網站時，你可能未意識到瀏覽器正於背景中運作著許多複雜事情。〈網站的運作方式〉將簡略說明網頁瀏覽時所發生的大小事。',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 2,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: 'HTTP的概觀',
              description: '基本特性：它能做什麼與它的用途',
              videoUrl: 'https://www.youtube.com/watch?v=iYM2zFP3Zn0',
            },
            {
              id: 2,
              title: 'HTTP Cache',
              description:
                'Cache對網站速度很重要。  此文章描敘不同的方法使用HTTP Header控制它。',
            },
            {
              id: 3,
              title: 'HTTP Cookies',
              description:
                'RFC 6265 定義了cookies的工作方式，當HTTP請求一個服務時，一個伺服器可以發送一個Set-Cookie的HTTP header回應。客戶端將以header的方式回傳cookie值給每個請求的同 一個伺服器，Cookie也會在某些時間進行更新，或是限制一個實體網域或路徑。',
            },
            {
              id: 4,
              title: 'HTTP Access Control (CORS)',
              description:
                'Cross-site HTTP requests 是來自不同網域的資源請求。舉個例子，一個HTML網頁從網域A (http://domaina.example/) 從網域B(http://domainb.foo/image.jpg)請求一個圖片，經由img元件。現今的網頁通常會讀取跨站資源，包括CSS樣式表、圖片、腳本與其他資源。CORS允許網頁開發人員的網站響應跨站讀取。',
            },
            {
              id: 5,
              title: 'HTTP的演化',
              description:
                'HTTP早期版本變化的簡要說明，到現在的HTTP/2與其他版本。',
            },
            {
              id: 6,
              title: '網頁安全方針',
              description: '一些技巧幫助運作團隊開發安全的網頁。',
            },
            {
              id: 7,
              title: 'HTTP 訊息',
              description: '描述HTTP/1與HTTP/2不同類別與結構。',
            },
            {
              id: 8,
              title: '一個典型HTTP對話',
              description: '顯示並解釋HTTP的通常對話流程。',
            },
            {
              id: 7,
              title: 'HTTP/1.x的連接管理',
              description: '描述在HTTP/1.x中可用的三種連接管理。',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 3,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: 'HTML 入門',
              description:
                '包含 HTML 最基礎的部分──我們將定義元素（elements）、屬性（attributes）以及其他重要術語，並且介紹它們的使用方法。除此之外，我們也將說明典型的 HTML 網頁及其中的元素是如何構成的，並解釋其他重要的基本語言特性。還有，我們也會玩一些 HTML，好引發你的興趣！',
              videoUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
            },
            {
              id: 2,
              title: '在 head 中有什麼? HTML 中的後設資料(Metadata)',
              description:
                'HTML 文件的 head 是在網頁加載完畢之後，不會顯示在瀏覽器上的部分。其中包含一些資訊，如頁面的標題(<title>)、CSS 的連結 (當你想利用 CSS 來妝點你的頁面 HTML 時，你會用到它們)、網頁圖示(favicon)的連結，以及 metadata (裡頭承載了有關於該 HTML 的資料，如作者、描述該文件的關鍵詞等。)',
            },
            {
              id: 3,
              title: 'HTML 文字的基礎知識',
              description:
                '一個 HTML 的主要作用是賦予純文字意義(又稱為語義化)，好讓瀏覽器知道如何正確地顯示它。這篇文章將探討如何使用 HTML 來將文字區塊拆解為標題(heading)和段落(paragraph)、強調字詞、建立列表等等。',
            },
            {
              id: 4,
              title: '建立超連結',
              description:
                '超連結真的非常重要 — 它造就了我們現今所知的網路。這篇文章介紹超連結的使用語法，並且探討建立連結的最佳實踐方法。',
            },
            {
              id: 5,
              title: '進階文字格式',
              description:
                '在 HTML 中還有許多可以用來格式化文字的元素，但我們沒有在 HTML 文字的基礎知識中提及這些內容。雖然這些元素比較鮮為人知，不過還是相當值得一談。在這篇文章中，你將會學到如何表示引言、描述列表、程式碼、上下標，及聯繫訊息等等。',
            },
            {
              id: 6,
              title: '文件與網站架構',
              description:
                '除了分別定義網頁的各個成分（例如：段落或是圖片），HTML 還能定義網頁上的區塊（例如：標頭、導航列或是主要內容）。這篇文章將介紹如何規劃一個基本的網頁架構，以及如何透過編寫 HTML 來表示網頁架構。',
            },
            {
              id: 7,
              title: 'HTML 除錯',
              description:
                '如果 HTML 出錯了，卻找不到哪裡有錯誤該怎麼辦？這篇文章將會介紹一些能幫得上忙的實用工具。',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 4,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: 'CSS 入門',
              description:
                'CSS（階層式樣式表）用來設定網頁的樣式及佈局，例如：改變文字的字體、顏色、大小及間距以及拆分為多欄，或是增加動畫或裝飾性的效果。這個單元提供一個溫和的路徑，讓您逐漸熟悉 CSS 的基礎概念，包含它的運作方式，語法是什麼樣子，以及如何開始在 HTML 裡添加樣式。',
              videoUrl: 'https://www.youtube.com/watch?v=qKoajPPWpmo',
            },
            {
              id: 2,
              title: 'CSS 的組成',
              description:
                '這個單元接續在 CSS 入門之後，現在已經熟悉了這門語言的語法，並有了一些基本的使用經驗，是時候再深入一些。這個單元關注於疊加（cascade）和繼承（inheritance）規則、所有可用的選擇器類型、單位、尺寸、背景與邊框的樣式、除錯，以及其它更多的。',
            },
            {
              id: 3,
              title: '裝飾文字',
              description:
                '在含蓋了 CSS 語言基本的部分之後，下一個帶給您的 CSS 主題會專注於文字樣式的裝飾上，您將最常用 CSS 作的事情之一。在這裡，我們文字樣式的基礎，包括設定字體、粗細、斜體、行距與字距、陰影與其它的文字效果。整個單元圍繞於在您的頁面上套用選擇的字體，以及對清單和連結進行樣式調整。',
            },
            {
              id: 4,
              title: 'CSS 的布局',
              description:
                '到了這邊，我們已經看過了 CSS 的基礎知識，如何裝飾文字，如何裝飾並控制您內容所在的區。現在是時候來看看如合將您的這些區塊擺放到正確的位置，並能依不同的可視空間進行調整。我們已經含蓋了必須的先備知識，所以我們現在可以深入到 CSS 的布局，看看不同的顯示設定，像是新的佈局工具 flexbox 、 CSS grid 和定位（position）以及一些您可能仍想要了解的早期技術。',
            },
            {
              id: 5,
              title: '解決常見的 CSS 問題',
              description:
                'CSS 與您將遇到程式語言或設計工具在運作上有點不太一樣。為什麼要用這種方式運作？在下面影片中， Miriam Suzanne 解釋為什麼 CSS 是這樣運作，以及為什麼會這樣子發展。（可以利用字幕翻譯功能，將 CC 字幕轉為中文）',
              videoUrl:
                'https://www.youtube.com/watch?v=aHUtMbJw8iA&feature=emb_logo',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 5,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: 'JavaScript 初探',
              description:
                '在我們的第一個 JavaScript 單元，在帶你初次實際撰寫 JavaScript 程式之前，我們先回答幾個基本的問題，像是「什麼是 JavaScript？」、「它看起來是什麼樣子？」、「它能做些什麼？」。接著，我們深入地討論幾個 JavaScript 關鍵的組成元素，例如：變數、字串、數字、陣列。',
              videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            },
            {
              id: 2,
              title: 'JavaScript 構成元素',
              description:
                '在這個單元，我們繼續含蓋 JavaScript 關鍵的基本元素，把焦點放在常見程式碼區塊的類型，像是條件陳述式、迴圈、函數以及事件。你已經在這個課程中看過這些東西，但只是匆匆一瞥，在這裡我們會明確地討論。',
            },
            {
              id: 3,
              title: 'JavaScript 物件介紹',
              description:
                '在 JavaScript 程式語言，絕大部分的東西都是物件，從核心的 JavaScript 元素像是字串（string）和陣列（array）到基於 JavaScript 建構的瀏覽器 API 都是。你甚至可以建立自己的物件，將相關的變數與函數封裝成能有效率操作的集合體。如果你想更深入了解這門程式語言的知識，並撰寫出更有效率的程式碼，了解 JavaScript 物件導向的本質是重要的，因此我們準備這個單元來幫助你。這裡我們教詳細的物件理論與語法，看看要如何建自你自己的物件，以及說明什麼是 JSON 資料和怎麼使用它。',
            },
            {
              id: 4,
              title: '非同步的 JavaScript',
              description:
                '這個單元我們來討論非同步的 JavaScript，它為什麼重要，以及它能如何有效處理像是由伺服器抓取資料這種阻塞性操作（它會造成網頁停頓）。',
            },
            {
              id: 5,
              title: '用戶端的 web API',
              description:
                '當你走在用 JavaScript 撰寫用戶端程式，來建構網站或應用程式的路上，不利用 API 很難走很遠，介接在操控瀏覽器、作業系統的不同功能，或是接收來自其它網站、服務的資料。在這個單元中，我們將討索什麼是 API ，以及如何使用幾個在你開發過程中，十分頻繁被使用到的 API 。',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 6,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '階級組織',
              description:
                '按照階級，忍者又分上、中、下忍三種。上忍，又稱「智囊忍」，專司策略布局的統領工作。中忍，是實際對戰的靈魂頭目，忍術也有一定的水準。下忍，也稱「體忍」，是最前方與敵軍交手的實際接觸人員。忍術流派以伊賀（三重縣西北部）、甲賀（滋賀縣南部）兩地為本，其它的有青森中川流、山形羽黑流、新潟上杉流、加治流、長野甲陽流、芥川流等。',
              videoUrl: 'https://www.youtube.com/watch?v=bSziXmNKJMg',
            },
            {
              id: 2,
              title: '忍術',
              description:
                '忍者的特殊能力稱為忍術，於現代常被誇張，如隱形、變成動物、高樓躍下、飛行能力和預見將來。還有一些來自於作家和電影業影響。事實上一些神話來自於人們目睹了忍者的技藝表演後，有些所見的忍者是那些常常在不同城鎮靠賣藝為生的演員和魔術師。在西方流行文化中，忍者被描述為一種使用特製器械的武術家又有一些東方神秘氣功之類印象，運用各種奇異武器和特種部隊技巧來完成任務。他們身穿傳說中的裝束為深色衣服，包頭只露雙眼。這些所有描述經常構成西方小說情節，讓忍者作為虛構情節中的超級英雄或超級壞蛋（任務多在亞太地區）。忍者除了使用短型武士刀外還有幾種特殊武器對抗敵人，最出名的應該是手裡劍、苦無和鎖鎌。聰明地利用使武器也成為一種工具，例如用劍鞘的繩索在樹杈間形成吊床。',
            },
            {
              id: 3,
              title: '忍術流派介紹',
              description: '伊賀流',
            },
            {
              id: 4,
              title: '忍者記載人物',
              description: '服部半藏',
            },
            {
              id: 5,
              title: '忍者所使用的武器',
              description: '苦無',
            },
            {
              id: 6,
              title: '防禦型武器道具',
              description: '煙霧彈',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 7,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '鳴人VS木葉丸',
              description: '鳴人VS木葉丸',
              videoUrl: 'https://www.youtube.com/watch?v=Rhg4lHWteAw',
            },
            {
              id: 2,
              title: '鳴人VS大蛇丸',
              description: '鳴人VS大蛇丸',
            },
            {
              id: 3,
              title: '鳴人VS獅子丸',
              description: '鳴人VS獅子丸',
            },
            {
              id: 4,
              title: '鳴人VS貢丸',
              description: '鳴人VS貢丸',
            },
            {
              id: 5,
              title: '鳴人VS肉丸',
              description: '鳴人VS肉丸',
            },
            {
              id: 6,
              title: '鳴人VS三色丸',
              description: '鳴人VS三色丸',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 8,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '鳴人VS木葉丸',
              description: '鳴人VS木葉丸',
              videoUrl: 'https://www.youtube.com/watch?v=Rhg4lHWteAw',
            },
            {
              id: 2,
              title: '鳴人VS大蛇丸',
              description: '鳴人VS大蛇丸',
            },
            {
              id: 3,
              title: '鳴人VS獅子丸',
              description: '鳴人VS獅子丸',
            },
            {
              id: 4,
              title: '鳴人VS貢丸',
              description: '鳴人VS貢丸',
            },
            {
              id: 5,
              title: '鳴人VS肉丸',
              description: '鳴人VS肉丸',
            },
            {
              id: 6,
              title: '鳴人VS三色丸',
              description: '鳴人VS三色丸',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 9,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '你能靈活運用變數、迴圈、判斷式等等基本概念來解題',
              description: '單元內容',
              videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            },
            {
              id: 2,
              title: '你能一行行的說出現在程式在做什麼',
              description: '單元內容',
            },
            {
              id: 3,
              title: '你知道「回傳」跟「輸出」的差異',
              description: '單元內容',
            },
            {
              id: 4,
              title: '你可以把用文字寫好的演算法轉成程式碼',
              description: '單元內容',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 10,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '你理解常用內建函式如何使用',
              description: '單元內容',
              videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            },
            {
              id: 2,
              title: '你熟悉程式語法並知道如何解決基礎問題',
              description: '單元內容',
            },
            {
              id: 3,
              title: '你知道為什麼我們需要 unit test',
              description: '單元內容',
            },
            {
              id: 4,
              title: '你知道什麼是 unit test',
              description: '單元內容',
            },
            {
              id: 5,
              title: '你知道如何寫 unit test',
              description: '單元內容',
            },
            {
              id: 6,
              title: '你知道如何測試一個 function',
              description: '單元內容',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 11,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '你知道網路背後大概的運作模式',
              description: '單元內容',
              videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            },
            {
              id: 2,
              title: '你知道什麼是 Request 跟 Response',
              description: '單元內容',
            },
            {
              id: 3,
              title: '你知道什麼是 DNS 以及運作原理',
              description: '單元內容',
            },
            {
              id: 4,
              title: '你知道 HTTP 與 HTTPS 的差異',
              description: '單元內容',
            },
            {
              id: 5,
              title: '你知道常用的 HTTP Header',
              description: '單元內容',
            },
            {
              id: 6,
              title: '你知道什麼是 API',
              description: '單元內容',
            },
            {
              id: 7,
              title: '你會使用 node.js 寫出串接 API 的程式',
              description: '單元內容',
            },
            {
              id: 8,
              title: '你知道 HTTP method 有哪些',
              description: '單元內容',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 12,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '你知道 JavaScript 跑在網頁上跟跑在 Node.js 上差在哪裡',
              description: '單元內容',
              videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            },
            {
              id: 2,
              title: '你知道 DOM 是什麼',
              description: '單元內容',
            },
            {
              id: 3,
              title: '你知道如何用 JavaScript 操控 DOM 物件',
              description: '單元內容',
            },
            {
              id: 4,
              title: '你知道如何幫一個按鈕加上 event listener',
              description: '單元內容',
            },
            {
              id: 5,
              title: '你知道捕獲與冒泡是什麼',
              description: '單元內容',
            },
            {
              id: 6,
              title: '你知道什麼是事件代理（delegation）',
              description: '單元內容',
            },
            {
              id: 7,
              title: '你知道怎麼用 JavaScript 更改元素的 style',
              description: '單元內容',
            },
            {
              id: 8,
              title: '你知道 preventDefault 與 stopPropagation 的差異',
              description: '單元內容',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 13,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '你知道什麼是 API',
              description: '單元內容',
              videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            },
            {
              id: 2,
              title: '你知道什麼是 Ajax',
              description: '單元內容',
            },
            {
              id: 3,
              title: '你知道從網頁前端呼叫 API 與在自己電腦上寫程式呼叫的差異',
              description: '單元內容',
            },
            {
              id: 4,
              title: '你知道什麼是同源政策（Same-origin policy）',
              description: '單元內容',
            },
            {
              id: 5,
              title: '你知道如何存取跨網域的資源（CORS）',
              description: '單元內容',
            },
            {
              id: 6,
              title: '你知道什麼是 JSON',
              description: '單元內容',
            },
            {
              id: 7,
              title: '你知道什麼是 JSONP 及其原理',
              description: '單元內容',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 14,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '你知道 PHP 是什麼',
              description: '單元內容',
              videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            },
            {
              id: 2,
              title: '你知道前端與後端的差別',
              description: '單元內容',
            },
            {
              id: 3,
              title: '你知道什麼是資料庫',
              description: '單元內容',
            },
            {
              id: 4,
              title:
                '你了解基本的 SQL 語法，包括 Select、Insert Into、Delete 與 Update',
              description: '單元內容',
            },
            {
              id: 5,
              title: '你能夠寫出基本的 CRUD 應用',
              description: '單元內容',
            },
            {
              id: 6,
              title: '你知道什麼是 Session',
              description: '單元內容',
            },
            {
              id: 7,
              title: '你知道什麼是 Cookie',
              description: '單元內容',
            },
            {
              id: 8,
              title: '你知道 Session 與 Cookie 的差別',
              description: '單元內容',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 15,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '你知道什麼是雜湊（Hash function）',
              description: '單元內容',
              videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            },
            {
              id: 2,
              title: '你知道什麼是加密（Encryption）',
              description: '單元內容',
            },
            {
              id: 3,
              title: '你知道雜湊與加密的差別',
              description: '單元內容',
            },
            {
              id: 4,
              title: '你知道什麼是 SQL Injection 以及如何防範',
              description: '單元內容',
            },
            {
              id: 5,
              title: '你知道什麼是 XSS 以及如何防範',
              description: '單元內容',
            },
            {
              id: 6,
              title: '你知道為什麼儘管前端做了驗證，後端還是要再做一次驗證',
              description: '單元內容',
            },
            {
              id: 7,
              title: '你知道什麼是 CSRF 以及如何防範',
              description: '單元內容',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 16,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '你知道什麼是 SPA',
              description: '單元內容',
              videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            },
            {
              id: 2,
              title: '你知道怎麼樣用 PHP 自己寫出 API',
              description: '單元內容',
            },
            {
              id: 3,
              title: '你知道如何在前端與自己開的 API 串接',
              description: '單元內容',
            },
            {
              id: 4,
              title: '你知道在 server 與在 client render 的差別',
              description: '單元內容',
            },
            {
              id: 5,
              title: '你知道 jQuery 是做什麼的',
              description: '單元內容',
            },
            {
              id: 6,
              title: '你知道 jQuery 與 vanilla js 的差別',
              description: '單元內容',
            },
            {
              id: 7,
              title: '你知道什麼是 Bootstrap',
              description: '單元內容',
            },
            {
              id: 8,
              title: '你知道 Bootstrap 原理及如何應用',
              description: '單元內容',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 17,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '你知道虛擬空間、虛擬主機以及實體主機的差別',
              description: '單元內容',
              videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            },
            {
              id: 2,
              title: '你知道什麼是網域（Domain）',
              description: '單元內容',
            },
            {
              id: 3,
              title: '你知道如何設定網域（A、CNAME）',
              description: '單元內容',
            },
            {
              id: 4,
              title: '你知道如何用 SSH 遠端連線到自己的主機',
              description: '單元內容',
            },
            {
              id: 5,
              title: '你知道如何部署應用程式',
              description: '單元內容',
            },
            {
              id: 6,
              title: '你知道什麼是 No SQL',
              description: '單元內容',
            },
            {
              id: 7,
              title: '你知道什麼是 Transaction 與 lock',
              description: '單元內容',
            },
            {
              id: 8,
              title: '你知道資料庫的 ACID 是什麼',
              description: '單元內容',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 18,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '你知道 Event Loop 的運作方式',
              description: '單元內容',
              videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            },
            {
              id: 2,
              title: '你知道什麼是作用域（Scope）',
              description: '單元內容',
            },
            {
              id: 3,
              title: '你知道 Hoisting（提升）是什麼',
              description: '單元內容',
            },
            {
              id: 4,
              title: '你知道 Hoisting 的原理為何',
              description: '單元內容',
            },
            {
              id: 5,
              title: '你知道 Closure（閉包）是什麼',
              description: '單元內容',
            },
            {
              id: 6,
              title: '你能夠舉出一個運用 Closure 的例子',
              description: '單元內容',
            },
            {
              id: 7,
              title: '你知道 Prototype 在 JavaScript 裡是什麼',
              description: '單元內容',
            },
            {
              id: 8,
              title: '你知道大部分情況下 this 的值是什麼',
              description: '單元內容',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 19,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '學習如何使用 Express 及其相關套件',
              description: '單元內容',
              videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            },
            {
              id: 2,
              title: '我理解為什麼會需要框架',
              description: '單元內容',
            },
            {
              id: 3,
              title: '了解什麼是 ORM',
              description: '單元內容',
            },
            {
              id: 4,
              title: '了解 ORM 的優缺點',
              description: '單元內容',
            },
            {
              id: 5,
              title: '了解什麼是 N+1 problem',
              description: '單元內容',
            },
            {
              id: 6,
              title: '我知道如何部署 Node.js 應用程式到 heroku',
              description: '單元內容',
            },
          ]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CourseId: 20,
          unit_list: JSON.stringify([
            {
              id: 1,
              title: '我能夠從頭把一個網站獨立建起來',
              description: '單元內容',
              videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            },
            {
              id: 2,
              title: '我知道如何部署 Node.js 的網站到自己的主機',
              description: '單元內容',
            },
            {
              id: 3,
              title: '我知道如何使用 Nginx',
              description: '單元內容',
            },
            {
              id: 4,
              title: '我知道如何使用 PM2',
              description: '單元內容',
            },
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
