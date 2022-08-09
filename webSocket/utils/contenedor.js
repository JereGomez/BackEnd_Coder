let fs = require('fs');
const { resolve } = require('path');

//CLASE CONTENEDOR
class Contenedor{
    constructor(nombreArch){
        this.nombreArch = nombreArch;
        this.id = 1;
    }
    

    async save(producto){
        /*
        for(let i = 0 ; i<producto.length; i++){
            producto[i].id = this.id;
            arrAux.push(producto[i]);
            this.id ++;
        }*/
        
        try{
            const contenido = JSON.parse(await fs.promises.readFile(`./db/${this.nombreArch}.json` , 'utf8')); //OBTENGO ELEMENTOS YA GUARDADOS
            let existe = true;
            while(existe == true){
                if(!(contenido.filter((item) => item.id == this.id).length == 0)){//CHEQUEAMOS SI EL ID EXISTE
                    console.log(`El id ${this.id} ya existe, sumamos 1`);
                    existe = true;
                    this.id ++;
                } 
                else{ //NO EXISTE EL ID
                    producto.id = this.id;//incorporamos id al producto
                    console.log("Se le asigno el sguiente ID ", producto.id);
                    existe = false;
                    this.id++;

                }
            }
            contenido.push(producto);//agregamos el producto con id al array del archivo
            await fs.promises.writeFile(`./db/${this.nombreArch}.json` , JSON.stringify(contenido.sort((a, b) => a.id - b.id)));
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
            const contenido = JSON.parse(await fs.promises.readFile(`./db/${this.nombreArch}.json` , 'utf8'));//leemos el archivo y obtenemos el contenido en formato JSON
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
            const contenido =  await fs.promises.readFile(`./db/${this.nombreArch}.json` , 'utf8');
            //console.log(contenido , "contenido");
            const arrP = await JSON.parse(contenido);
            //const arrP = contenido;
            //console.log(arrP);  
            return arrP;
        }
        catch(err){
            throw(err)
        }
        
    }
    
    async deleteById(number){
        
        try{
            const contenido = JSON.parse(await fs.promises.readFile(`./db/${this.nombreArch}.json` , 'utf8'));//leemos el archivo y obtenemos el contenido en formato JSON
            //console.log(contenido);
            await fs.promises.writeFile(`./db/${this.nombreArch}.json` , JSON.stringify(contenido.filter((item) => item.id != number))); //lo reescribimos filtrando por el ID que deseamos eliminar
            
            !(contenido.filter((item) => item.id == number).length == 0)? console.log(`Se elimino el siguiente elemento con id:${number}`) : console.log("el elemento no existia");
            //console.log("guardado");
        }
        catch (err){
            throw(err);
        }
    }

    async deleteAll(){

        try{
            await fs.promises.writeFile(`./db/${this.nombreArch}.json` , '');
            console.log("Archivo vaciado");
        }
        catch (err){
            throw(err);
        }
    }



}

const contenedor = new Contenedor("productos");
/*
LISTA DE PRODUCTOS QUE INCLUYE EL ARCHIVO

    title: 'Escuadra',                                                                                                                                 
    price: 123.45,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    },
    {                                                                                                                                                    
        title: 'Calculadora',                                                                                                                              
        price: 234.56,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                                                                                                                                                                        
    },
    {                                                                                                                                                    
        title: 'Globo Terráqueo',                                                                                                                          
        price: 345.67,                                                                                                                                     
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                                                                                                                                                                 
    }    
]*/


const producto = { //OBJETO PARA AGREGAR A MODO DE PRUEBA
    title: "Lapicera",
    price: 125.50,
    thumbnail: "URL de imagen aqui",
};





module.exports = new Contenedor("productos");