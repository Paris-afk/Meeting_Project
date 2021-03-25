const express = require("express");
const response = require("../../../network/response.js");
const Controller = require("./index");

const router = express.Router();

//MATCHES
router.get("/:idUser", getUserMatches);

async function getUserMatches(req, res) {
  try {
    const lista = await Controller.getUserMatches(req.params.idUser);

    response.success(req, res, lista, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

module.exports = router;
