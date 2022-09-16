import ContenedorFirebase from "../contenedores/contenedorFirebase.js";

class ContenedorDaoFirebase extends ContenedorFirebase{
    constructor(collection){
        super(collection);
    }
}

export default ContenedorDaoFirebase