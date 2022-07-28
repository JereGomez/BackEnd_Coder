//CREANDO SERVIDORES CON http DE NODE

const http = require('http');
const moment = require("moment");
moment.locale('es');


const compHora = ()=>{
    let mensaje = '';
    let fecha = moment();

    const mañana =  moment('06:00' , 'HH:mm');
    const tarde =  moment('12:00' , 'HH:mm');
    const noche =  moment('20:00' , 'HH:mm');
    
    if( mañana <= fecha && tarde >= fecha ){ //convierto la hora a int y comparo con el resto de las horas(que son int)
        mensaje = `Son las ${fecha.format('hh:mm')}, Buenos dias!!`;
    }

    else if(tarde < fecha && noche > fecha){//convierto la hora a int y comparo con el resto de las horas(que son int)
        mensaje = `Son las ${fecha.format('hh:mm')}, Duenas tardes!!`;
    }

    else{//convierto la hora a int y comparo con el resto de las horas(que son int)
        mensaje = `Son las ${fecha.format('hh:mm')},Buenas Noches!!`;
    }

    return mensaje;

}


//CREAMOS EL SERVIDOR
const server = http.createServer((req, res) =>{
    let mensaje = compHora();
    res.end(mensaje);


});

const connectedServer = server.listen(8080, ()=>{
    console.log("servidor escuchando en: " + connectedServer.address().port);
});



