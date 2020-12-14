const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const routers = require("./routers");

const app = express();
const port = 3001;

app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  db.sequelize.sync();
  console.log(`「 學習平台啟動！」 Listening on http://localhost:${port}`);
});

app.use("/v1", routers);
