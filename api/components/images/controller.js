const TABLA = "users";
let date = new Date();
date = date.toDateString();
var fs = require("fs");

// este injectedStore es la base de datos seleccionada que recibe desde index.js
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  function uploadProfilePicture(id, image) {
    return store.uploadProfilePicture(TABLA, id, image);
  }

  function uploadPicture(id, image) {
    return store.uploadPicture(id, image, date);
  }

  function uploadMultiplePictures(id, files, length) {
    return store.uploadMultiplePictures(id, files, date, length);
  }

  function getImagesByUser(idUser) {
    return store.getImagesByUser(idUser);
  }

  function getProfileImageByUser(idUser) {
    return store.getProfileImageByUser(idUser);
  }

  function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // console.log(bitmap);
    // convert binary data to base64 encoded string
    // return new Buffer(bitmap).toString("base64");
    // return bitmap;
    return bitmap.toString("base64");
  }

  return {
    uploadProfilePicture,
    uploadPicture,
    getImagesByUser,
    getProfileImageByUser,
    uploadMultiplePictures,
    base64_encode,
  };
};
