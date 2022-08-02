const express=require("express");
const handlebars=require("express-handlebars");
const app=express();

const hbs=handlebars.create({//objeto para definir opciones de configuracion
    extname:".hbs", //nombre de extencion
    defaultLayout:"index.hbs",
    layoutsDir:__dirname+"/views/layout", //direccion de layouts
    partialsDir:__dirname+"/views/partials/" //direcciones parciales
});

app.use(express.static("public"));

app.engine("hbs", hbs.engine);// declaramos el moton a utilizar, y pasamos la funcion engine del objeto handlebars creado anteriormemnte. Aqui se renderiza el codigo
app.set("view engine", "hbs");
app.set("views", "./views");

fakeApi=()=>[

    {name:"Katarina",lane:"midlaner"},
    {name:"Jayce",lane:"toplaner"},
    {name:"Herbert",lane:"toplaner"},
    {name:"Alan",lane:"midlaner"},
    {name:"Bob",lane:"midlaner"},
]

app.get("/",(req,res)=>{
    res.render("main",{
        suggestedChamps:fakeApi(),
        listExists:true
    });
});

const PORT = 8080;
app.listen(PORT , ()=>{
    console.log(`Running on port ${PORT}`);
});