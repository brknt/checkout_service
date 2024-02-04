const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SellOrdersSchema = new Schema({
    userId:{
        type:Number,
        unique:true,
        require:true
    },
    email:String,
    products:[
        {
            productID:Number,
            productName:String,
            quantity:Number,
            price:Number
        }
    ],
    totalPrice:Number

},

{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
}
);

const Sell_Orders = mongoose.model('Sell_Orders', SellOrdersSchema);

module.exports = Sell_Orders;

