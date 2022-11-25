import ContenedorMongo from "../../contenedores/contenedorMongo.js";
import { CarritosDao } from "../index.js";
//import { CarritosDao } from "../index.js";

class UsuariosDaoMongo extends ContenedorMongo{
    
    constructor(Model){
        super(Model, CarritosDao);
    }



    async createUser(item){
        try{
            item.carrito = await CarritosDao.createCarr();
            let user = await this.model.create(item);
            return user;
        }
        catch(err){
            throw(err);
        }
    }

    async getCarId(user){
        let userCarr = await this.model.findOne({'_id': user._id}).carrito;
        return userCarr;
    }
    
    async getByUsername(username){
        try{
        return await this.model.findOne({username});
        }
        catch(err){
            throw new Error(`Error al buscar  usuario por username ${err}`);
        }
    }


}


export default UsuariosDaoMongo