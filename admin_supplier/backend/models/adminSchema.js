const mongoose=require('mongoose')


const userSchema = new mongoose.Schema({
    fullName:{
        type: String, 
        required: true,
    },
    accountNumber: {
        type: String, 
        required: true,
    },
    balance: {
        type: String, 
        required: true,
    },
    pin: {
        type: String, 
        required: true,
    },
})


module.export= mongoose.model("BankUsers", userSchema)