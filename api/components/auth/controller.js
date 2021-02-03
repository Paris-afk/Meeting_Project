// este injectedStore es la base de datos seleccionada que recibe desde index.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../../config");
const secret = config.jwt.secret;
const error = require("../../../utils/error");
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    const store = require("../../../store/dummy");
  }

  async function sign(data) {
    return await jwt.sign(data, secret);
  }

  async function comparePassword(password, hashedPassword) {
    var a;
    await bcrypt.compare(password, hashedPassword).then((sonIguales) => {
      if (sonIguales == true) {
        a = true;
      } else {
        a = false;
      }
    });
    return a;
  }

  async function localLogin(email, password) {
    var esVerdad;
    const data = await store.localLogin(email, password);
    console.log(data.rows.length);
    if (!data.rows.length == 0) {
      console.log(await data.rows[0]);
      const user = await data.rows[0].id_user;
      const pass = await data.rows[0].password;
      esVerdad = await comparePassword(password, pass);

      if (esVerdad) {
        return await sign(user);
      }
    } else {
      throw error("user or password are wrong or this user doesn't exist");
      // return new Error("ou have to complete allY fields");
    }
  }

  return {
    localLogin,
    comparePassword,
  };
};
