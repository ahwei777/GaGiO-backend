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
      switch (identity) {
        case 1:
          if (user.auth.id !== 1)
            return res.status(401).json({
              ok: 0,
              errorMessage: "permission denied",
            });
          next();
          break;
        case 2:
          if (user.auth.id !== 2)
            return res.status(401).json({
              ok: 0,
              errorMessage: "permission denied",
            });
          next();
          break;
        case 3:
          if (user.auth.id !== 3)
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
