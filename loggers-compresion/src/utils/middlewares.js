import bcrypt from 'bcrypt';

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
            res.redirect('/login');
            return;
        });
        }
        else{
        req.session.ultimaActualizacion =  Date.now();
        }
    }
    next();
 };

function checkUser(req, res, next) {
    if(!req.isAuthenticated()){
        res.redirect('/login');
        return;
    }
    next();
}


function comparePassword(user, password){
    return bcrypt.compareSync(password, user.password);
};

function   hashPassword(password){
    return bcrypt.hashSync(password , bcrypt.genSaltSync(10));  //encriptamos la contraseña, genSaltSync es la cantidad de 'saltos' que se la va a dar a la contraseña
}

 export {checkSession, checkUser, comparePassword, hashPassword};