use ecommerce;

show dbs;

db.productos.insertMany([ 
    {title: "lapicera" , price: 150 , thumbnail: "IMG"},
    {title: "botella" , price: 1000 , thumbnail: "IMG" },
    {title: "cuchillo" , price: 1550 , thumbnail: "IMG" },
    {title: "cuaderno" , price: 800 , thumbnail: "IMG" },
    {title: "teclado" , price: 3500 , thumbnail: "IMG" },
    {title: "billetera" , price: 3840 , thumbnail: "IMG" },
    {title: "auriculares" , price: 4500 , thumbnail: "IMG" },
    {title: "cargador" , price: 2600 , thumbnail: "IMG" },
    {title: "regla" , price: 350 , thumbnail: "IMG" },
    {title: "mouse" , price: 1680 , thumbnail: "IMG" },
]);
    
db.mensajes.insertMany([
    {email:"desafio@gmail.com", fh:"23/08/2022 06:32:57",mensaje:"perueba1 "},
    {email:"desafio@gmail.com", fh:"23/08/2022 06:32:57",mensaje:"perueba2 "},
    {email:"desafio@gmail.com", fh:"23/08/2022 06:32:57",mensaje:"perueba3 "},
    {email:"desafio@gmail.com", fh:"23/08/2022 06:32:57",mensaje:"perueba4 "},
    {email:"desafio@gmail.com", fh:"23/08/2022 06:32:57",mensaje:"perueba5 "},
    {email:"desafio@gmail.com", fh:"23/08/2022 06:32:57",mensaje:"perueba6 "},
    {email:"desafio@gmail.com", fh:"23/08/2022 06:32:57",mensaje:"perueba7 "},
    {email:"desafio@gmail.com", fh:"23/08/2022 06:32:57",mensaje:"perueba8 "},
    {email:"desafio@gmail.com", fh:"23/08/2022 06:32:57",mensaje:"perueba9 "},
    {email:"desafio@gmail.com", fh:"23/08/2022 06:32:57",mensaje:"perueba10 "},
]);


db.productos.find();
db.mensajes.find();

db.productos.count();
db.mensajes.count();

db.productos.insertOne({title: "lentes" , price: 2000 , thumbnail: "IMG"});
db.productos.find({"title": "lapicera"});
db.productos.find({"price": {$lt: 1000}});
db.productos.find({
    $and:[
        {"price": {$gte: 1000}},
        {"price": {$lte: 3000}}
        ]});
db.productos.find({"price": {$gt: 3000}});
db.productos.updateMany({} , {$set: {"stock": 100}});
db.productos.updateMany({"price": {$gt: 4000}} , {$set: {"stock": 0}});
db.productos.deleteMany({"price": {$lt: 1000}});



db.dropUser("pepe");
db.createUser({user: "pepe",
              pwd: "asd456",
              roles:[{role: "read" , db: "ecommerce"}]
              });


