import React, {useState} from 'react'
import '../styles/formstyles.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const BankLogin = () => {

    
    const navigate =useNavigate();

    const [ accInfo, setAccInfo] = useState({
        accountNumber:"",
        pin:"",
    });

    const handleChange = e => {
        const { name, value } = e.target
        setAccInfo({
            ...accInfo,
            [name]: value
        })
    };

    const login = () =>{
        const {accountNumber,pin}=accInfo

        if(accountNumber && pin){
            axios.post("http://localhost:5002/bank/user/login", accInfo)
            .then(res => {
        
            alert(res.data.message)
            //setLoginUser(res.data.user)
            localStorage.setItem("bankUserInfo", JSON.stringify(res.data.user));
            console.log(JSON.stringify(res.data.user))
        
            if(res.data.user)
            {   
                navigate("/bankhome")
            }else{
                navigate("/")
            }   
        })
        }else{
            alert("Invalid input")
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

                <h1 style={{marginTop:30}}>Login</h1>
                <input type="text" name="accountNumber" value={accInfo.accountNumber} placeholder="Account Number" onChange={ handleChange }></input>
                <input type="password" name="pin" value={accInfo.pin} placeholder="Account Pin" onChange={ handleChange }></input>
                <div className="button" style={{background:'#010107',marginTop: 20,marginBottom:20}} onClick={login}>Login</div>
                <div className='wrapper'>
                <text style={{fontSize:18}}>Don't Have an Acoount? </text>
                <text className='linkText' style={{color:'red'}} onClick={() => navigate("/bankregister")}>Create Account</text>
                </div>
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

export default BankLogin