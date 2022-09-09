import ContenedorFirebase from "../../contenedores/contenedorFirebase.js";

class CarritosDaoFirebase extends ContenedorFirebase{
    
    constructor(collection, productosDao){
        super(collection);
        this.productosDao = productosDao;
    }
    
    async create(){
        const doc = await this.collection.doc();
        return await doc.create({prodctos: [], timestamp:  Date.now()});
    }

    async deleteProd(idCarr, idProd){ //elimina un producto de la lista interna TERMINAR
        try{
            const doc = await this.collection.doc(`${idCarr}`);
            let lista = await doc.get();
            lista = await lista.data().productos;
            await doc.update({productos:  lista.filter((prod) => prod.id != idProd)});
        }
        catch(err){
            throw err;
        }
        
    };

    async addProd(idCarr, idProd){
        try{
            const doc = await this.collection.doc(`${idCarr}`);
            let lista = await doc.get();
            lista = await lista.data().productos;
            let prodAux = await this.productosDao.getById(idProd)
            lista.push(prodAux);
            await doc.update({productos: lista});
        }
        catch(err){
            throw err;
        }
    }

    async getAllProds(idCarr){
        const doc = await this.collection.doc(`${idCarr}`);
        let lista = await doc.get();
        lista = await lista.data().productos
        return lista;
    }
}

//const ProductosDao = new ProductosDaoMongo(Productos);

export default CarritosDaoFirebase