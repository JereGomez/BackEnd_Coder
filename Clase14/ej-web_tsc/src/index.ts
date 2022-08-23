import express from 'express';
const app = express();
import Persona from "./models/Personas";
import {getTime} from "./utils/time";

const persona = new Persona("Rodrigo" , "Moralez");
const time = getTime(); 


app.get("" , (req,res)=>{
    res.send(
        {
            persona: persona.getNombreCompleto(),
            tiempo: time
        }
    );
});


const PORT =  process.env.PORT || 8080;
app.listen(PORT , ()=>console.log(`escuchando en el puerto ${PORT}`));
