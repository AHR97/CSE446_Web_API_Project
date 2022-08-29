import React, {useState} from 'react'
import '../styles/formstyles.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const BankInfo = () => {

    
    const navigate =useNavigate();

    const obj= localStorage.getItem("userInfo")

    const userInfo=JSON.parse(obj)

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

    const saveBankInfo = async() =>{
        const userName=userInfo.userName
        const accountNumber=accInfo.accountNumber
        const pin=accInfo.pin
        console.log(userName,accountNumber,pin)

        await axios.post('http://localhost:9002/client/user/addBankInfo',{userName:userName, accountNumber:accountNumber, pin:pin}).then(res =>{
            
            alert(res.data.message)

            if(res.data.message === "Successfully Added")
            {
                localStorage.setItem('userBankAccount',accountNumber)
                navigate('/')
            }else{
                navigate('/bankinfo')
            }
        })
        
    }

    return (
            <div className="form" style={{  
                backgroundImage: "url(" + "https://img.freepik.com/free-photo/bottles-cash-with-coins-saving-money-concept_1150-12569.jpg?w=1060&t=st=1661617833~exp=1661618433~hmac=cfd816e453912aec4b4706ca8f119149673a86cf81d8edda13ce04a459e06b67" + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
                }}>
                <div className='form-right' ></div>
                <div className="form-left">
                <div style={{  
                backgroundImage: "url(" + "https://img.freepik.com/free-vector/payment-card-electronic-funds-transfer-colorful-cartoon-characters-holding-plastic-credit-card-banking-credit-deposit-contactless-payment-system_335657-842.jpg?w=740&t=st=1661617744~exp=1661618344~hmac=8bc4e3f29a3b4abebaacee78dd4e7051c9af6aaa192027ac4186c9d6bd1de058" + ")",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                margin: '10px 100px',
                width:'150px',
                height: '150px'
                }}></div>   
                <h1 style={{marginTop:30}}>User Bank Info</h1>
                <input type="text" name="accountNumber" value={accInfo.accountNumber} placeholder="Account Number" onChange={ handleChange }></input>
                <input type="password" name="pin" value={accInfo.pin} placeholder="Account Pin" onChange={ handleChange }></input>
                <div className="button" style={{background:'#010107',}} onClick={saveBankInfo} >Save Info</div>
                </div>
                 
        </div>
    );
}

export default BankInfo