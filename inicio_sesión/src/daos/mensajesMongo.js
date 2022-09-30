import ContenedorMongo from "../contenedores/contenedorMongo.js";

class ContenedorDaoMongo extends ContenedorMongo{
    constructor(model , uriString){
        super(model , uriString);
        try{
            this.connect()
        }
        catch(err){
            throw new Error(`Error al conectar Dao mongo ${err}`)
        }
    }
}

export default ContenedorDaoMongo