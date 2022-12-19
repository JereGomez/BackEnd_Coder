import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({ //configuraciones para enviar email, nos la da ethereal
    //host: 'smpt.ethereal.email' //host de ethereal email
    //host: 'smpt.gmail.com' //host gmail
    service: 'gmail',
    port: 587,
    auth: {
        user: 'jeregomezgiglio12@gmail.com',
        pass: 'mjqgulzzoxmtolrd'
    }
});

const mailToUser  = (email) => {

    return { //opciones de el email a enviar, quien lo envia, hacia quien, el asunto y el body
        //from: 'dangelo.christiansen81@ethereal.email',
        to: email,
        subject: 'Email confirmacion Ecommerce',
        html: `<h1> Este es el Email de confirmacion!! </h1>`,
        //attachments: [] //attachments es para incluir archivos o elementos adjuntos de nuestro pc o urls en el mail, cada elemento es un objeto => {path: './....'}
    }
};

const mailToAdmin = (user)=>{
    return {
    to: 'jeregomezgiglio12@gmail.com',
    subject: 'Nuevo usuario registrado en Ecommerce',
    html: `<h1>Nuevo Usuario</h1>
            <p>${user}</p>`
    }

}

async function sendEmail(user){
    try{
        const toUser = await transporter.sendMail(mailToUser(user.username));
        const toAdmin = await transporter.sendMail(mailToAdmin(user))
        console.log(toUser, toAdmin);
    }
    catch(err){
        throw new Error(`Error al enviar Email de confirmacion ${err}`);
    }
};

export {sendEmail}