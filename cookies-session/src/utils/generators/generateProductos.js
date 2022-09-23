import {faker} from '@faker-js/faker';

function generarUnProd(){
    let producto = {
        nombre:  faker.commerce.productName(),
        precio: faker.commerce.price(),
        foto: faker.image.business()
    }
    return producto;
}

function traerProductos(cant){
    const productos = [];
    for(let i = 0; i<cant ; i++){
        let prod = generarUnProd();
        productos.push(prod);
    }
    return productos;
}

export {traerProductos}