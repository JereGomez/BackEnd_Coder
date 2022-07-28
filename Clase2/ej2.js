class Contador{
    constructor(nombre){
        this.conteoLocal = 0;
        this.nombre = nombre;
    }

    static conteoGeneral = 0;


    obtenerCuentaGlobal(){
        return Contador.conteoGeneral;
    }


}

class Persona extends Contador{


    obtenerResponsable(){
        return this.nombre;
    }

    obtenerCuentaIndividual(){
        return this.conteoLocal;
    }

    contar(){
        this.conteoLocal ++;
        Contador.conteoGeneral ++;
    }

}

const jere  = new Persona("jere");
const tomas = new Persona("tomas");
console.log(jere.obtenerResponsable());
console.log(jere.obtenerCuentaIndividual(), " cuneta de jere");
console.log(jere.obtenerCuentaGlobal(), " cuneta global");

jere.contar();
tomas.contar();
jere.contar();

console.log(jere.obtenerCuentaIndividual() , " cuneta de jere");
console.log(jere.obtenerCuentaGlobal() , " cuneta global");
console.log(tomas.obtenerCuentaIndividual() , " cuneta de tomas");