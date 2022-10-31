async function signup(){
    try{
        const email = document.getElementById('email').value;
        const contraseña = document.getElementById('contraseña').value;
        const res = await fetch(`/api/signup` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:email, password:contraseña})
        });
        await res.json();
        //window.location.href = '/'
    }
    catch(err){
        console.log(err)
    }
}

function toLogin(){
    window.location.href = '/login';
};