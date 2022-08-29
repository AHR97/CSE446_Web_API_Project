const mongoose=require('mongoose')
const express= require("express")
const router = express.Router()


const bcrypt=require('bcryptjs')

const adminSchema = new mongoose.Schema({
    fullName:{
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



const Admin = new mongoose.model("Admin", adminSchema)



router.post("/login",  async(req, res)=> {
    const { email, password} = req.body
       Admin.findOne({ email: email}, (err, user) => {
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
    const { fullName,email, password} = req.body

    const hashpass= await bcrypt.hash(password,10)
    //console.log(password,hashpass)
     Admin.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new Admin({
                fullName,
                email,
                password:hashpass
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



module.exports = router

