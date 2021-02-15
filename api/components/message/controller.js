const socket = require("../../socket").socket;

module.exports = function (injectedStore) {
  // let store = injectedStore;
  // if (!store) {
  //   const store = require("../../../store/dummy");
  // }

  function sendMessage(message) {
    return new Promise((resolve, reject) => {
      if (!message) {
        console.error("no hay chat");
        return reject("los datos son incorrectos");
      } else {
        try {
          socket.io.emit("paris", message);
          console.log(message);
          resolve(message);
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  return {
    sendMessage,
  };
};
