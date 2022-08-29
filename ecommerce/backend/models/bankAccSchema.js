const mongoose=require('mongoose')

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




module.export= mongoose.model("UsersBankInfo", bankInfoSchema)