import ContenedorMongo from "../../contenedores/contenedorMongo.js";

class ProductosDaoMongo extends ContenedorMongo{
    
    constructor(Model){
        super(Model);
    }
    
}

//const ProductosDao = new ProductosDaoMongo(Productos);

export default ProductosDaoMongo