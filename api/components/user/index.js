const store = require("../../../store/pg");
const ctrl = require("./controller");

module.exports = ctrl(store);
