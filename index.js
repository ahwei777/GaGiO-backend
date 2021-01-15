const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
// routes
const userRoutes = require("./routes/userRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const courseRoutes = require("./routes/courseRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Enable All CORS Requests
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("json spaces", 4);

app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);

app.listen(port, () => {
  console.log(`「 GaGiO API 伺服器已啟動！」 Listening on http://localhost:${port}`);
});

app.use('/v1/users', userRoutes);
app.use('/v1/courses', courseRoutes);
app.use('/v1/teachers', teacherRoutes);
app.use('/v1/carts', cartRoutes);
app.use('/v1/orders', orderRoutes);
