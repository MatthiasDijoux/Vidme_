require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "SALT": process.env.SALT,
    "JWT_SECRET": process.env.JWT_SECRET,
    "SESSION_SECRET": process.env.SESSION_SECRET,
    "PORT": process.env.PORT,
    "ORIGIN_PORT": process.env.ORIGIN_PORT,
    "SERVER_ADDRESS": process.env.SERVER_ADDRESS,
  }
}
