import React from 'react'
import '../styles/navbarstyles.css'
import '../styles/formstyles.css'
import { Search , ShoppingCartOutlined , AccountBalanceWalletOutlined } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Navbar() {

    const navigate=useNavigate()

    let obj=localStorage.getItem("userInfo")
    const data =JSON.parse(obj)

    
    
    let obj1=localStorage.getItem("userBankInfo")
    const bankInfo =JSON.parse(obj1)

    let cartArray =[];

    
    let orderArray =[];
    

    const cartProducts = () => {

        axios.get("http://localhost:9002/user/cart/getCartProducts")
        .then(res => {

            cartArray=res.data

            const items =[]

            for(let i=0; i<cartArray.length; i++)
            {
                //console.log(cartArray[i].userName)
                if(cartArray[i].userName === data.userName && cartArray[i].isPaid===false)
                {
                    items.push(cartArray[i])
                }
            }

            //console.log(cartArray)
            //setLoginUser(res.data.user)
             localStorage.setItem("userCartItems", JSON.stringify(items));
            // console.log(JSON.stringify(res.data.user))
            if(cartArray)
            {
    
                navigate("/cart")
            }    


        })
    }

    const orderedProducts = () => {

        axios.get("http://localhost:9002/cart/userItems/getOrderedProducts")
        .then(res => {

            orderArray=res.data

            console.log(orderArray,data.userName)

            const items =[]

            for(let i=0; i<orderArray.length; i++)
            {
                //console.log(cartArray[i].userName)
                if(orderArray[i].userName === data.userName)
                {
                    items.push(orderArray[i])
                }
            }

            //console.log(cartArray)
            //setLoginUser(res.data.user)
             localStorage.setItem("userOrderItems", JSON.stringify(items));

             if(res.data)
             {
                bankData(bankInfo.accountNumber)
             }
            // console.log(JSON.stringify(res.data.user)) 
        })
    }

    const bankData = async (accountNumber) =>{
        await axios.get('http://localhost:5002/bank/getAllBankUser').then(res =>{
            
        const allBankUser=res.data
        
        let currBankUser

        for(let i=0; i<allBankUser.length; i++)
        {
            if(allBankUser[i].accountNumber===accountNumber)
            {
                currBankUser=JSON.stringify(allBankUser[i])
            }
        }
            localStorage.setItem("currUserBank",currBankUser)

            if(res.data)
            {
                navigate("/userprofile")
            }

        })
    }





  return (
    <div className="navbar">
        <div className="wrapperLeft">
            <text className='logo' onClick={() => navigate("/home")}>Benemart</text>
            
        </div>
        <div className="wrapperCenter">
            <input className='input'></input>
            <Search style={{color:'grey'}}></Search>
        </div>
        <div className="wrapperRight">
            <text style={{color: 'white',fontSize: 18, fontWeight: 400,cursor:'pointer'}} onClick={()=>orderedProducts()}> {data.userName}</text>
            <ShoppingCartOutlined className="menuIcon" style={{color: 'white'}} onClick={()=>cartProducts()}></ShoppingCartOutlined>
            {/* <AccountBalanceWalletOutlined className='menuIcon' style={{color: 'white'}}></AccountBalanceWalletOutlined> */}
            <div className='menuText' onClick={() => navigate("/")}>Logout</div>
        </div>
     
    </div>
  )
}

export default Navbar



