// este injectedStore es la base de datos seleccionada que recibe desde index.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    const store = require("../../../store/dummy");
  }

  async function sign(data) {
    return await jwt.sign(data, "secreto");
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

  async function localLogin(email, password, user) {
    var esVerdad;
    const data = await store.localLogin(email, password);
    if (!data.rows.length == 0) {
      const user = await data.rows[0].email;
      const pass = await data.rows[0].password;
      esVerdad = await comparePassword(password, pass);

      if (esVerdad) {
        return await sign(password);
      }
    } else {
      return new Error("You have to complete all fields");
    }
  }

  return {
    localLogin,
  };
};
