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
            console.log(existe)
            while(existe == true){
                if(!(contenido.filter((item) => item.id == this.id).length == 0)){//CHEQUEAMOS SI EL ID EXISTE dentro de los productos
                    console.log(`El id ${this.id} ya existe, sumamos 1`);
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
            
            //LUEGO DE SOLUCIONAR EL ASUNTO DEL ID, pasamos a completar el resto del producto
            

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
                console.log(`El elemento deseado con id: ${number}, es el siguiente`);
                console.log(contenido.filter((item) => item.id == number));
                return(contenido.filter((item) => item.id == number));
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
            
            !(contenido.filter((item) => item.id == number).length == 0)? console.log(`Se elimino el siguiente elemento con id:${number}`) : console.log("el elemento no existia");
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





}




export default Contenedor;