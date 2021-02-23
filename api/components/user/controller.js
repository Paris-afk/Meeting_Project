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
      name,
      lastname,
      age,
      description
    );
  }

  async function changePassword(idUser, password) {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);
    return store.changePassword(idUser, hash);
  }

  async function getHashedPassword(idUser) {
    return store.getHashedPassword(idUser);
  }

  /** HOBBIES */
  function selectHobbies(idUser, hobbies) {
    return store.selectHobbies(idUser, hobbies);
  }

  function allHobbies() {
    return store.allHobbies();
  }
  function hobbiesByUser(idUser) {
    return store.hobbiesByUser(idUser);
  }

  /** LIKES */
  function postLikesbyUser(idUser, idReceptor) {
    return store.postLikesbyUser(idUser, idReceptor);
  }

  // people who like me/ personas a las que les gusto

  function getUsersWhoLikeMe(id) {
    return store.getUsersWhoLikeMe(id);
  }

  /** DISLIKES */
  function postDislikesbyUser(idUser, idReceptor) {
    return store.postDislikesbyUser(idUser, idReceptor);
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
    postLikesbyUser,
    getUsersWhoLikeMe,
    postDislikesbyUser,
    changePassword,
    getHashedPassword,
  };
};
