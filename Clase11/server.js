const express = require('express');
const {Server: HTTPServer} = require('http');
const {Server: SocketServer} = require('socket.io');

const app = express();
const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);

app.use(express.static("public"));//para utilizar la carpeta public
app.get ('/' , (req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

socketServer.on('connection' , (socket)=>{ //socket es el canal entre el cliente y el servidor
    console.log(`nuevo cliente conectado`);
    socketServer.emit(`INIT` , `Bienbenido al webSocket`);
});



const PORT = process.env.PORT || 3000;
httpServer.listen(PORT ,()=>{
 console.log(`Server listening port ${PORT}`);
});

