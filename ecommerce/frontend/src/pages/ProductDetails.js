import React from 'react'
import Navbar from '../components/Navbar'
import '../styles/productdetails.css'
import { useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router';

const ProductDetails = () => {

  const navigate =useNavigate()

  const [qty, setQty] = useState(0);
  
  const [total, setTotal] = useState(0);
  
  let obj =localStorage.getItem("currentProductId")
  
  let obj1 =localStorage.getItem("shopItems")
  const Items =JSON.parse(obj1)

  
  let obj2 =localStorage.getItem("userInfo")
  const User =JSON.parse(obj2)

  console.log(User,Items)

  //console.log(UserBankInfo.accountNumber,UserBankInfo.pin)

  let product;

  for(let i=0; i<Items.length; i++)
  {
      if(Items[i]._id===obj){
        product=Items[i];
      }
  }


  const increaseQty = (stock,quantity,price) =>
  {
    const newQty= quantity+1;
    const newTotal=parseInt(price)*newQty

    setQty(newQty)
    setTotal(newTotal)
    
    const inStock=parseInt(stock)
    
    if(newQty <= inStock){
      setQty(newQty)
      setTotal(newTotal)
    }else{
      setQty(inStock)
      setTotal(parseInt(price)*inStock)
    }
    
  }
  
  const decreaseQty = (quantity,price) =>
  {
    const newQty= quantity-1;
    const newTotal=parseInt(price)*newQty

    if(newQty>=0){
      setQty(newQty)
      setTotal(newTotal)
    }else{
      setQty(0)
      setTotal(0)
    }

  }

  const addCartItems = async(userName,productName,productId,imageUrl,quantity,amount) =>{

    const cartObj={
      userName:userName,
      productName:productName,
      productId:productId,
      imageUrl:imageUrl,
      quantity:quantity,
      amount:amount
    }

    if(cartObj)
    {
      await axios.post('http://localhost:9002/user/cart/addCartProducts', cartObj).then(res =>{
        alert(res.data.message)
        if(res.data.message === "Successfully added to cart")
        {
          navigate("/home") 
        }
      })
    }

  }
  

  


   return(
    <div>
     <Navbar/>   
    <div className="productscreen">
    <div className="productscreen__left">
      
      <img  className="left__image" src={product.imageUrl}
        alt={product.productName}/>
      
      <div className="left__info">
        <p className="left__name">{product.productName}</p>
        <p>Price: {product.unitPrice}</p>
        <p>{product.description}</p>
      </div>
    </div>
    <div className="productscreen__right">
      <div className="right__info">
        <text style={{fontSize:18,fontWeight:'bold'}}>Product Summary</text>
        <div className="row">
          <text>Product ID :</text>
          <text>{product.productId}</text>
        </div>
        <div className="row">
          <text>Price :</text>
          <text>{product.unitPrice}</text>
        </div>
        <div className="row">
          <text>Quantity :</text>
          <text>{product.quantity}</text>
        </div>
        <div className="row">
          <text>Status :</text>
          <text>In stock</text>
        </div>

        <div className='qty'>
            <span className='qtyB' style={{fontSize:20,fontWeight:500,alignItems:'center',backgroundColor:'yellow'}} onClick={()=> decreaseQty(qty,product.unitPrice)}>-</span>
                <input className='input' type="number"  value={qty} readOnly />
						<span className='qtyB' style={{fontSize:18,fontWeight:500,alignItems:'center',backgroundColor:'green'}} onClick={()=>increaseQty(product.quantity,qty,product.unitPrice)}>+</span>
        </div>

        <div>
          <text style={{fontSize:20,fontWeight:600}}>Total : {total}</text>
        </div>

        <div className='button'>
          <text onClick={()=>addCartItems(User.userName,product.productName,product.productId,product.imageUrl,qty.toString(),total.toString())}>
            Add To Cart
          </text>
        </div>
      </div>
    </div>

     </div>    
</div>

   )

}

export default ProductDetails