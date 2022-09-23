const socket = io(); //funciones de soket del lado del cliente 
nombre();
logout();
socket.on('connect' , ()=>{
});




function productos(){
    fetch("localhost:8080/api/productos-test").then((resp)=>{const productos =  resp.json});
    console.log(productos)
    const url="http://localhost:8080/views/partials/productosHBS.hbs";
    fetch(url).then((resp)=>{ //hacemos fetch de la url para pasarla a texto y luego manejarla con handlebars
        return resp.text();
    }).then((text)=>{
        const template=Handlebars.compile(text);
        const html = template(productos);
        const div = document.getElementById('productos');
        div.innerHTML = html;
    });
};


const schemaAuthor = new normalizr.schema.Entity('author');


const schemaMensaje = new normalizr.schema.Entity('mensaje', { author: schemaAuthor }, { idAttribute: 'id' })



socket.on('chat' , (mensajes)=>{
    const msgDenormmalized = normalizr.denormalize(mensajes.result , schemaMensaje, mensajes.entities);
    const url="http://localhost:8080/views/partials/chatHBS.hbs";
    fetch(url).then((resp)=>{ //hacemos fetch de la url para pasarla a texto y luego manejarla con handlebars
        return resp.text();
    }).then((text)=>{
        const template=Handlebars.compile(text);
        const html = template({mensajes: msgDenormmalized.mensajes});
        const div = document.getElementById('mensajes');
        div.innerHTML = html;
    });
    const pesoOrignial = JSON.stringify(msgDenormmalized).length;
    const pesoCompr = JSON.stringify(mensajes).length;
    const porcentHTML = document.getElementById('porcent');
    porcentHTML.innerHTML = `<h2>Compresion ${((pesoOrignial - pesoCompr) / pesoOrignial * 100).toFixed(2)}</h2>`

});

function enviarMensaje(){
    const email = document.getElementById('email').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const alias = document.getElementById('alias').value;
    const msg = document.getElementById('mensaje').value;
    if (email, nombre, apellido, edad, alias, msg){
        const mensaje = {
            author: {
                id: email, 
                nombre: nombre, 
                apellido: apellido, 
                edad: edad, 
                alias: alias
            },
            text: msg
        }
        socket.emit('nuevo_msg' , mensaje)
    }

}

async function login(){
    try{
        const name = document.getElementById('nombre').value;
        await fetch(`/login` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:name})
        })
    }
    catch(err){
        console.log(err)
    }
    
    
}

async function nombre(){
    try{
    const resultado = await fetch('/name', {
        method: 'GET'
    })
    const objeto = await resultado.json()
    document.getElementById('bienvenido').innerHTML = `<h2 class="ui header">Bienvenido ${objeto.name}</h2>`;
    }
    catch{

    }
}

async function logout(){
    try{
        const resultado = await fetch('/logoutName', {
            method: 'GET'
        })
        const objeto = await resultado.json()
        document.getElementById('adios').innerHTML = `<h2 class="ui header">Hasta luego ${objeto.name}</h2>`;
        }
        catch{
    
        }
}