const mongoose= require("mongoose")
const express= require("express")
const router = express.Router()
const axios= require('axios')


const cartProductSchema = new mongoose.Schema({
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
    isPaid :{
        type: Boolean,
        required:true,
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

function stringGen(len)
{
    let characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV0123456789"

let code= new Array();

for(let i=0; i<len; i++)
{
  let index=Math.floor(Math.random()*characters.length);
  code.push(characters.charAt(index));
}

code=code.join("")
return code
}



const cartProducts = mongoose.model("CartProducts", cartProductSchema)


router.post("/addCartProducts", async (req, res)=> {
    const {userName, productName, productId,imageUrl,quantity,amount} = req.body
    
        const newProduct= new cartProducts({
            userName,
            productName,
            productId,
            imageUrl,
            isPaid:false,
            quantity,
            amount
        })
         newProduct.save(err => {
            if(err) {
                res.send(err)
                } else {
                    res.send( { message: "Successfully added to cart" })
            }
        
        })
    
}) 

router.get("/getCartProducts",async(req,res)=> {
    try{
        //const {userName} = req.body
        const cartItems= await cartProducts.find()
        
        res.json(cartItems)

    }catch(err){
        res.send(err)
    }
}) 

router.put("/deleteCart",async(req,res) =>{
    const id= req.body._id
    console.log(req.body)
    const update=await cartProducts.findOneAndUpdate({_id:id},{
        $set: { isPaid:true },
      },
      { new: true })
    
    res.send(update)

})



module.exports = router