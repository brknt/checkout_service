
const Enum = require('../config/Enum');
const Response = require('../lib/Response');


const purchase = async (req, res) => {
    try {
        const data = req.body;

        // {
        //     "products":[{"productID":1,"productName":"Product1","quantity":2,"price":5,"inventor":20},{"productID":2,"productName":"Product2","quantity":3,"price":10,"inventor":30}],
        //     "email":"deneme@gmail.com"
        // }
        
        let totalPrice = 0;
        for (var i = 0; i < data.products.length; i++) {
            if (data.products[i].quantity <= data.products[i].inventor) {
                totalPrice += data.products[i].quantity * data.products[i].price;
            } else {
                res.status(Enum.HTTP_CODES.INT_SERVER_ERROR).json({ success: false, result: "There is a product out of stock!" });
            }
        }
        console.log("totalPrice: ", totalPrice);

    } catch (error) {
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).json(errorResponse);
    }
}


module.exports = {
    purchase
}