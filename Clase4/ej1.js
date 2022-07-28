var fs = require('fs');

//CREAMOS ARCHIVO
//apenFileSync(nombreArch , contenido , fucion de error)
fs.appendFileSync('primerTexto.txt' , 'que onda pa\n' , function(err) {
    if (err) throw err;
    console.log('guardado primero');
    //la funcion en casos como este es mas sencilla para atrapar errores que un try catch
});

//ESCRIBIR EN UN ARCHIVO QUE YA TIENE CONTENIDO
//openSync(nomnreArch , modo , funcion error)
fs.open('./segundoTexto.txt' , 'w' , function(err,file){
    if (err) throw err;
    console.log('guardado segundo');
});

//ESCRIBIR ARCHIBO USANDO WRITEFILE
fs.writeFileSync('tercerTexto.txt' , 'Ectribo el tercer archivo\n', function(err){
    if(err) throw err;
    console.log('guardado tercero');
});

//MODIFICAR ARCHIVO CON APPEND
fs.appendFileSync('./primerTexto.txt', 'Modificacion con appendFile\n' , function(err){
    if(err) throw err;
    console.log('periero modificado y guardado');
});

//MODIFICAR ARCHIVO CON WRITE
fs.writeFileSync('./segundoTexto.txt', 'Modificacion con write', function(err){
    if(err) throw err;
    console.log('segundo modificado y guardado');
});

//BORRAR ARCHIVOS
fs.unlink('./tercerTexto.txt' , function(err){
    if(err) throw err;
    console.log("se borro con exito");
});