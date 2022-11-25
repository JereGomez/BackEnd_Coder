import MongoStore from 'connect-mongo';
import session from 'express-session';
import mongoose from 'mongoose';
import config from '../config.js'

async function connect(app){
    try{
        
        mongoose.connect(config.uriString);

        app.use(session({ //Base de datos Mongo
            secret: 'STRING_TO_SIGN_SESSION_ID', 
            resave: false, saveUninitialized: true,
            saveUninitialized: true, 
            store: MongoStore.create({ 
                    mongoUrl: config.uriString,
                    //mongoOptions, 
                    retries: 0,
                    ttl: 60 * 60 * 24
                })
            }));
    }
    catch(err){
        throw(new Error(`Error al conectarse a la base de datos ${err}`))
    }
}

export default connect;