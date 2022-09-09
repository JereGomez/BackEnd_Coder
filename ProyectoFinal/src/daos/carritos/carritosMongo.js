import ContenedorMongo from "../../contenedores/contenedorMongo.js";


class CarritosDaoMongo extends ContenedorMongo{

    constructor(model , uriString, productosDao){
        super(model, uriString);
        try{
            this.connect();
        }
        catch(err){
            throw new Error(`Error en la inicializacion del CarritoDao: ${err}`);
        }
        this.productosDao = productosDao; 
    }

    async deleteProd(idCarr, idProd){ //elimina un producto de la lista interna TERMINAR
        try{
            const carrito = await this.model.findOne({'_id': idCarr});
            const productos = carrito.productos;
            await this.model.updateOne({'_id': idCarr} , {$set: {productos:  productos.filter((prod) => prod._id != idProd)}});
        }
        catch(err){
            throw err;
        }
        
    };

    async addProd(idCarr, idProd){
        try{
            const carrito = await this.model.findOne({'_id': idCarr});
            const productos = carrito.productos;
            const prodAgregar = await this.productosDao.getById(idProd);
            productos.push(prodAgregar);
            await this.model.updateOne({'_id': idCarr} , {$set: {productos: productos}});
            
        }
        catch(err){
            throw err;
        }
    }

    async getAllProds(idCarr){
        const carrito = await this.model.findOne({'_id': idCarr});
        const productos = carrito.productos;
        return productos;
    }

    async create(){
        await this.model.create({productos: []});
    }


}

//const CarritosDao = new CarritosDaoMongo(Carritos);

export default CarritosDaoMongo
