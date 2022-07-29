//Cliente WebSocket
const socket = io();

socket.on('connec't , ()=>{
    console.log('conectado al servidor');
});

socket.on("INIT" , (msg) ={
    alert(msg);
});

socket.on("NEW MESSAGE" , (msg)={
    
});

 