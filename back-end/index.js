const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.port;

const { connect } = require("./config/db");

// routes
const {userRouter} = require("./routes/user.route");

const app = express();

app.get("/", (req, res) => {
       res.json({"msg": "Welcome to CarZone"});
})

app.use("/user",userRouter);

app.listen(port, async () => {
       try {
              await connect;
              console.log("*****connected to database*****");
              console.log(`listening on ${port}`);
       } catch (error) {
              console.log(error);
              console.log("error message: ", error.message);
              console.log("*****error in connecting to database*****");
       }
})