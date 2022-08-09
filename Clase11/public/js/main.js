//Cliente WebSocket
const socket = io(); //funciones de soket del lado del cliente 

socket.on('connect' , ()=>{
    console.log('cliente conectado al servidor');
});

socket.on("INIT" , (messages) =>{//escucha el evento INIT y lanza una alerta con el mensaje de ese evento 
    const posts = document.getElementById('posts');
    posts.innerHTML = "";
    for(let msg of messages){
        postMessage(msg);
    }
});

socket.on('RESP_MSG' , (msg) =>{
    postMessage(msg);
});

function postMessage(msg){
    const posts = document.getElementById('posts');
    posts.innerHTML += `
    <div class= "post ui card">
        <div class= "div ui container">
        <b>${msg.nombre}(${msg.id}):</b> ${msg.mensaje} 
        </div>
    </div>`;
};

function enviarMensaje(){
    console.log('hola puto');
    const nombre = document.getElementById('nombre').value;
    const mensaje = document.getElementById('mensaje').value;
    socket.emit("POST_MSG" , {nombre , mensaje}) //Creamos evento POST_MSG que envia objeto con el nombre y el mensaje
};
