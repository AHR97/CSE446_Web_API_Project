import React, {useState} from 'react'
import '../styles/formstyles.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//import { useDispatch,  } from 'react-redux'
//import Background from '../images/bgImage.png';


const Login = () => {

    
    const navigate =useNavigate();

    const [ user, setUser] = useState({
        email:"",
        password:"",
    });

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    };

    const shopProducts = async() =>{
        await axios.get("http://localhost:9002/shop/getAllProducts")
        .then(res => {

            let allProducts =[]

            allProducts=res.data

            console.log(allProducts)

            localStorage.setItem("shopItems", JSON.stringify(allProducts));    

        })
    }


    const userBankInfo = async (userName) =>{

        await axios.get('http://localhost:9002/client/user/getUserBankInfo').then(info =>{
        const bankInfo =info.data
        
        let userBankInfo

        for(let i=0; i<bankInfo.length ;i++)
        {
            if(bankInfo[i].userName===userName)
            {
                userBankInfo=bankInfo[i]
                localStorage.setItem("userBankInfo",JSON.stringify(userBankInfo))
                //console.log(userBankInfo)
                //bankData(userBankInfo.accountNumber)
            }
        }
    })
    }

    const login = () => {

        axios.post("http://localhost:9002/client/signIn/login", user)
        .then(res => {
        
            alert(res.data.message)
            //setLoginUser(res.data.user)
            localStorage.setItem("userInfo", JSON.stringify(res.data.user));
            console.log(JSON.stringify(res.data.user))
        
            if(res.data.user)
            {   
                shopProducts()
                userBankInfo(res.data.user.userName)
                navigate("/")
            }else{
                navigate("/login")
            }    


        })
    }


    return (
            <div className="form" style={{  
                backgroundImage: "url(" + "https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=1380&t=st=1661600134~exp=1661600734~hmac=b2e2c39f1971f9e7d21f3c39d914312bbccafd3f7f031df651ef24cd9aa02e60" + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>

            <div className="form-left">
            <h1 style={{marginTop:100}}>Login</h1>
            <input type="text" name="email" value={user.email} placeholder="Enter your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Enter your Password" onChange={ handleChange }></input>
            <div className="button" style={{background:'#FF5733'}} onClick={login} >Login</div>
            <div className='wrapper'>
                <text>New User? </text>
                <text className='linkText' style={{color:'#370EB9'}} onClick={() => navigate("/register")}>Register</text>
            </div>

             </div>
             <div className='form-right'></div>    
        </div>
    );
}

export default Login