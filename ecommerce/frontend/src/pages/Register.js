import React, {useState}from 'react'
import '../styles/formstyles.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {

    const navigate =useNavigate();


    const [ user, setUser] = useState({
        fullName: "",
        userName:"",
        email:"",
        password:"",
        confirmPassword: ""
    });

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    };

    const shopProducts = () =>{
        axios.get("http://localhost:9002/shop/getAllProducts")
        .then(res => {

            let allProducts =[]

            allProducts=res.data

            console.log(allProducts)

            localStorage.setItem("shopItems", JSON.stringify(allProducts));    

        })
    }

    const register = () => {
        const { fullName, userName, email, password, confirmPassword } = user
        if( fullName && userName && email && password && (password === confirmPassword)){
            axios.post("http://localhost:9002/client/signUp/register", user)
            .then( res => {
                alert(res.data.message)
                const user={
                    fullName:fullName,
                    userName:userName,
                    email:email,
                    password:password
                }
                
                localStorage.setItem("userInfo", JSON.stringify(user));
                

                shopProducts()
                navigate("/bankinfo")
            })
        } else {
            alert("invlid input")
        }
        
    }


    
    return (
        <div className='form' style={{  
            backgroundImage: "url(" + "https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=1380&t=st=1661600134~exp=1661600734~hmac=b2e2c39f1971f9e7d21f3c39d914312bbccafd3f7f031df651ef24cd9aa02e60" + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}>
            <div className="form-left" >
                <h1 >Register</h1>
                <input type="text" name="fullName" value={user.fullName} placeholder="Enter your Full Name" onChange={ handleChange }></input>
                <input type="text" name="userName" value={user.userName} placeholder="Enter your User Name" onChange={ handleChange }></input>
                <input type="text" name="email" value={user.email} placeholder="Enter your Email" onChange={ handleChange }></input>
                <input type="password" name="password" value={user.password} placeholder="Enter your Password" onChange={ handleChange }></input>
                <input type="password" name="confirmPassword" value={user.confirmPassword} placeholder="Confirm password" onChange={ handleChange }></input>
                <div className="button"  style={{background:'#370EB9'}} onClick={register}>Register</div>
                <div className='wrapper'>
                <text>Already have an account? </text>
                <text className='linkText' style={{color:'#FF5733'}} onClick={() => navigate("/login")}>Login</text>
            </div>
            </div>
        </div>
    );
}

export default Register