//instalamos Babel(libreria principal) , cliente por termial ,  plugin(soporta todo js de nueva generacion)
//  @babel/core @babel/cli @babel/preset-env


//Crear fichero de configuracion Babel. 
// .babelrc  -> le especificamos con que plugin vamos a trabajar
//  en este caso es->    "presets": ["@babel/preset-env"]


//en package json agregamos script para correr babel
//normalemnte el coigo ya transpilado se pasa a una carpeta build
// "build": "babel ./origen.js -o ./destino.js -w"
const generateColor = ()=>{
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return (`rgb(${red}, ${green}, ${blue})`);
}

var color = generateColor();
console.log(color);

/*
Escibimos codigo de js el cual contiene ES6
luego corremos el script de build en el que se utiliza babel 
y lo transpila a codigo mas 'estructurado' ES5 para que lo 
pueda entender cualquier navegador 
*/