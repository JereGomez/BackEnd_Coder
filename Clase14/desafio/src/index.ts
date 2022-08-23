import express from 'express';
import Perimetro from './models/perimetro';
import Superficie from './models/superficie';

const app = express();

app.get("/" , (req,res)=>{
    const params = req.query;
    const figura: any = params.figura || "";
    if(figura){
        switch(figura){
            case "cuadrado":
                const lado: any = params.lado;
                res.send({
                    figura: figura,
                    perimetro: Perimetro.cuadrado(parseInt(lado)),
                    superficie: Superficie.cuadrado(parseInt(lado))
                });
            break;
            case "rectangulo":
                const alto: any = params.alto;
                const base: any = params.base;
                res.send({
                    figura: figura,
                    perimetro: Perimetro.rectangulo(parseInt(base), parseInt(alto)),
                    superficie: Superficie.rectangulo(parseInt(base), parseInt(alto))
                });
            break;
            case "circulo":
                const radio: any = params.radio;
                res.send({
                    figura: figura,
                    perimetro: Perimetro.ciruclo(parseInt(radio)),
                    superficie: Superficie.ciruclo(parseInt(radio))
                    
                });
            break;
        }
    }
    else{
        res.send({error: "especifique figura"});
    }
});


const PORT =  process.env.PORT || 8080;
app.listen(PORT , ()=>console.log(`escuchando en el puerto ${PORT}`));

