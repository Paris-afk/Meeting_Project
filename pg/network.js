const express = require("express");

const response = require("../network/response");
const store = require("../store/pg");
const err = require("../utils/error");
const router = express.Router();

/**Users */
router.get("/user/", listAllUsers);
// router.get("/user/:id", listUser);
// router.delete("/user/:id", deleteUser);

// /**Hobbies */
// router.get("/hobbies", listHobbies);
// router.get("/hobbies/:id", listUserHobbies);

// /**Images*/
// router.get("/image/user/:id", getUserImages);
// router.get("image/profile/user/:id", getProfileImage);

async function listAllUsers(req, res, next) {
  try {
    const datos = await store.list("users");
    response.success(req, res, datos, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

async function listUser(req, res, next) {
  try {
    const datos = await store.get("users", req.params.id);
    response.success(req, res, datos, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

async function deleteUser(req, res, next) {
  try {
    const datos = await store.deleteUser("users", req.params.id);
    response.success(req, res, datos, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

async function listHobbies(req, res, next) {
  try {
    const datos = await store.allHobbies();
    response.success(req, res, datos, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

async function listUserHobbies(req, res, next) {
  try {
    const datos = await store.hobbiesByUser(req.params.id);
    response.success(req, res, datos, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

async function getUserImages(req, res, next) {
  try {
    const datos = await store.getImagesByUser(req.params.id);
    response.success(req, res, datos, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

async function getProfileImage(req, res, next) {
  try {
    const datos = await store.getProfileImageByUser(req.params.id);
    response.success(req, res, datos, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}
module.exports = router;
