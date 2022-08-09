//SERVIDOR WebSocket, Recordar que webSocket debe ser implementado tanto del lado del servidor como del cliente
const express = require('express');
const {Server: HTTPServer} = require('http'); //Invocamos la clase Server del modulo http
const {Server: SocketServer} = require('socket.io'); //Invocamos la clase Server del modulo socket

const messages = [];


const app = express();
const httpServer = new HTTPServer(app); //modulo http toma los endpoint de la app
const socketServer = new SocketServer(httpServer); //socjet.io    comprate propiedades tomadas por http de la app a socketserver

app.use(express.static("public"));//para utilizar la carpeta public

app.get ('/' , (req,res)=>{
    res.sendFile(__dirname + "/public/index.html"); //__dirname= posicion del directorio actual 
});

socketServer.on('connection' , (socket)=>{ //socket es el canal entre el cliente y el servidor
    console.log(`nuevo cliente conectado`);
    socketServer.emit(`INIT` , messages); //emite evento INIT al iniciar la comunicacion 

    socket.on("POST_MSG" , (msg)=>{//escuchamos el evento creado del lado del cliente que trae el mensaje y el nombre todo dentro del obj msg
        const _msg = {...msg, id: socket.id} //objeto mensaje para poder agregar el socket id
        messages.push(_msg); //pusheamos msg(mensaje y nombre) al array de mensajes
        console.log(_msg);

        socketServer.sockets.emit("RESP_MSG", _msg);
    });
});



const PORT = process.env.PORT || 3000; //process.env
httpServer.listen(PORT ,()=>{
 console.log(`Server listening port ${PORT}`);
});

