const express = require('express');
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));


/*Con MULTER vamos a manejar la carga de archivos desde el cliente al servidor
es un middleware de express, y funciona como ayudante para cargar archivos*/

let storage = multer.diskStorage({//en esta parte se declara el manejo del almacenamiento
    destination: function(req, file, cb) {//donde se guarda el archivo
        cb(null , 'uploads');
    },
    filename: function(req, file, cb){//con que nombre se guarda el archivo
        cb(null , file.filename+ '-' + Date.now());
    }
});
let upload = multer({storage: storage});//determinamos que upload es la funcion storage anteriormente configurada de multer


app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/indexMult.html');
});


//upload.single es un middleware, se usa para subir de a un archivo
app.post('/uploadfile' , upload.single('myFile') , (req,res,next)=>{
    const file = req.file;
    if(!file){//si no hay archivo 
        const error = new Error('please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
});

//upload.array es un middleware, se usa para subir multiples archivos
app.post('/uploadmultiple', upload.array('myFiles' , 12) , (req, res, next)=>{
    const files = req.files;
    if(!files){//no hay archivos
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(files)
});


const PORT = 3000;
const server = app.listen(PORT , ()=>{
    console.log(`escuchando en puerto ${PORT}`)
});
server.on('error' , (err)=>{`ocurrio un error: ${err}`});