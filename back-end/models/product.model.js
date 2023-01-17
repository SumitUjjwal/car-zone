const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
       category: String,
       brand: String,
       title: String,
       price: String,
       image: String,
})

const ProductModel = mongoose.model("product", productSchema);

module.exports = {
       ProductModel
}