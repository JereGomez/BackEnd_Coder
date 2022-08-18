import fs from "fs";
import Contenedor from "./contenedor.js";
const contenedor = new Contenedor("./db/productos.json");
//CLASE CONTENEDOR
class ManejoCarr{
    constructor(path){
        this.path = path;
        
    };

    async create(){
        try{
            this.id = 1;
            const contenido = JSON.parse(await fs.promises.readFile(`${this.path}` , 'utf8')); //OBTENGO CARRITOS YA GUARDADOS
            let existe = true; //bandera para determinar si existe o  no el id a asignar 
            while(existe == true){
                if(!(contenido.filter((item) => item.id == this.id).length == 0)){//CHEQUEAMOS SI EL ID EXISTE dentro de los carritos
                    console.log(`El id(carrito) ${this.id} ya existe, sumamos 1`);
                    existe = true;
                    this.id ++;
                }
                else{ //NO EXISTE EL ID dentro de los prouctos
                    //let id = this.id;//incorporamos id al producto
                    console.log("Se le asigno el sguiente ID ", this.id);
                    existe = false;
                    //this.id++;

                }
            }
            const carrAux= {
                id: this.id,
                timestamp: Date.now(),
                productos: []
            }
            contenido.push(carrAux);//agregamos el carrito con id al array del archivo
            await fs.promises.writeFile(`${this.path}` , JSON.stringify(contenido.sort((a, b) => a.id - b.id), null, 2));
            console.log("Carrito creado y guardado");
            return carrAux.id;
        }
        catch(err){
            throw(err);
        }
    }

    async deleteById(id){
        try{
        const contenido = JSON.parse(await fs.promises.readFile(`${this.path}` , 'utf8')); //OBTENGO CARRITOS YA GUARDADOS

        await fs.promises.writeFile(`${this.path}` , JSON.stringify(contenido.filter((item) => item.id != id), null, 2)); //lo reescribimos filtrando por el ID que deseamos eliminar
            
        !(contenido.filter((item) => item.id == id).length == 0)? console.log(`Se elimino el siguiente elemento con id:${id}`) : console.log("el carrito no existia");
        }
        catch(err){
            throw(err);
        }
    }

    async getProducts(id){//se le pasa el id del carrito del que queremos los productos
        try{
            const contenido = JSON.parse(await fs.promises.readFile(`${this.path}` , 'utf8')); //OBTENGO CARRITOS YA GUARDADOS
            if(contenido.filter((item) => item.id == id).length != 0){ //exist el carrito con ese id
                const carrAux = contenido.filter((item) => item.id == id)[0] 
                return carrAux.productos
            } //obtenemos el carrito deseado 
            else{
                console.log("No existe el carrito con el id indicado")
            }
        }
        catch(err){
            throw(err);
        }
    }

    async agregarProd(id , id_prod){
        try{
            const contenido = JSON.parse(await fs.promises.readFile(`${this.path}` , 'utf8')); //OBTENGO CARRITOS YA GUARDADOS
            const prodAux = await contenedor.getById(id_prod); //obtengo el producto a agregar en el carrito
            if(contenido.filter((item) => item.id == id).length != 0){ //exist el carrito con ese id
                const carrAux = contenido.filter((item) => item.id == id)[0]
                if(prodAux != null){ //nos aseguramos que no venga un objeto nulo(producto no existente)
                    carrAux.productos.push(prodAux); //pusheo producto deaseado dentro del carrito
                    //console.log(`productoID: ${prodAux.id}, guardado en carritoID: ${carrAux.id}`);
                }
            } //obtenemos el carrito deseado 
            else{
                console.log("No existe el carrito con el id indicado")
            }

            await fs.promises.writeFile(`${this.path}` , JSON.stringify(contenido.sort((a, b) => a.id - b.id), null, 2));
        }
        catch(err){
            throw (err);
        }
    }

    async deleteProd(id, id_prod){
        try{
            const contenido = JSON.parse(await fs.promises.readFile(`${this.path}` , 'utf8')); //OBTENGO CARRITOS YA GUARDADOS
            if(contenido.filter((item) => item.id == id).length != 0){ //exist el carrito con ese id
                const carrAux = contenido.filter((item) => item.id == id)[0]
                carrAux.productos = (carrAux.productos).filter((item)=> item.id != id_prod); //filtramos lista de productos para que no tenga el producto a eliminar
                console.log(`ProductoID: ${id_prod}, eliminado de carritoID: ${id}`);
            } //obtenemos el carrito deseado 
            else{
                console.log("No existe el carrito con el id indicado")
            }

            await fs.promises.writeFile(`${this.path}` , JSON.stringify(contenido.sort((a, b) => a.id - b.id), null, 2));
        }
        catch(err){
            throw(err)
        }
    }
}


export default ManejoCarr;