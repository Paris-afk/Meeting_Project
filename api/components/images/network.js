const express = require("express");
const path = require("path");
const response = require("../../../network/response.js");
const Controller = require("./index");
const router = express.Router();
const multer = require("multer");
let reqPath = path.join(__dirname, "../../../store/uploads");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, reqPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname.replace(/:/g, "-"));
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("date type not valide"), false);
  }
};

//this  configuration means that i can only accept imagine with 2 MB maximum if i wanna accept more i might change for 1024 * 1024 * 5 to accept 5MB
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: fileFilter,
});

router.post("/", upload.single("picture"), async function (req, res) {
  // console.log(req.body.id);
  // console.log(req.file);
  // console.log(__dirname);
  // console.log(reqPath);
  try {
    const lista = await Controller.uploadProfilePicture(
      req.body.id,
      req.file.path
    );
    response.success(req, res, lista, 200);
  } catch (error) {
    response.success(req, res, error.message, 500);
  }
});
module.exports = router;
