// este injectedStore es la base de datos seleccionada que recibe desde index.js
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    const store = require("../../../store/dummy");
  }

  async function getUserMatches(idUser) {
    return store.getUserMatches(idUser);
  }

  async function verifyMatch(idUser, actualSession) {
    return store.verifyMatch(idUser, actualSession);
  }

  async function postUserMatches(idUser, actualSession) {
    return store.postUserMatches(idUser, actualSession);
  }

  return {
    getUserMatches,
    postUserMatches,
    verifyMatch,
  };
};
