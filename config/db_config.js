const mongoose = require('mongoose');
const mysql = require('mysql2/promise')


const connMongoDb = ()=>{
    mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("Connected to the MONGODB successfully");
    }).catch((err)=>{
        console.log('MONGODB connection err: ', err);    
    });
}




const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'pass1234',
    database: 'checkout_service'
})


module.exports = {
    connMongoDb,
    mysqlPool
} 