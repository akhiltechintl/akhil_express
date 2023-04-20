const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const controller = require("./Controller/Controller");
const app = express();
const port = 3000;

// connect to the database
mongoose.connect("mongodb+srv://akhilnmptf:J7ciiek51PKHwbTf@cluster0.ygch4vp.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

// use bodyParser middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// define the routes for our API
app.post("/api/controller/verify", controller.verifyOtp);

app.post("/api/controller/mail", controller.mail);

// app.post("/api/students", controller.createStudent);

app.post("/api/signup", controller.signup);

app.post("/api/signin", controller.signin);

app.post("/api/controller/save", controller.profile);

app.post("/api/controller/get", controller.getProfile);


// start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
