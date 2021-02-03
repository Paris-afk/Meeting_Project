const express = require("express");

const response = require("../../../network/response.js");
const Controller = require("./index");
const userController = require("../user/index");
const router = express.Router();

router.post("/login", async function (req, res) {
  try {
    const lista = await Controller.localLogin(
      req.body.email,
      req.body.password
    );

    const userData = await userController.getUserId(
      req.body.email,
      req.body.password
    );
    let arreglo = [];
    if (lista) {
      arreglo = [lista, ...userData.rows];
    } else {
      throw new Error("datos incorrectos");
    }

    response.success(req, res, arreglo, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

module.exports = router;
