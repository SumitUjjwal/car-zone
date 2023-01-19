const express = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post("/register", async (req, res) => {
       const { firstName, lastName, location, zipCode, phone, email, password } = req.body;

       const checkExisting = await UserModel.findOne({ $or: [{ email: email }, { phone: phone }] });
       if (checkExisting) {
              res.json({ "msg": "User already exists Please log in" });
       }
       else {
              try {
                     bcrypt.hash(password, 2, async (err, hash) => {
                            if (err) {
                                   console.log(err);
                            }
                            else {
                                   const user = new UserModel({ firstName, lastName, location, zipCode, phone, email, password: hash });
                                   await user.save();
                                   console.log(user);
                                   console.log(hash)
                                   res.json({ "msg": "Registered Successfully" });
                            }
                     });

              } catch (error) {
                     res.json({ "msg": "Error in registration" });
                     console.log(error);
              }
       }

})


userRouter.post("/login", async (req, res) => {
       const { email, password } = req.body;
       try {
              const user = await UserModel.findOne({ email });
              console.log(user);
              if (user) {
                     bcrypt.compare(password, user["password"], async (err, result) => {
                            if (result) {
                                   const token = jwt.sign({ course: 'backend' }, 'masai');
                                   res.json({ "msg": "Logged in Successfully", "token": token, "name": user["firstName"] });
                            }
                            else {
                                   console.log("wrong credentials");
                                   res.json({ "msg": "Invalid credentials" })
                            }
                     })
              }
              else {
                     res.json({ "msg": "Please Enter Valid Credentials" });
              }
       } catch (error) {
              res.json("Error in login");
              console.log(error);
       }
})

module.exports = {
       userRouter
}