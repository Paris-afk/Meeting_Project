const express = require("express");

const response = require("../../../network/response.js");
const Controller = require("./index");
const router = express.Router();

router.get("/hobbies", allHobbies);
router.get("/hobbies/:id", hobbiesByUser);

//get all users
router.get("/", async function (req, res) {
  try {
    const lista = await Controller.list();
    response.success(req, res, lista, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});
// get an user by using his id
router.get("/:id", async function (req, res) {
  try {
    const lista = await Controller.get(req.params.id);
    response.success(req, res, lista, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
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
      req.body.age,
      req.body.description
    );

    response.success(req, res, lista, 200);
  } catch (error) {
    console.log(req.body);
    response.error(req, res, error.message, 500);
  }
});
//delete an user
router.delete("/:id", async function (req, res) {
  try {
    const lista = await Controller.deleteUser(req.params.id);
    response.success(req, res, lista, 200);
  } catch (error) {
    // console.log(req.body);
    response.error(req, res, error.message, 500);
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
      req.body.age,
      req.body.description
    );

    response.success(req, res, lista, 200);
  } catch (error) {
    console.log(req.body);
    response.error(req, res, error.message, 500);
  }
});

/** HOBBIES */

// inster user's hobbie preferences
router.post("/hobbies", async function (req, res) {
  try {
    const lista = await Controller.selectHobbies(
      req.body.idUser,
      req.body.idHobbie
    );

    response.success(req, res, lista, 200);
  } catch (error) {
    console.log(req.body);
    response.error(req, res, error.message, 500);
  }
});

// select all hobies
async function allHobbies(req, res) {
  try {
    const lista = await Controller.allHobbies();
    response.success(req, res, lista, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

async function hobbiesByUser(req, res) {
  try {
    const lista = await Controller.hobbiesByUser(req.params.id);

    response.success(req, res, lista, 200);
  } catch (error) {
    console.log(req.body);
    response.error(req, res, error.message, 500);
  }
}

module.exports = router;
