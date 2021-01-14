const remote = require("./remote");
const config = require("../config");

module.exports = new remote(config.pgService.host, config.pgService.port);
