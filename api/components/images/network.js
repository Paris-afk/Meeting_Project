const express = require("express");
const path = require("path");
const response = require("../../../network/response.js");
const Controller = require("./index");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
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
    cb(new Error("data type not valide"), false);
  }
};

//this  configuration means that i can only accept imagine with 2 MB maximum if i wanna accept more i might change for 1024 * 1024 * 5 to accept 5MB
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//upload or change profile image
router.patch("/", upload.single("picture"), async function (req, res) {
  // console.log(req.body.id);
  //console.log(req.file);
  // console.log(__dirname);
  // console.log(reqPath);
  //console.log(req.file.filename);
  try {
    const lista = await Controller.uploadProfilePicture(
      req.body.id,
      req.file.filename
    );

    // let filename = req.file.path;
    // var base64str = Controller.base64_encode(filename);
    // // console.log(base64str);
    // lista.rows[1] = base64str;

    response.success(req, res, lista, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

//upload image but not profile image
router.post("/wall", upload.single("picture"), async function (req, res) {
  try {
    const lista = await Controller.uploadPicture(
      req.body.id,
      req.file.filename
    );
    response.success(req, res, lista, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.post(
  "/wall/multiple",
  upload.array("picture", 7),
  async function (req, res) {
    try {
      const lista = await Controller.uploadMultiplePictures(
        req.body.id,
        req.files,
        req.files.length
      );
      // console.log(req.files.length);
      response.success(req, res, lista, 200);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

router.get("/:id", async function (req, res) {
  try {
    const lista = await Controller.getImagesByUser(req.params.id);
    response.success(req, res, lista, 200);
  } catch (error) {
    response.error(req, res, error, 500);
  }
});

// get profile image using id
router.get("/profile/:path", async function (req, res) {
  // res.sendFile(path.resolve("./store/uploads/" + req.params.path));
  res.sendFile(path.resolve("./store/uploads/" + req.params.path), (err) => {
    if (err) {
      res.status(404).send("Sorry, cant find that");
      // new Error("archivo no encontrado");
      // res.sendFile(path.resolve("./store/uploads/error404.png"));
      // console.log(err.message);
    }
  });
});
module.exports = router;
