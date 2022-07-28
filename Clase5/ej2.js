
//--------2 TRABAJANDO CON EL ARRAY DE OBJETOS------
const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

//A nombres
let nombres = '';
for(let i=0 ; i<productos.length ; i++){
    productos[i+1] == null ? nombres += `${productos[i].nombre}` : nombres += `${productos[i].nombre},`; // evaluo ultima posicion para que el ultimo nombre no tenga ","
}


//B total
let total = 0;
for(let i=0 ; i<productos.length ; i++){
    total += productos[i].precio;
}
total = parseFloat(total.toFixed(2));

//C promedio
let promedio = parseFloat((total/productos.length).toFixed(2));

//D menor
const menor = {nombre: productos[0].nombre , precio: productos[0].precio};
for(let prod of productos){
    if(prod.precio < menor.precio){//evaluo precio, si cumple reempazo
        menor.nombre = prod.nombre;
        menor.precio = prod.precio;
    }
}
//console.log(menor);


//E mayor

const mayor = {nombre: productos[0].nombre , precio: productos[0].precio};
for(let prod of productos){
    if(prod.precio > mayor.precio){//evaluo precio, si cumple reempazo
        mayor.nombre = prod.nombre;
        mayor.precio = prod.precio;
    }
}
//console.log(mayor);

const respuestas = {A: nombres,
                    B: total,
                    C: promedio,
                    D: mayor, 
                    E: menor};
console.log(respuestas);