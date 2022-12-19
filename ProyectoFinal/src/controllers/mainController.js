import path from 'path';
const __dirname = path.resolve();


async function home (req, res){
    res.sendFile(__dirname + '/public/views/index.html');
}

async function logout(req, res){
    req.session.destroy();
    req.logout(()=> {
      res.redirect('/api/user/login');
    });
}

export{
    home,
    logout
}