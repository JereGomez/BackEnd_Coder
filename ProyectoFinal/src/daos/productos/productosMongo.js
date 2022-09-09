import ContenedorMongo from "../../contenedores/contenedorMongo.js";

class ProductosDaoMongo extends ContenedorMongo{
    
    constructor(Model, uriString){
        super(Model, uriString);
        try{
            this.connect();
        }
        catch(err){
            throw new Error(`Error en la inicializacion del CarritoDao: ${err}`);
        }
    }
    
}

//const ProductosDao = new ProductosDaoMongo(Productos);

export default ProductosDaoMongo