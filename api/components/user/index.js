const store = require("../../../store/pg");
// const store = require("../../../store/remote-postgres");
const ctrl = require("./controller");

module.exports = ctrl(store);
