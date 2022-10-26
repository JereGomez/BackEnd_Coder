

(function(){//FUNCION ANONIMA AUTOINVOCADA
    console.log("hola autonivocado");
})();

let i = 1;
const contador = (function (){ 
    i = 0;
    return function(){ //CLOSURE GUARDA ESTADO DE LA INVOCACION ANTERIOR
        return i++;
    }
})();
console.log(contador()); //0
console.log(contador()); //1
console.log(contador()); //2  ...

 //------(1)-----
const mostrarLista = (lista) =>{
    lista.length == 0? console.log('lista vacia') : console.log(...lista);
}

const lista = [];
mostrarLista(lista);

//------(2)------
(function(){//FUNCION ANONIMA AUTOINVOCADA
    const lista = [1,5,9];
    console.log(...lista);
})();


//-----(3)------

const crearMultiplicador = (num1 , num2) =>{
    console.log(num1*num2);
    return(duplicar(num1,num2) , triplicar(num1 , num2));
}

const duplicar = (num1 , num2) =>{
    console.log(num1*2  , " // " , num2*2)
}

const triplicar = (num1 , num2) =>{
    console.log(num1*3  , " // " , num2*3)
}

crearMultiplicador(3,5);