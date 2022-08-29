const mongoose=require('mongoose')

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




module.export= mongoose.model("OrderProducts", orderProductSchema)