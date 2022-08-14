class Ejemplo{
    constructor(saludo){
        this.saludo=saludo
    }

    saludar(){
        console.log(this.saludo);
    }
}


// module.exports = Ejemplo   //COMMONJS

export default Ejemplo; //ES6 MODULES