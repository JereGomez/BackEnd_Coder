const express=require("express");
const handlebars=require("express-handlebars");
const app=express();

app.use(express.static("public"));


const hbs = handlebars.create({
    extname:".hbs",
    defaultLayout:"index.hbs",
    layoutsDir:__dirname+"/views/layout",
    partialsDir:__dirname+"/views/partials/"
});

app.engine("hbs", hbs.engine);
app.set('views' , './views');
app.set('view engine' , 'hbs');


app.get("/",(req,res)=>{
    const user = {
        nombre: "Antonio",
        apellido: "Aguilar",
        edad: 30,
        telefono: "+504 XXXXXXX",
        email: "jaguilar992@gmail.com",
        comments: [
            {text: "Qué super se ve tu sitio", user: "jlopez"},
            {text: "Hola", user: "smorgan"}
        ]
    }
    res.render('main' , user);
});

app.get('/saludo' , (req , res)=>{//ruta personalizada
    const saludo={//objeto a mostrar
        saludo: 'Holaaaa',
        cuerpo: 'saludando desde el mas alla'
    };

    res.render('main' ,{ //renderiza main.hbs y dentro se pregunta si saludo existe
         saludo:true,//dentro de esta ruta saludo existe por lo que se muestra
         ...saludo //descomprimo objeto a mostrar
    });
});


const PORT = 8080;
app.listen(PORT , ()=>{
    console.log(`Running on port ${PORT}`);
});