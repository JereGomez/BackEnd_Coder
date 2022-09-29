async function login(){
    try{
        const name = document.getElementById('nombre').value;
        const res = await fetch(`/api/login` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:name})
        });
        await res.json();
        window.location.href = '/'
    }
    catch(err){
        console.log(err)
    }
}
