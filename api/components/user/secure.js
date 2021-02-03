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
        const usuario = req.body.id;
        auth.check.own(req, usuario);
        next();
        break;

      case "getUserHobbies":
        const usuario_getUserHobbies = req.body.id;
        auth.check.own(req, usuario_getUserHobbies);
        next();
        break;

      case "postUserLikes":
        const usuario_postUserLikes = req.body.id;
        auth.check.own(req, usuario_postUserLikes);
        next();
        break;

      case "getUsersWhoLikeMe":
        const usuario_getUsersWhoLikeMe = req.body.id;
        auth.check.own(req, usuario_getUsersWhoLikeMe);
        next();
        break;

      case "postUsersDislike":
        const usuario_postUsersDislike = req.body.id;
        auth.check.own(req, usuario_postUsersDislike);
        next();
        break;

      case "changePassword":
        const usuario_changePassword = req.body.id;
        auth.check.own(req, usuario_changePassword);
        next();
        break;

      default:
        next();
    }
  }
  return middleware;
};
