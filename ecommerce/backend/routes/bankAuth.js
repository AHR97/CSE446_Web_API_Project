const mongoose=require('mongoose')
const express= require("express")
const router = express.Router()

const axios=require('axios')


const bcrypt=require('bcryptjs')
const { json } = require('express')


const bankInfoSchema = new mongoose.Schema({
    userName:{
        type: String, 
        required: true,
    },
    accountNumber: {
        type: String, 
        required: true,
    },
    pin: {
        type: String, 
        required: true,
    },
})




const BankInfo=mongoose.model("UsersBankInfo", bankInfoSchema)


router.post("/addBankInfo",  async(req, res)=> {
    const { userName,accountNumber, pin} = req.body
    console.log(userName,accountNumber,pin)
    axios.post('http://localhost:5002/bank/user/login',{accountNumber,pin}).then(info=>{
        if(info.data.user){
            console.log(info.data.user.pin)
            const bankInfo = new BankInfo({
                userName:userName,
                accountNumber:accountNumber,
                pin:info.data.user.pin
            })
            bankInfo.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Added" })
                }
            })
        }else{
            res.send({message:"Account doesn't exit"})
        }
    })
}) 

router.get('/getUserBankInfo',async(req,res)=>{
    try{
        //const {userName} = req.body
        const bankInfo= await BankInfo.find()
        
        res.json(bankInfo)

    }catch(err){
        res.send(err)
    }
})


module.exports = router
