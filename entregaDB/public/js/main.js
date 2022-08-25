const socket = io(); //funciones de soket del lado del cliente 
moment.locale('es');

socket.on('connect' , ()=>{
});




socket.on('all_prods' , (productos)=>{
    const url="http://localhost:8080/views/partials/productosHBS.hbs";
    fetch(url).then((resp)=>{ //hacemos fetch de la url para pasarla a texto y luego manejarla con handlebars
        return resp.text();
    }).then((text)=>{
        const template=Handlebars.compile(text);
        const html = template({productos: productos});
        const div = document.getElementById('productos');
        div.innerHTML = html;
    });
});

socket.on('chat' , (mensajes)=>{
    const url="http://localhost:8080/views/partials/chatHBS.hbs";
    fetch(url).then((resp)=>{ //hacemos fetch de la url para pasarla a texto y luego manejarla con handlebars
        return resp.text();
    }).then((text)=>{
        const template=Handlebars.compile(text);
        const html = template({mensajes: mensajes});
        const div = document.getElementById('mensajes');
        div.innerHTML = html;
    });
});

function enviarMensaje(){
    const email = document.getElementById('email').value;
    const fh = new Date().toLocaleString();
    console.log(fh)
    const msg = document.getElementById('mensaje').value;
    if (email){
        const mensaje = {email: email, fh: fh , mensaje: msg}
        socket.emit('nuevo_msg' , mensaje)
    }

}



function nuevoProducto(){ //obtenemos todos los datos del nuevo producto
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    if(title, price , thumbnail){
        const producto = {title: title , price: price , thumbnail: thumbnail}
        console.log(producto)
        socket.emit('NEW_PROD' , producto); //enviamos el producto al servidor
    }
};

