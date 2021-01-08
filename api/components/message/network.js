const express = require("express");

const response = require("../../../network/response.js");
const Controller = require("./index");
const router = express.Router();

router.post("/send", sendMessage);

async function sendMessage(req, res) {
  try {
    const message = {
      user: req.body.id,
      destination: req.body.idDestination,
      message: req.body.message,
      date: new Date(),
    };
    const lista = await Controller.sendMessage(message);

    response.success(req.res, lista, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}
module.exports = router;
