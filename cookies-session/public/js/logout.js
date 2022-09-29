adios();
logout();

async function adios(){
    try{
    const resultado = await fetch('/name', {
        method: 'GET'
    })
    const objeto = await resultado.json()
    document.getElementById('adios').innerHTML = `<h2 class="ui header">Hasta luego ${objeto.name}</h2>`;
    }
    catch(err){
        console.log(err);
    }
}

async function logout(){
    try{
        const resultado = await fetch('api/logout', {
            method: 'POST'
        })
        await resultado.json()
        }
        catch(err){
            console.log(err)
        }
}
