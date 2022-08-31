import React, {useState} from 'react'
import '../styles/formstyles.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Login = () => {

    const navigate =useNavigate()
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

           // console.log(allProducts)

            localStorage.setItem("shopItems", JSON.stringify(allProducts));
                

        })
    }

    
    const orderedProducts = () => {

        axios.get("http://localhost:9002/cart/userItems/getOrderedProducts")
        .then(res => {

            const orderArray=res.data

            console.log(orderArray)


            localStorage.setItem("orderItems", JSON.stringify(orderArray));


            // console.log(JSON.stringify(res.data.user)) 
        })
    }

    const adminBankInfo = async () =>{

            await axios.get('http://localhost:5002/bank/getAllBankUser').then(info =>{
            const bankInfo =info.data
            
            let userBankInfo=[]

            for(let i=0; i<bankInfo.length ;i++)
            {
                if(bankInfo[i].fullName==="Admin")
                {
                    userBankInfo=bankInfo[i]
                    localStorage.setItem("adminBankInfo",JSON.stringify(userBankInfo))
                    console.log(userBankInfo)
                }
            }
            if(userBankInfo)
            {
                
                navigate("/admindashboard")
            }
        })
    }

    const supplierBankInfo = async () =>{

        await axios.get('http://localhost:5002/bank/getAllBankUser').then(info =>{
        const bankInfo =info.data
        
        let userBankInfo=[]

        for(let i=0; i<bankInfo.length ;i++)
        {
            if(bankInfo[i].fullName==="Supplier")
            {
                userBankInfo=bankInfo[i]
                localStorage.setItem("supplierBankInfo",JSON.stringify(userBankInfo))
                console.log(userBankInfo)
            }
        }
        if(userBankInfo)
        {
            
            navigate("/supplierdash")
        }
    })
}
    const getAllUsers =async() =>{
        await axios.get('http://localhost:9002/client/user/getAllUser').then(res =>{
            let allUsers=[]
            allUsers=res.data
            localStorage.setItem("AllUsers", JSON.stringify(allUsers))
            console.log(allUsers)
        })
    }

    const login = async() => {

        if(user.email==='admin@gmail.com')
        {
            axios.post("http://localhost:7002/admin/login", user)
            .then(res => {
            
                alert(res.data.message)
                //setLoginUser(res.data.user)
                localStorage.setItem("userInfo", JSON.stringify(res.data.user));
                console.log(JSON.stringify(res.data.user))
            
                if(res.data.user)
                {   
                    shopProducts()
                    adminBankInfo()
                    getAllUsers()
                    orderedProducts()
                }else{
                    navigate("/")
                }    
    
    
            })

        }
        else{
            axios.post("http://localhost:7002/supplier/login", user)
            .then(res => {
            
                alert(res.data.message)
                //setLoginUser(res.data.user)
                localStorage.setItem("userInfo", JSON.stringify(res.data.user));
                console.log(JSON.stringify(res.data.user))
            
                if(res.data.user)
                {   
                    orderedProducts()
                    
                    supplierBankInfo()
                }else{
                    navigate("/")
                }    
    
    
            })
        }

       
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
         </div>
         <div className='form-right'></div>    
    </div>
);
}
export default Login