 import React from "react"
 import '../styles/home.css'
import { useNavigate } from 'react-router-dom'


 const BankHome = () =>{

    let obj=localStorage.getItem("bankUserInfo")
    const userInfo=JSON.parse(obj)

    const navigate=useNavigate();

    return(
        <div className="homescreen">
            <div className="homescreen__title">Account Info</div>
            <div className="homescreen__details">
            <div className="row">
                <text>Full Name :</text>
                <text>{userInfo.fullName}</text>
            </div>
            
            <div className="row">
                <text>Account No :</text>
                <text>{userInfo.accountNumber}</text>
            </div>

            <div className="row">
                <text>Balance :</text>
                <text>{userInfo.balance}</text>
            </div>
            </div>
            <div className="homescreen_btn" onClick={() => navigate("/")}>
                Logout
            </div>
        </div>
    )
 }

 export default BankHome