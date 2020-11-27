const TABLA = "users";

// este injectedStore es la base de datos seleccionada que recibe desde index.js
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    const store = require("../../../store/dummy");
  }

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  function deleteUser(id) {
    return store.deleteUser(TABLA, id);
  }

  function insertUsers(
    sexual_preference,
    genre,
    email,
    password,
    name,
    lastname
  ) {
    return store.insertUsers(
      sexual_preference,
      genre,
      email,
      password,
      name,
      lastname
    );
  }

  function updateUsers(
    id,
    sexual_preference,
    genre,
    email,
    password,
    name,
    lastname
  ) {
    return store.updateUsers(
      id,
      sexual_preference,
      genre,
      email,
      password,
      name,
      lastname
    );
  }

  return {
    list,
    get,
    insertUsers,
    deleteUser,
    updateUsers,
  };
};
