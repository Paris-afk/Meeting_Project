const express = require("express");

const response = require("../../../network/response.js");
const Controller = require("./index");
const router = express.Router();

router.get("/login", async function (req, res) {
  try {
    const lista = await Controller.localLogin(
      req.body.email,
      req.body.password
    );
    response.success(req, res, lista, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

module.exports = router;
