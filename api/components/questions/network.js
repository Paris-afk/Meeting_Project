const express = require("express");

const response = require("../../../network/response.js");
const Controller = require("./index");
const router = express.Router();

router.post("/answers/", postUserType);

async function postUserType(req, res) {
  try {
    const lista = await Controller.postUserType(
      req.body.id,
      req.body.answer1,
      req.body.answer2,
      req.body.answer3,
      req.body.answer4,
      req.body.answer5,
      req.body.answer6,
      req.body.answer7,
      req.body.answer8
    );
    response.success(req, res, lista, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

module.exports = router;
