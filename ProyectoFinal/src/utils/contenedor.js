import fs from "fs";

//CLASE CONTENEDOR
class Contenedor{
    constructor(path){
        this.path = path;

    }
    

    async save(producto){
        
        try{
            this.id = 1;
            const contenido = JSON.parse(await fs.promises.readFile(`${this.path}` , 'utf8')); //OBTENGO ELEMENTOS YA GUARDADOS
            let existe;
            (producto.id === undefined) ? existe=true : existe=false; //determinamos si el producto viene con o sin id. Ya que al actualizar un producto se lo elimina y vuelve a agragar con id ya asignado
            while(existe == true){
                if(!(contenido.filter((item) => item.id == this.id).length == 0)){//CHEQUEAMOS SI EL ID EXISTE dentro de los productos
                    console.log(`El id(producto) ${this.id} ya existe, sumamos 1`);
                    existe = true;
                    this.id ++;
                } 
                else{ //NO EXISTE EL ID dentro de los prouctos
                    producto.id = this.id;//incorporamos id al producto
                    console.log("Se le asigno el sguiente ID ", producto.id);
                    existe = false;
                    this.id++;

                }
            }
            
            //LUEGO DE SOLUCIONAR EL ASUNTO DEL ID, pasamos a completar el resto del producto con codigo y timestamp  
            let cod;
            (producto.codigo === undefined) ? cod=false : cod=true;//preguntamos si el codigo existe, este persiste aunque el producto sea actualizado
            if(cod == false){//codigo no existe
                producto.codigo = `${producto.id}${(producto.title).substring(0,3)}${Math.floor(producto.price/2)}` //generamos codigo
                producto.codigo = (producto.codigo).toLowerCase(); //lo pasamos a minuscula
            }
            producto.timestamp = Date.now();//
            //console.log(producto);
  
            contenido.push(producto);//agregamos el producto con id al array del archivo
            await fs.promises.writeFile(`${this.path}` , JSON.stringify(contenido.sort((a, b) => a.id - b.id), null, 2));
            console.log("guardado");
            return producto.id;

            //console.log(contenido);
        }
        catch(err){
            throw(err);
        }
    }



        

        
    async getById(number){
        try{
            const contenido = JSON.parse(await fs.promises.readFile(`${this.path}` , 'utf8'));//leemos el archivo y obtenemos el contenido en formato JSON
            if(!(contenido.filter((item) => item.id == number).length == 0)){//si al filtrar devuelve una lista vacia, el elemento no existe / el id no se encuentra
                //console.log(`El elemento deseado con id: ${number}, es el siguiente`);
                //console.log(contenido.filter((item) => item.id == number));
                return(contenido.filter((item) => item.id == number))[0];//[0] para obtener el producto y no un array con el producto dentro
            }else{
                console.log(`El elemento deseado con id: ${number}, no existe`);
                console.log(contenido.filter((item) => item.id == number));
                return(null);
            }
    
        }
        catch (err){
            throw(err);
        }
    }

    async getAll(){
        try{
            const contenido =  await fs.promises.readFile(`${this.path}` , 'utf8');
            //console.log(contenido , "contenido");
            const arrP = await JSON.parse(contenido);
            //console.log(arrP);  
            return arrP;
        }
        catch(err){
            throw(err)
        }
        
    }
    
    async deleteById(number){
        
        try{
            const contenido = JSON.parse(await fs.promises.readFile(`${this.path}` , 'utf8'));//leemos el archivo y obtenemos el contenido en formato JSON
            //console.log(contenido);
            await fs.promises.writeFile(`${this.path}` , JSON.stringify(contenido.filter((item) => item.id != number), null, 2)); //lo reescribimos filtrando por el ID que deseamos eliminar
            
            !(contenido.filter((item) => item.id == number).length == 0)? console.log(`Se elimino el siguiente elemento con id:${number}`) : console.log("el producto no existia");
            //console.log("guardado");
        }
        catch (err){
            throw(err);
        }
    }

    async deleteAll(){

        try{
            await fs.promises.writeFile(`${this.path}` , '');
            console.log("Archivo vaciado");
        }
        catch (err){
            throw(err);
        }
    }

    async updateById(id, obj){
        try{
            const prodAux = await this.getById(id); //obtenemos el producto a actualizar
            //console.log(prodAux);
            //await this.deleteById(id);
            for(let v in obj){ //recorremos ebjeto que obtenemos de la peticion http y solo reemplazamos lo que se nos mando, el resto queda igual
                if(obj[v].length>1 && obj[v] != " "){//que no sea un campo vacio
                    console.log(obj[v]);
                    prodAux[v] = obj[v];    
            }
            }
            //console.log(prodAux);
            await this.deleteById(id)//eliminamos objeto viejo por id
            await this.save(prodAux);
        }
        catch (err){
            throw(err);
        }
    }




}




export default Contenedor;