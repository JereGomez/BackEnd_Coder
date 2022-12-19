function autenticacion  (req, res, next){
    if (!req.isAuthenticated()) {
      res.redirect("/api/user/login");
    } else {
      next();
    }
  };

  export {autenticacion}