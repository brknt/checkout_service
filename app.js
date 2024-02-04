const express = require('express');
require('dotenv').config();
const db = require('./config/db_config');

const app = express();



// MONGODB
// db.connMongoDb();



// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




const port = process.env.PORT || 3000;


//start the express server
db.mysqlPool.query("SELECT 1")
    .then(() => {
        console.log('Connected to the MYSQL successfully')
        app.listen(port,
            () => console.log(`App started on port ${port}`))
    })
    .catch(err => console.log('db connection failed. \n' + err))

