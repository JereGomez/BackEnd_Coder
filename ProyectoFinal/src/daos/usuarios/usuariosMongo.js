import ContenedorMongo from "../../contenedores/contenedorMongo.js";
import { CarritosDao } from "../factory.js";
//import { CarritosDao } from "../index.js";

class UsuariosDaoMongo extends ContenedorMongo{
    
    constructor(Model){
        super(Model, CarritosDao);
    }



    async createUser(item){
        try{
            item.carrito = await CarritosDao.createCarr();
            const user = await this.model.create(item);
            return user;
        }
        catch(err){
            throw(err);
        }
    }

    async getCarId(user){
        const carr = await this.model.findOne({'_id': user._id});
        return carr.carrito;
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