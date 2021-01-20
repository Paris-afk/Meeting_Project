const TABLA = "users";
const { nanoid } = require("nanoid");
const bcrypt = require("bcryptjs");
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

  function getUserId(email, password) {
    return store.getUserId(email, password);
  }

  async function insertUsers(
    sexual_preference,
    genre,
    email,
    password,
    name,
    lastname,
    age,
    description
  ) {
    const id = nanoid();
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);
    return store.insertUsers(
      sexual_preference,
      genre,
      email,
      hash,
      name,
      lastname,
      age,
      description,
      id
    );
  }

  function updateUsers(
    id,
    sexual_preference,
    genre,
    email,
    password,
    name,
    lastname,
    age,
    description
  ) {
    return store.updateUsers(
      id,
      sexual_preference,
      genre,
      email,
      password,
      name,
      lastname,
      age,
      description
    );
  }

  /** HOBBIES */
  function selectHobbies(idUser, idHobbie) {
    return store.selectHobbies(idUser, idHobbie);
  }

  function allHobbies() {
    return store.allHobbies();
  }
  function hobbiesByUser(idUser) {
    return store.hobbiesByUser(idUser);
  }

  return {
    list,
    get,
    insertUsers,
    deleteUser,
    updateUsers,
    selectHobbies,
    allHobbies,
    hobbiesByUser,
    getUserId,
  };
};
