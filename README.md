# Learning Platform - Backend API

### 簡介

這是我們小組 Final Project 的後端原始碼，採用了 Express + Sequelize 進行開發。

### Clone 之後要做的事情：

1. 補上 config.json
2. 安裝套件 `npm install`
3. 啟動 server 可以直接用 `npm run start`

### 注意事項：

1. 千萬不要在 master 上做任何改動，請在自己開的 branch 上面改
2. Commit 的標題要寫清楚這一個 commit 做了哪些事情（新功能 or 修東西 etc.)
3. API 的 response 用統一格式來寫： （格式可以再討論）

**_Request_** 動作成功

```
{
  ok: 1, //只要是 request 第一個回傳的都是 ok，成功就寫 1，失敗的話寫 ０
  data:{ //要回傳的 Data 就寫在第二個值，用一個物件把他包起來！如果不傳值可以不用設定
    ...
  },
}
```

**_Request_** 動作失敗

```
{
  ok: 0, //只要是 request 動作失敗就傳 0 (e.g. 找不到帳號、資料不齊全...)
  errorMessage:{ //告訴他這裡為什麼失敗（e.g. cannot find username)
    ...
  },
}
```

4. 要改動 index.js 的話請在群組裡面說一下，改完的 PR 請別人檢查之後再 merge。
