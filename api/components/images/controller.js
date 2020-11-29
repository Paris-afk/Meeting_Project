const TABLA = "users";
let date = new Date();
date = date.toDateString();
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

  function getImagesByUser(idUser) {
    return store.getImagesByUser(idUser);
  }

  function getProfileImageByUser(idUser) {
    return store.getProfileImageByUser(idUser);
  }

  return {
    uploadProfilePicture,
    uploadPicture,
    getImagesByUser,
    getProfileImageByUser,
  };
};
