/* A- Crear un proyecto en node.js que genere 10000 números aleatorios en
el rango de 1 a 20. */

const random = (max, min) => {
    return Math.floor(Math.random() * (max - min))
}

const createArrayRandom = (cantidad, maxNum, minNum) => {
    let arr = []
    for (let i = 0; i <= cantidad; i++) {
        arr.push(random(maxNum, minNum))
    }
    return arr
}

let newArr = createArrayRandom(1000, 21, 1)

/* B- Crear un objeto cuyas claves sean los números salidos y el valor
asociado a cada clave será la cantidad de veces que salió dicho número.
Representar por consola los resultados. */

const comp = (array) => {

    let obj = {}
    for (let i = 0; i < array.length; i++) {
        let key = String(newArr[i])
        if (key in obj) {
            obj[key] += 1
        } else {
            obj[key] = 1
        }
    }
    return obj
}

console.log('Array de numeros aleatorios:', newArr);
console.log('Objeto de nuemeros que se encuentran en el array:', comp(newArr));

// 2- ARRAY DE OBJETOS

const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

/* Y obtenga la siguiente información de dicho array
A) Los nombres de los productos en un string separados por comas. */

const string = productos.map(({ nombre }) => nombre).reduce((prevStr, laterStr, index) => {
    if (index == 0) {
        return prevStr + laterStr
    } else {
        return prevStr + ', ' + laterStr
    }
}, '')

console.log('String concatenado:', string)

// B) El precio total

const totalPrice = productos.map(({ precio }) => precio).reduce((prevPrice, nextPrice) => prevPrice + nextPrice, 0)
console.log('Precio total:', totalPrice)

// C) El precio promedio

const promedio = totalPrice / productos.length
console.log('El precio promedio es:', promedio)

// D) El producto con menor precio

const precios = productos.map(({ precio }) => precio)
const minPrice = Math.min(...precios)
console.log('El precio minimo entre los productos es:', minPrice)

//E) El producto con mayor precio

const maxPrice = Math.max(...precios)
console.log('El precio maximo entre los productos es:', maxPrice)

/*F) Con los datos de los puntos 1 al 5 crear un objeto y representarlo por consola
Aclaración: todos los valores monetarios serán expresados con 2 decimales */

class objF {
    constructor(A, B, C, D, E){
        this.A = A;
        this.B = B;
        this.C = C;
        this.D = D;
        this.E = E;
    }
}

const F = new objF(string, totalPrice, promedio, minPrice, maxPrice);

console.log(F);

/* Realizar un proyecto en node.js que permita calcular cuántos años y días totales transcurrieron
desde la fecha de tu nacimiento. Para ello utilizar la dependencia moment instalándola en forma local
desde npm. Imprimir los resultados por consola. Hacer las modiﬁcaciones necesarias para que sólo se
actualicen los patches para la librería recién instalada.
Un ejemplo de salida:
Hoy es 11/01/2021
Nací el 29/11/1968
Desde mi nacimiento han pasado 52 años.
Desde mi nacimiento han pasado 19036 días.
Ayuda:
Utilizar los métodos diﬀ y format de la librería moment. */