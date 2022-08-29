const mongoose= require("mongoose")
const express= require("express")
const router = express.Router()
const axios= require('axios')

const orderProductSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: true,
    },
    productName: {
        type: String, 
        required: true,
    },   
    productId: {
        type: String, 
        required: true,
    },
    imageUrl:{
        type: String, 
        required: true,
    },
    transactionId: {
        type: String, 
        required: true,
    },
    quantity: {
        type: String, 
        required: true,
    },
    amount: {
        type: String, 
        required: true,
    },
})

const orderedProducts =mongoose.model("OrderProducts", orderProductSchema)


router.post("/orderProduct", async (req, res)=> {
    const {userName, productName, productId,imageUrl,transactionId,quantity,amount} = req.body
        const newProduct= new orderedProducts({
            userName,
            productName,
            productId,
            imageUrl,
            transactionId,
            quantity,
            amount
        })
         newProduct.save(err => {
            if(err) {
                res.send(err)
                } else {
                    res.send( { message: "Successfully ordered" })
            }
        
        })
    
}) 

router.get("/getOrderedProducts",async(req,res)=> {
    try{
        //const {userName} = req.body
        const cartItems= await orderedProducts.find()
        
        res.json(cartItems)

    }catch(err){
        res.send(err)
    }
}) 



module.exports = router