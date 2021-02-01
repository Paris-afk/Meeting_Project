const auth = require("../../auth");

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "update":
        //comprobar si se puede hacer
        // console.log(req.body);
        // aqui es para que compare el password osea el campo que queremos comprobar con el encabezado del tokem
        const owner = req.body.id;
        //comprobar si es el mismo usuario que quremos comprobar
        auth.check.own(req, owner);
        // auth.own(req, owner);
        // console.log("entro");
        next();
        break;

      case "delete":
        const owner_ = req.params.id;
        auth.check.own(req, owner_);
        next();
        break;

      case "getUser":
        const _owner_ = req.params.id;
        auth.check.own(req, _owner_);
        next();
        break;

      case "postHobbies":
        const usuario = req.body.idUser;
        auth.check.own(req, usuario);
        next();
        break;

      case "getUserHobbies":
        auth.check.own(req, owner_);
        next();
        break;

      case "postUserLikes":
        auth.check.own(req, owner_);
        next();
        break;

      case "getUsersWhoLikeMe":
        auth.check.own(req, owner_);
        next();
        break;

      case "postUsersDislike":
        auth.check.own(req, owner_);
        next();
        break;

      default:
        next();
    }
  }
  return middleware;
};
