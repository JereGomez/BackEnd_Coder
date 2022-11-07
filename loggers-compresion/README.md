COMANDOS PARA EL USO DEL SERVIDOR 
siempre haciendo referencia al archivo server.js (dentro de la carpeta src) el cual levanta el servidor
--MODULO CLUSTER--
        node server.js -m  -p<puerto>
    parmetros:  -m => modo de ejecucion: CLUSTER / FORK
                -p => puerto en el que se desea levantar el servidor

--MODULO FOREVER--  
        forever start <opciones forever> server.js <parametros propios del script> 
        opciones forever: parametro propios del modulo forever, como puede ser "--watch"

--MODULO PM2--
        pm2 start server.js --name="nombre" --watch -- <parametros propios del script>
        en pm2 podemos elegir el modo de ejecucion (CLUSTER / FORK) desde el mismo pm2
        o utilizando los parametros propios. 
        Desde pm2 seria con el comado "-i max" luego de "--watch"




