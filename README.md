
# Checkout Service

Managing the sales processes of a product

User registration and login procedures in the project,
there is a process of listing all products and fetching a single product.After the user logs in, the user session is kept on the server with the session.
Later, the middleware was written using this session for the product purchase process.Ordering products without a user login is prevented by the middleware.
The "stripe" package was used to fake the sales and payment process.After the order and payment are successful, the order information is recorded in the sell_orders table in MongoDB.
Product and user information was kept in the MySQL database. The order and payment transaction was kept in the MongoDB database.

## Technogolies
- Node JS, Express, MySQL, MongoDB , Postman, Vscode, MySQL Workbench, MongoDb Compass
## Installing
- type in terminal: npm i && npm start

## Dependencies
- **express**
- **express-session** 
- **dotenv** 
- **mysql2**
- **mongoose**
- **bcrypt**
- **stripe**


## Endpoints
### User:
- localhost:3001/users/signup : CREATE USER
```
POST
{
    "name":"deneme3",
    "email":"deneme4@gmail.com",
    "password":"pass1234"
}
```
- localhost:3001/users/login: LOGIN USER
```
POST
{
    "email":"deneme4@gmail.com",
    "password":"pass1234"
}
```


- localhost:3001/users/logout :LOGOUT USER (GET)


### Product:
- localhost:3001/product         "getAllProduct (GET)
- localhost:3001/product/:id     "getProductById (GET)"


### Purchase:

- localhost:3001/purchase : CREATE PURCHASE
```
POST
{
"products":[{"productID":1,"productName":"Product1","quantity":2,"price":5,"inventor":20},{"productID":2,"productName":"Product2","quantity":3,"price":10,"inventor":30}]
}
```










