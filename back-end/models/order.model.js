const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
       img_src: String,
       title: String,
       model: String,
       sku: Number,
       rating: Number,
       reviews: Number,
       fulfillment: String,
       price: Number,
       discount: Number,
       prevPrice: Number
})

const OrderModel = mongoose.model("order", orderSchema);

module.exports = {
       OrderModel
}