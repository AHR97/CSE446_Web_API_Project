import React, {useState} from 'react'
import '../styles/formstyles.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const BankRegister = () => {

    
    const navigate =useNavigate();

    function stringGen(len)
    {
    let characters="0123456789"

    let code= new Array();

    for(let i=0; i<len; i++)
    {
      let index=Math.floor(Math.random()*characters.length);
      code.push(characters.charAt(index));
    }

    code=code.join("")
    return code
  }


    const [ accInfo, setAccInfo] = useState({
        fullName:"",
        accountNumber:stringGen(10),
        balance:"",
        pin:"",
    });

    const handleChange = e => {
        const { name, value } = e.target
        setAccInfo({
            ...accInfo,
            [name]: value
        })
    };

    const register = () => {
        const { fullName, accountNumber,balance,pin } = accInfo
        if( fullName && accountNumber && balance && pin){
            axios.post("http://localhost:5002/bank/user/register", accInfo)
            .then( res => {
                alert(res.data.message)
                const AccInfo={
                    fullName:fullName,
                    accountNumber:accountNumber,
                    balance:balance,
                    pin:pin
                }
                
                localStorage.setItem("BankUserInfo", JSON.stringify(AccInfo));

                console.log(JSON.stringify(AccInfo))
                
                navigate("/bankhome")
            })
        } else {
            alert("invlid input")
        }
        
    }


    

    return (
            <div className="form">
                <div className="form-left" style={{backgroundColor: ' #9ca7e5 '}}>
                
                <div style={{  
                backgroundImage: "url(" + "https://img.freepik.com/free-vector/payment-card-electronic-funds-transfer-colorful-cartoon-characters-holding-plastic-credit-card-banking-credit-deposit-contactless-payment-system_335657-842.jpg?w=740&t=st=1661617744~exp=1661618344~hmac=8bc4e3f29a3b4abebaacee78dd4e7051c9af6aaa192027ac4186c9d6bd1de058" + ")",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                margin: '10px 100px',
                width:'150px',
                height: '150px'
                }}></div>  

                <h1 style={{margin:30}}>Create Account</h1>
                <text style={{fontSize:20,fontWeight:'bold'}}>Account Number : {accInfo.accountNumber}</text>
                <input style={{marginTop:30}} type="text" name="fullName" value={accInfo.fullName} placeholder="FullName" onChange={ handleChange }></input>
                <input type="text" name="balance" value={accInfo.balance} placeholder="Account Balance" onChange={ handleChange }></input>
                <input type="password" name="pin" value={accInfo.pin} placeholder="Account Pin" onChange={ handleChange }></input>
                <div className="button" style={{background:'#010107',marginTop: 15}} onClick={register}>Create Account</div>
                <div className="button" style={{background:'#f94829 ',marginTop: 15}} onClick={() => navigate("/")}>Login</div>
                
                </div>

                <div className='form-right' style={{  
                backgroundImage: "url(" + "https://img.freepik.com/free-vector/tiny-people-depositing-taking-money-from-government-bank-flat-illustration_74855-17121.jpg?w=1060&t=st=1661628576~exp=1661629176~hmac=e7d444fbc2f1f3b89f6a0be31bad668f3c341e127fea957b06c7057e05eeb550" + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
                }}></div>
                 
        </div>
    );
}

export default BankRegister