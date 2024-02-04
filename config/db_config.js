const mongoose = require('mongoose');
const mysql = require('mysql2/promise')


const connMongoDb = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to the MONGODB successfully");
    }).catch((err) => {
        console.log('MONGODB connection err: ', err);
    });
}




const mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port:process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})


module.exports = {
    connMongoDb,
    mysqlPool
} 