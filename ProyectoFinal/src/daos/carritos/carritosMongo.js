import ContenedorMongo from "../../contenedores/contenedorMongo.js";


class CarritosDaoMongo extends ContenedorMongo{

    constructor(model, productosDao){
        super(model);
        this.productosDao = productosDao; 
    }

    async deleteProd(idCarr, idProd){ //elimina un producto de la lista interna TERMINAR
        try{
            const carrito = await this.model.findOne({'_id': idCarr});
            const productos = carrito.productos; //obtengo productos
            console.log(productos.length)
            for(let i = 0; i<= productos.length-1 ; i++){
                if(productos[i]._id == idProd){
                   productos.splice(i,1);
                   break
                }
            }
            console.log(productos.length)
            await this.model.updateOne({'_id': idCarr} , {$set: {productos: productos}});
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

    async createCarr(){
        const newCarr = await this.model.create({productos: []});
        return newCarr._id;
    }


}

//const CarritosDao = new CarritosDaoMongo(Carritos);

export default CarritosDaoMongo
