const express= require("express")
const cors= require("cors")
const mongoose= require("mongoose")
const dotenv=require("dotenv")
const authRouter=require('./routes/auth')
const orderProductRouter =require('./routes/orderedProductRoute')
const cartRouter=require('./routes/cartRoute')
const allProductRouter= require('./routes/products')
const bankInfoRouter =require('./routes/bankAuth')

//const User =require('./models/usersSchema')



const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS,() => console.log("DB connected"))



//ALL ROUTERS
app.use('/client/signIn',authRouter)

app.use('/client/signUp',authRouter)

app.use('/client/user',authRouter)

app.use('/client/user',bankInfoRouter)

app.use('/cart',orderProductRouter)

app.use('/cart/userItems',orderProductRouter)

app.use('/user/cart', cartRouter)

app.use('/shop',allProductRouter)



app.listen(9002,() => {
    console.log("BE started at port 9002")
})


