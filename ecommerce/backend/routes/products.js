const mongoose=require('mongoose')
const express= require("express")
const router = express.Router()
const axios =require('axios')

const ProductsSchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: String, 
        required: true,
    },
    unitPrice: {
        type: String, 
        required: true,
    },
})




const products=module.export= mongoose.model("AllProducts", ProductsSchema)


router.post("/addProducts", async (req, res)=> {
    const {productName, productId,imageUrl,description,quantity,unitPrice} = req.body

        const newProduct= new products({
            productName,
            productId,
            imageUrl,
            description,
            quantity,
            unitPrice
        })
         newProduct.save(err => {
            if(err) {
                res.send(err)
                } else {
                    res.send( { message: "Successfully ordered" })
            }
        
        })
    
}) 

router.get("/getAllProducts",async(req,res)=> {
    try{
        const allProduct= await products.find()
        
        res.json(allProduct)

    }catch(err){
        res.send(err)
    }
}) 

router.put("/updateProduct",async(req,res) =>{
    const {productId,quantity}= req.body
    const update=await products.findOneAndUpdate({productId:productId},{
        $set: { quantity:quantity },
      },
      { new: true })
    
    res.send(update)

})



module.exports = router