const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.port,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
}