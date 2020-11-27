const express = require("express");

const response = require("../../../network/response.js");
const Controller = require("./index");
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const lista = await Controller.list();
    response.success(req, res, lista, 200);
  } catch (error) {
    response.success(req, res, error.message, 500);
  }
});

router.get("/:id", async function (req, res) {
  try {
    const lista = await Controller.get(req.params.id);
    response.success(req, res, lista, 200);
  } catch (error) {
    response.success(req, res, error.message, 500);
  }
});

module.exports = router;
