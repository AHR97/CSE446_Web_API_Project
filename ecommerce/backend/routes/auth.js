const mongoose= require("mongoose")
const express= require("express")
const router = express.Router()


const bcrypt=require('bcryptjs')
//const User = require('../models/usersSchema')


const userSchema = new mongoose.Schema({
    fullName:{
        type: String, 
        required: true,
    },
    userName: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String, 
        required: true,
    },
})


  

const User = new mongoose.model("Users", userSchema)

router.post("/login",  async(req, res)=> {
    const { email, password} = req.body
       User.findOne({ email: email}, (err, user) => {
        if(user){
             const isvalid= bcrypt.compare(password,user.password)
            if(isvalid ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 



router.post("/register", async (req, res)=> {
    const { fullName, userName, email, password} = req.body

    const hashpass= await bcrypt.hash(password,10)
    console.log(password,hashpass)
     User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                fullName,
                userName,
                email,
                password: hashpass
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

router.get("/getUserInfo", async(req, res)=> {
    const { email} = req.body
      User.findOne({ email: email}, (err, user) => {
        if(user){
             res.json({userName:user.userName})
        }
    })
}) 

router.get("/getAllUser", async(req,res) =>{
    try{
        //const {userName} = req.body
        const allUsers= await User.find()
        
        res.json(allUsers)

    }catch(err){
        res.send(err)
    }
})



module.exports = router
