
const Enum = require('../config/Enum');
const Response = require('../lib/Response');
const db = require('../config/db_config');
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
const SELLORDERS = require('../models/SELL_ORDERS');


const purchase = async (req, res) => {
    try {
        const data = req.body;

        // {
        //     "products":[{"productID":1,"productName":"Product1","quantity":2,"price":5,"inventor":20},{"productID":2,"productName":"Product2","quantity":3,"price":10,"inventor":30}],
        // }
        const [email] = await db.mysqlPool.query(`SELECT email FROM users WHERE id='${req.session.userID}'`);
        console.log(email);

        let totalPrice = 0;
        for (var i = 0; i < data.products.length; i++) {
            if (data.products[i].quantity <= data.products[i].inventor) {
                totalPrice += data.products[i].quantity * data.products[i].price;
            } else {
                return res.status(Enum.HTTP_CODES.INT_SERVER_ERROR).json({ success: false, result: "There is a product out of stock!" });
            }
        }
        console.log("totalPrice: ", totalPrice);



        const charge = await stripe.charges.create({
            amount: totalPrice * 100,
            currency: 'usd',
            source: 'tok_visa',
            description: `Charge for ${email[0].email}`,
        });
        
        if (charge.status == 'succeeded') {

            const sell_orders = await SELLORDERS.create({
                userId: req.session.userID,
                email: data.email,
                products: data.products,
                totalPrice:totalPrice
            });
        }


        return res.json(Response.successResponse({ success: true, result: "Payment successful" }, 200));

    } catch (error) {
        let errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
}


module.exports = {
    purchase
}