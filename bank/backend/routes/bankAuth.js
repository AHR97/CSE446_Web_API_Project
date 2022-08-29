const mongoose=require('mongoose')
const express= require("express")
const router = express.Router()


const bcrypt=require('bcryptjs')

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

const transectionSchema= new mongoose.Schema({
    accountNumber:{
        type: String,
        required:true
    },
    transectionId:{
        type: String,
        required: true
    },
    amount:{
        type: String,
        required:true
    }
})



const BankTrans = new mongoose.model("BankTransections", transectionSchema)

const BankUser = new mongoose.model("BankUsers", userSchema)

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

router.post("/login",  async(req, res)=> {
    const { accountNumber, pin} = req.body
    console.log(accountNumber,pin)
       BankUser.findOne({ accountNumber: accountNumber}, (err, user) => {
        if(user){
             const isvalid= bcrypt.compare(pin,user.pin)
            if(isvalid ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 



router.post("/register", async (req, res)=> {
    const { fullName,accountNumber, balance, pin} = req.body

    const hashpass= await bcrypt.hash(pin,10)
    //console.log(password,hashpass)
     BankUser.findOne({accountNumber: accountNumber}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new BankUser({
                fullName,
                accountNumber,
                balance,
                pin:hashpass
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

router.get("/getAllBankUser", async(req,res)=>{
    //const{accountNumber}=req.body
    BankUser.find((err, user) => {
        if(user){
             res.send(user)
        }
    })
})


router.post('/bankTransections', async (req, res) => {
    const {accountNumber,pin,amount}=req.body


    const bankUserInfo= await BankUser.findOne({accountNumber});

    if(bankUserInfo){
        const balance = bankUserInfo.balance

        const accBalance=parseInt(balance)
        const valAmount=parseInt(amount)
        
        if(valAmount > accBalance)
        {
            res.send("Insufficient balance for this transaction");   
        }else{
            const updatedBalance= accBalance-valAmount;

            const userAcc= await BankUser.findOne({accountNumber});

            const adminAcc=await BankUser.findOne({accountNumber:"8521522220"})


            const adminBalance= adminAcc.balance

            console.log(adminBalance)

            const newAdminBal=String(parseInt(adminBalance)+valAmount*0.1)

            console.log(newAdminBal)

            await BankUser.updateOne(
                userAcc,
                {
                  $set: { balance: String(updatedBalance) },
                },
                { new: true }
              );
            
              await BankUser.updateOne(
                adminAcc,
                {
                  $set: { balance: newAdminBal },
                },
                { new: true }
              );
              const transectionId=stringGen(20)

              const transectionDetails =new BankTrans({
                accountNumber: accountNumber,
                transectionId: transectionId,
                amount : amount
              });
              try{
                const details=await transectionDetails.save();
                res.send(details)
              }catch(e){
                console.log(e)
              }

        }
    }

    
})



module.exports = router

