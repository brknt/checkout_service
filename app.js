const express = require('express');
require('dotenv').config();
const db = require('./config/db_config');
const session = require('express-session');







const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const purchaseRoute = require('./routes/purchaseRoute');




const app = express();
const port = process.env.PORT || 3000;





// MONGODB
// db.connMongoDb();






// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'getMobil_123',
    resave: false,
    saveUninitialized: true
}));



app.use("/users", userRoute.routes);
app.use("/product", productRoute.routes);
app.use("/purchase", purchaseRoute.routes);


app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send('Something went wrong!')
});





//start the express server
db.mysqlPool.query("SELECT 1")
    .then(() => {
        console.log('Connected to the MYSQL successfully')
        app.listen(port,
            () => console.log(`App started on port ${port}`))
    })
    .catch(err => console.log('db connection failed. \n' + err))

