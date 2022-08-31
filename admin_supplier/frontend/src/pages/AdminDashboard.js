import React from "react"
import '../styles/home.css'
import { useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar"
import UserContainer from "../components/UserContainer"
import ProductContainer from "../components/ProductContainer"
import BankContainer from "../components/BankContailner"
import OrderContainer from "../components/OrderContainer"



 const AdminDashboard = () =>{

    let obj=localStorage.getItem("adminBankInfo")
    const adminInfo=JSON.parse(obj)

     
    console.log(adminInfo)
    
    const navigate=useNavigate();

    return(
        <div className="homescreen">
            <Navbar/>
            <div className="homescreen__details">
                <div onClick={()=>navigate('/adminusers')}><UserContainer/></div>
                
                <div onClick={()=>navigate('/adminshop')}><ProductContainer/></div>
                {/* <BankContainer/> */}
                
                <div onClick={()=>navigate('/adminorders')}><OrderContainer/></div>
            </div>

            <div className="container">
                <h2>Account Info</h2>
                <text>Account No:{adminInfo.accountNumber}</text>
                <text>Balance:{adminInfo.balance}</text>
            </div>
        </div>
    )
 }

 export default AdminDashboard