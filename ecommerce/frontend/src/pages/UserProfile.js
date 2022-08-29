import React from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import UserOrderedProducts from "../components/userOrderedProducts"
import '../styles/userprofile.css'

const UserProfile = () =>{

    let obj=localStorage.getItem("userInfo")
    const userInfo=JSON.parse(obj)

    let obj1 =localStorage.getItem("currUserBank")
    const currUserBank=JSON.parse(obj1)



    return(
        <div>
            <Navbar/>
            <div className="userprofile">
                <div className="wrapperLeft">
                    <div className="info">
                        <h2>User Information</h2>
                        <div className="row">
                            <text>Full Name :</text>
                            <text>{userInfo.fullName}</text>
                        </div>
                        <div className="row">
                            <text>User Name :</text>
                            <text>{userInfo.userName}</text>
                        </div>
                        <div className="row">
                            <text>Email :</text>
                            <text>{userInfo.email}</text>
                        </div>
                        <div className="row">
                            <text>Account No :</text>
                            <text>{currUserBank.accountNumber}</text>
                        </div>
                        <div className="row">
                            <text>Balance :</text>
                            <text>{currUserBank.balance} Tk</text>
                        </div>
                    </div>
                </div>
                <div className="wrapperRight">
                    <h1>Purchased Products</h1>
                     <UserOrderedProducts/> </div>
            </div>

        </div>
    )
}

export default UserProfile