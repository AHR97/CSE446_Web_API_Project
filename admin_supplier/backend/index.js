const express= require("express")
const cors= require("cors")
const mongoose= require("mongoose")
const dotenv=require("dotenv")


const authRouter=require('./routes/adminAuth')

const supplierRouter =require('./routes/supplierAuth')



const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

dotenv.config()


mongoose.connect(process.env.DATABASE_ACCESS,() => console.log("DB connected"))

app.use('/admin',authRouter)

app.use('/supplier',supplierRouter)


app.listen(7002,() => {
    console.log("BE started at port 7002")
})