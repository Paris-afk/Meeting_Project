const express = require("express");
const config = require("../config.js");
const user = require("./components/user/network");
const app = express();

//Routes

app.use("/api/user", user);
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
