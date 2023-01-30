require('dotenv').config()
const envVars = process.env;

const config = {
    env: envVars.NODE_ENV,
    jwtSecret: envVars.JWT_SECRET,
    port: envVars.PORT,
    mongoHost: envVars.MONGO_HOST,
    mongoPort: envVars.MONGO_PORT,
    dbName:envVars.DB_NAME,
    esUri:envVars.ES_URI
}

export default config;