function autenticacion  (req, res, next){
    if (!req.isAuthenticated()) {
      res.redirect("/login");
    } else {
      next();
    }
  };

  export {autenticacion}