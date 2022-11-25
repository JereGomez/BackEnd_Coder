import dotenv from 'dotenv';

dotenv.config();
const config = {
    dbType: process.env.DB_TYPE, 
    dbUser: process.env.DB_USER,
    dbPssword: process.env.DB_PASSWORD,
    uriString: process.env.DB_URI_STRING,
    claveSecreta: process.env.SECRET_KEY
}
export default config