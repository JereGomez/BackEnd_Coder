let fs = require('fs');

class manejoMSG{
    constructor(nombreArch){
        this.nombreArch = nombreArch;
    }

    async save(msg){
        try{
            const mensajes = JSON.parse(await fs.promises.readFile(`./db/${this.nombreArch}.json` , 'utf8')); //OBTENGO ELEMENTOS YA GUARDADOS
            mensajes.push(msg);//agregamos el producto con id al array del archivo
            await fs.promises.writeFile(`./db/${this.nombreArch}.json` , JSON.stringify(mensajes));
            console.log("guardado");
        }
        catch(err){
            throw(err);
        }
    }

    async getMsg(){
        try{
            const mensajes =  await fs.promises.readFile(`./db/${this.nombreArch}.json` , 'utf8');
            const arrM = await JSON.parse(mensajes);
            return arrM;
        }
        catch(err){
            throw(err)
        }
    }
}

module.exports = new manejoMSG("mensajes");