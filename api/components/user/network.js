const express = require("express");

const response = require("../../../network/response.js");
const Controller = require("./index");
const router = express.Router();

//get all users
router.get("/", async function (req, res) {
  try {
    const lista = await Controller.list();
    response.success(req, res, lista, 200);
  } catch (error) {
    response.success(req, res, error.message, 500);
  }
});
// get an user by using his id
router.get("/:id", async function (req, res) {
  try {
    const lista = await Controller.get(req.params.id);
    response.success(req, res, lista, 200);
  } catch (error) {
    response.success(req, res, error.message, 500);
  }
});

// create an user
router.post("/", async function (req, res) {
  try {
    const lista = await Controller.insertUsers(
      req.body.sexual_preference,
      req.body.genre,
      req.body.email,
      req.body.password,
      req.body.name,
      req.body.lastname,
      req.body.birthDate
    );

    response.success(req, res, lista, 200);
  } catch (error) {
    console.log(req.body);
    response.success(req, res, error.message, 500);
  }
});
//delete an user
router.delete("/:id", async function (req, res) {
  try {
    const lista = await Controller.deleteUser(req.params.id);
    response.success(req, res, lista, 200);
  } catch (error) {
    console.log(req.body);
    response.success(req, res, error.message, 500);
  }
});
//modify an user
router.put("/", async function (req, res) {
  try {
    const lista = await Controller.updateUsers(
      req.body.id,
      req.body.sexual_preference,
      req.body.genre,
      req.body.email,
      req.body.password,
      req.body.name,
      req.body.lastname,
      req.body.birthDate
    );

    response.success(req, res, lista, 200);
  } catch (error) {
    console.log(req.body);
    response.success(req, res, error.message, 500);
  }
});

module.exports = router;
