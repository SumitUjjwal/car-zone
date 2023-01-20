const express = require("express");
const { ProductModel } = require("../models/product.model");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const productRouter = express.Router();
productRouter.use(express.json());

productRouter.get("/", async (req, res) => {
       // const product = await ProductModel.find();
       // res.json(product);

       const query = req.query;
       const searchTerm = query.q;
       const page = query.page;
       const limit = query.limit;
       const sort = query.sort;
       try {
              if (sort == "asc" && searchTerm) {
                     const product = await ProductModel.find({ title: { $regex: searchTerm, $options: "i" } }).sort({ price: 1 });
                     res.json(product);
              }
              else if (sort == "desc" && searchTerm) {
                     const product = await ProductModel.find({ title: { $regex: searchTerm, $options: "i" } }).sort({ price: -1 });
                     res.json(product);
              }
              else if (sort == "cr" && searchTerm) {
                     const product = await ProductModel.find({ title: { $regex: searchTerm, $options: "i" } }).sort({ rating: 1 });
                     res.json(product);
              }
              else if (sort == "bs" && searchTerm) {
                     const product = await ProductModel.find({ title: { $regex: searchTerm, $options: "i" } }).sort({ rating: 1, reviews: 1 });
                     res.json(product);
              }
              else if (searchTerm) {
                     // const product = await ProductModel.find({ $or: [{ productname: { $regex: searchTerm, $options: "i" } }, { email: { $regex: searchTerm, $options: "i" } }, { role: { $regex: searchTerm, $options: "i" } }, { location: { $regex: searchTerm, $options: "i" } }, { phone: { $regex: searchTerm, $options: "i" } }] });
                     const product = await ProductModel.find({ title: { $regex: searchTerm, $options: "i" } });
                     res.json(product);
              }
              else if (page) {
                     const product = await ProductModel.find().skip((page - 1) * limit).limit(limit);
                     res.json(product);
              }

              else {
                     const product = await ProductModel.find(query);
                     console.log(product);
                     res.json(product);
              }

       } catch (error) {
              console.log(error);
              res.json({ "msg": "Error in getting products" });

       }
})


productRouter.post("/add", async (req, res) => {
       const product = req.body;
       try {
              const newProduct = new ProductModel(product);
              await newProduct.save();
              // await ProductModel.insertMany(product);
              res.json({"msg": "Product added successfully"});
       } catch (error) {
              console.log(error);
              res.status(500).json({"msg": "Something went wrong"});
       }
})

productRouter.patch("/update/:id", async (req, res) => {
       const product = req.body;
       const id = req.params.id;
       try {
              await ProductModel.findByIdAndUpdate(id, product);
              res.json({ "msg": "Product updated successfully" });
       } catch (error) {
              console.log(error);
              res.status(500).json({ "msg": "Something went wrong" });
       }
})

productRouter.delete("/delete/:id", async (req, res) => {
       const id = req.params.id;
       try {
              await ProductModel.findByIdAndDelete(id);
              res.json({ "msg": "Product deleted successfully" });
       } catch (error) {
              console.log(error);
              res.status(500).json({ "msg": "Something went wrong" });
       }
})

module.exports = {
       productRouter
}