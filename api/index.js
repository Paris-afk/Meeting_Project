const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const config = require("../config.js");
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const imageUser = require("./components/images/network");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const swaggerDoc = require("./swagger.json");
//Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/image", imageUser);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto", config.api.port);
});
