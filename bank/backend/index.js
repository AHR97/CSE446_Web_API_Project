const express= require("express")
const cors= require("cors")
const mongoose= require("mongoose")
const dotenv=require("dotenv")


const authRouter=require('./routes/bankAuth')
//const transRouter=require('./routes/transectionRoute')



const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

dotenv.config()


mongoose.connect(process.env.DATABASE_ACCESS,() => console.log("DB connected"))

app.use('/bank/user',authRouter)

app.use('/bank/user',authRouter)

app.use('/bank',authRouter)

app.use('/bank/product',authRouter)


app.listen(5002,() => {
    console.log("BE started at port 5002")
})