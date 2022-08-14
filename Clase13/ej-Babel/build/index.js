"use strict";

//instalamos Babel(libreria principal) , cliente por termial ,  plugin(soporta todo js de nueva generacion)
//  @babel/core @babel/cli @babel/preset-env
//Crear fichero de configuracion Babel. 
// .babelrc  -> le especificamos con que plugin vamos a trabajar
//  en este caso es->    "presets": ["@babel/preset-env"]
//en package json agregamos script para correr babel
//normalemnte el coigo ya transpilado se pasa a una carpeta build
// "build": "babel ./origen.js -o ./destino.js -w"
var generateColor = function generateColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  return "rgb(".concat(red, ", ").concat(green, ", ").concat(blue, ")");
};

var color = generateColor();
console.log(color);
/*
Escibimos codigo de js el cual contiene ES6
luego corremos el script de build en el que se utiliza babel 
y lo transpila a codigo mas 'estructurado' ES5 para que lo 
pueda entender cualquier navegador 
*/
