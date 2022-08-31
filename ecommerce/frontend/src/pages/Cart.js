import React from 'react'
import Navbar from '../components/Navbar'
import CartItems from '../components/userCart'
import '../styles/cartstyle.css'
import '../styles/usercart.css'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Cart = () => {

  const navigate=useNavigate()

  let obj =localStorage.getItem("userCartItems")
  const Items =JSON.parse(obj)

  let total=0

  for(let i=0; i<Items.length;i++)
  {
        total=total+parseInt(Items[i].amount)
  }

  
  let obj2 =localStorage.getItem("userInfo")
  const User =JSON.parse(obj2)
  
  let obj3 =localStorage.getItem("userBankInfo")
  const UserBankInfo =JSON.parse(obj3)



  const orderProduct = async() =>{


    

    const accountNumber=UserBankInfo.accountNumber
    const pin=UserBankInfo.pin

    console.log(accountNumber,pin)

    const transectionInfo= await axios.post('http://localhost:5002/bank/product/bankTransections',{accountNumber:accountNumber, pin:pin, amount:total})

    if(transectionInfo.data !== "Insufficient balance for this transaction")
    {

      for(let i=0; i<Items.length; i++)
      {
  
      const orderedProduct={
        _id:Items[i]._id,
        userName:Items[i].userName,
        productName:Items[i].productName,
        productId:Items[i].productId,
        imageUrl:Items[i].imageUrl,
        transactionId:transectionInfo.data.transectionId,
        quantity:Items[i].quantity,
        amount:Items[i].amount
      }

      console.log(orderedProduct)

      if(orderedProduct){
        axios.post("http://localhost:9002/cart/orderProduct",orderedProduct).then(async response =>{
          if(response.data.message === "Successfully ordered")
          {

            let currProduct

            let allProducts =[]

            await axios.get("http://localhost:9002/shop/getAllProducts")
            .then(res => {
              allProducts=res.data

            })


            for(let i=0; i<allProducts.length; i++)
            {
                if(allProducts[i].productId === orderedProduct.productId)
                {
                  currProduct=allProducts[i]
                }
            }

            const prevQuantity = currProduct.quantity
            const newQuantity = parseInt(prevQuantity)-parseInt(orderedProduct.quantity)

            const curQuantity =String(newQuantity)

            console.log(newQuantity,curQuantity)

            const updateShop =await axios.put("http://localhost:9002/shop/updateProduct",{productId: orderedProduct.productId,quantity:curQuantity})

            console.log(updateShop)

            console.log(orderedProduct._id)
            const deleteCart = await axios.put("http://localhost:9002/user/cart/deleteCart",orderedProduct)
            console.log(deleteCart)


            axios.get("http://localhost:9002/shop/getAllProducts")
            .then(res => {

              let newProducts
              newProducts=res.data
              localStorage.setItem("shopItems", JSON.stringify(newProducts))
              
              
            })


          }
          alert(response.data.message)
        })
      }
      }

      
      navigate("/home")
    }else{
      console.log(transectionInfo.data)
    }

    
    
}

  return (
    <div>
      <Navbar/>
      <div className='usercart'>
        <div className='left'>
          <h2>Cart Items</h2>
          <CartItems/>
        </div>
        <div className='right'>
          <text className='txt'>Total : {total} </text>
          <div className='button' onClick={()=>{orderProduct()}}> Buy</div>
        </div>
      </div>
      
    </div>
  )
}

export default Cart
