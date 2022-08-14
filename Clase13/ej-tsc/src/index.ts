//PASOS A SEGUIR PARA PODER TRASPILAR DE TS A JS
//instalamos TSC(typescript) npm i typescript
//nos aseguramos de teenr archivo ts => index.ts (aca se escribira codigo tsc)
//corremos comando para transpilar. en el que accedemos al archivo binario instalado en el paquete ts
// COMANDO->    ./node_modules/.bin/tsc index.ts -w
// (El comando se puede agregar a npm run en el paquete json)
//automaticamente se creada un archivo .js traspilado 
//si agregamos -w se indica el modo watch para que cada vez que se guarde se tranaspile
import Ejemplo from "./utils/Ej";
const Ej = new Ejemplo();

const lista:Array<number>=[1,2,3,4,5];
lista.map((x:number)=>x+1).forEach(((x:number)=>console.log(x)))