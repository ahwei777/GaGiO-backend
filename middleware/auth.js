const db = require("../models");
const { User } = db;

const setToken = (userId) => {
  return userId;
};

const checkToken = (req) => {
  if (!req.header("Authorization")) return;
  const token = req.header("Authorization");
  return token;
};

// 一般會員 1, 管理員 3,（開課者 2）
const checkAuth = (identity) => {
  return (req, res, next) => {
    const userId = checkToken(req) || "";
    if (!userId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "cannot find token !",
      });
    User.findByPk(userId).then((user) => {
      if (!user)
        return res.status(400).json({
          ok: 0,
          errorMessage: "cannot find user !",
        });
      // req 內設置 id 便於後續取得使用者身分進行操作
      req.userId = user.dataValues.id;
      switch (identity) {
        case 1:
          if (!user.AuthTypeId)
            return res.status(401).json({
              ok: 0,
              errorMessage: "permission denied",
            });
          next();
          break;
        case 2:
          if (user.AuthTypeId !== 2)
            return res.status(401).json({
              ok: 0,
              errorMessage: "permission denied",
            });
          next();
          break;
        case 3:
          if (user.AuthTypeId !== 3)
            return res.status(401).json({
              ok: 0,
              errorMessage: "permission denied",
            });
          next();
          break;
      }
    });
  };
};

module.exports = {
  setToken,
  checkAuth,
};
