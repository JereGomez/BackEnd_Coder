import ContenedorFirebase from "../../contenedores/contenedorFirebase.js";

class ProductosDaoFirebase extends ContenedorFirebase{
    
    constructor(collection){
        super(collection);
    }
    
}

//const ProductosDao = new ProductosDaoMongo(Productos);

export default ProductosDaoFirebase