const TABLA = "users";

// este injectedStore es la base de datos seleccionada que recibe desde index.js
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    const store = require("../../../store/dummy");
  }

  function uploadProfilePicture(id, image) {
    return store.uploadProfilePicture(TABLA, id, image);
  }

  return {
    uploadProfilePicture,
  };
};
