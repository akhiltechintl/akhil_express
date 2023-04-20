
const userModel = require("../Models/Users");
const profileModel = require("../Models/Profile");
const otpModel = require("../Models/Otp");
const nodemailer = require('nodemailer');

const bcrypt=require('bcrypt')

const controller = require('./Controller');
const {response} = require("express");

exports.verifyOtp =async (req, res) => {
    const {email,otp}=req.body;
    console.log("{email,otp}")
    console.log({email,otp})

   const verify= await otpModel.findOne({email:email,otp:otp})

    if(verify){
        return res.status(200).json({message:"otp verified"});
    }
    else {
        return res.status(400).json({message:"invalid otp"});
    }
   //  console.log("verify........")
   // console.log(verify);
};

exports.mail = (req, res) => {


    const { name, email, message } = req.body;
    const randomNumber = Math.floor(Math.random() * 10000);
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ptfattendanceapp@gmail.com',
            pass: 'vkxhfuwbaygppaim',
        },
    });


    // setup email data with unicode symbols
    const mailOptions = {
        from: 'ptfattendanceapp@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Sending Email using Node.js', // Subject line
        text: `Dear ${name}, \n"Otp to reset your password :"${randomNumber}`, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send({error: 'Error sending email'});
        } else {
            console.log('Email sent: ' + info.response);
            await otpModel.create({
                email: email,
                otp: randomNumber.toString()
            })
            res.status(200).send({message: 'Email sent successfully'});
        }
    });




};



exports.profile =async (req, res) => {
    const {email, name, phone,department} = req.body;
    console.log("body",{email, name, phone,department} )

    await profileModel.create({email, name, phone,department} );
    return res.status(200).json({message:"profile saved successfully"})
};

 exports.signup=async (req,res)=>{
    const {username,email,password}=req.body;
    console.log("signup body "+ {username,email,password})
    try{

        const existingUser=await userModel.findOne({email:email})
        console.log("existingUser ",existingUser)
        if(existingUser!=null){
            return res.status(400).json({message:"username or email already taken"});
        }
        else {
        const hashedPassword=await bcrypt.hash(password,10);
        const result=await userModel.create({
            email:email,
            password:hashedPassword,
            username:username
        });
return res.status(200).json({message: "Signup successful"})
    }}
    catch(error){
        console.log(error);
    }
}

exports.signin=async (req, res) => {
    const {username, password} = req.body;
    const existingUser = await userModel.findOne({username: username})
    if (existingUser) {
        const matchPassword =await bcrypt.compare(password, existingUser.password)

        console.log("match password "+matchPassword.toString())
        if (matchPassword) {
            return res.status(200).json({message: "Login Success"})
        } else {
            return res.status(400).json({message: "invalid credentials"});

        }
    }
    else{
        return res.status(202).json({message:"user not found"})
        }
    }

exports.getProfile = async (req, res) => {
    const {email, name, phone,department} = req.body;
    const existingUser = await profileModel.findOne({email: email})
    if (existingUser) {
            return res.status(200).json(`${existingUser}`)
        } else {
            return res.status(400).json({message: "user not found"});

        }





};
