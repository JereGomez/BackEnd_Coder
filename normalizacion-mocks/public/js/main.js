const socket = io(); //funciones de soket del lado del cliente 

socket.on('connect' , ()=>{
});




function productos(){
    fetch("localhost:8080/api/productos-test").then((resp)=>{const productos =  resp.json});
    console.log(productos)
    const url="http://localhost:8080/views/partials/productosHBS.hbs";
    fetch(url).then((resp)=>{ //hacemos fetch de la url para pasarla a texto y luego manejarla con handlebars
        return resp.text();
    }).then((text)=>{
        const template=Handlebars.compile(text);
        const html = template(productos);
        const div = document.getElementById('productos');
        div.innerHTML = html;
    });
};


const author= new normalizr.schema.Entity('authors', {},{idAttribute: 'email'});
const text = new normalizr.schema.Entity('texts', {});
const message = new normalizr.schema.Entity('messages',{
    author: author,
    text: text,
})
const messageArray = [message]


socket.on('chat' , (mensajes)=>{
    const msgDenormmalized = normalizr.denormalize(mensajes.result , messageArray, mensajes.entities);
    const url="http://localhost:8080/views/partials/chatHBS.hbs";
    fetch(url).then((resp)=>{ //hacemos fetch de la url para pasarla a texto y luego manejarla con handlebars
        return resp.text();
    }).then((text)=>{
        const template=Handlebars.compile(text);
        const html = template({mensajes: msgDenormmalized});
        const div = document.getElementById('mensajes');
        div.innerHTML = html;
    });



});

function enviarMensaje(){
    const email = document.getElementById('email').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const alias = document.getElementById('alias').value;
    const msg = document.getElementById('mensaje').value;
    if (email, nombre, apellido, edad, alias, msg){
        const mensaje = {
            author: {
                id: email, 
                nombre: nombre, 
                apellido: apellido, 
                edad: edad, 
                alias: alias
            },
            text: msg
        }
        socket.emit('nuevo_msg' , mensaje)
    }

}




