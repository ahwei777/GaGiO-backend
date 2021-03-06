require('dotenv').config();
const express = require("express");
//const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3002;
// routes
const userRoutes = require("./routes/userRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const courseRoutes = require("./routes/courseRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

// swagger
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Enable All CORS Requests
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("json spaces", 4);
app.set("trust proxy", 1);

app.listen(port, () => {
  console.log(`「 GaGiO API 伺服器已啟動！」 Listening on http://localhost:${port}`);
});

app.use('/v1/users', userRoutes);
app.use('/v1/courses', courseRoutes);
app.use('/v1/teachers', teacherRoutes);
app.use('/v1/carts', cartRoutes);
app.use('/v1/orders', orderRoutes);
