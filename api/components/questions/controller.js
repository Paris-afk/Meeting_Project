module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    const store = require("../../../store/dummy");
  }

  function postUserType(id, r1, r2, r3, r4, r5, r6, r7, r8) {
    // return store.list(TABLA);
    let pT = r1 + r2 + r3 + r4 + r5 + r6 + r7 + r8;
    let type = "";
    if (pT > 0) {
      type = "Extrovertida";
    } else if (pT < 0) {
      type = "Introvertida";
    } else {
      type = "Ambas";
    }
    console.log(`el tipo de persona es ${type} con un valor de ${pT}`);
  }
  return {
    postUserType,
  };
};
