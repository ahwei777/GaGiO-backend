## BASE_URL

`localhost:30001/v1/`

## 註冊

`POST` `/user`

#### 傳入資料

- email： （必填）Email / 帳號
- password： （必填）密碼
- passwordComfirm : （必填）密碼確認
- nickname：（必填）暱稱

#### 回傳狀態

- 201：已新增
- 400：已存在使用者 / 有欄位未填 / 密碼不等於密碼確認 / 帳號建立錯誤

#### 回傳資料

- User
  - email
  - nickname
  - auth_type

## 登入

`POST` `/login`

#### 傳入資料

- email： （必填）Email / 帳號
- password： （必填）密碼

#### 回傳狀態

- 200：成功登入
- 400：有欄位未填 / 不存在使用者 / 密碼不正確

#### 回傳資料

- User
  - email
  - nickname
  - auth_type

## 登出

`POST` `/logout`

#### 傳入資料

none

#### 回傳狀態

- 200：成功登出
- 400：尚未登入

## 取得所有使用者

`GET` `/user`

### 回傳狀態

- 200：成功獲得使用者資訊
- 400：沒有權限

#### 回傳資料

- User
  - email
  - nickname
  - auth_type
