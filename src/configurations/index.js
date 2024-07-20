//------------------Custom Configurations----------------------------
const config = {
    ENVIRONMENT:process.ENVIRONMENT,
    PORT:process.env.PORT,
    MONGO_DB_URL:process.env.MONGO_DB_URL,
    JWT_ACCESS_KEY:process.env.JWT_ACCESS_KEY
}

module.exports = config;