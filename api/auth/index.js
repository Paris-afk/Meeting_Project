const jwt = require("jsonwebtoken");
const config = require("../../config");
const error = require("../../utils/error");
const secret = config.jwt.secret;

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    // console.log(`este es el decoded` + decoded);
    // console.log("este es el owner" + owner);

    if (decoded !== owner) {
      throw error("no puedes hacer esto", 401);
      // throw new Error("No puedes hacer esto");
    }
  },
};

function getToken(auth) {
  if (!auth) {
    throw new Error("No viene token");
  }

  if (auth.indexOf("Bearer ") === -1) {
    throw new Error("Formato invalido");
  }

  let token = auth.replace("Bearer ", "");
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  check,
};
