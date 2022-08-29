const mongoose=require('mongoose')

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




module.export= mongoose.model("AllProducts", ProductsSchema)