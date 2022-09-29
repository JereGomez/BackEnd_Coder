
 function checkSession(req, res, next){
    if(req.session.name){//preguntamos si hay alguna session activa   
        if((req.session.ultimaActualizacion - req.session.loginAt)> 600000 ){
            req.session.destroy((err) =>{
            if(err){
                res.send({error: 'ocurrio un error al cerrar la sesion'})
            }
            else{
                res.send({ok: 'session cerrada correctamente'});
            }
            return;
        });
        }
        else{
        req.session.ultimaActualizacion =  Date.now();
        }
    }
    next();
 };

 export {checkSession};