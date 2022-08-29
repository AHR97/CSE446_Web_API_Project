
const UserCartItems=()=>{

    let obj =localStorage.getItem("userCartItems")
    const Items =JSON.parse(obj)

    let total=0

    for(let i=0; i<Items.length;i++)
    {
        total=total+parseInt(Items[i].amount)
    }
    
    console.log(total)

    return( 
    Items.map(cartItems => {

        for(let i=0; i<Items.lenght; i++)
        {
            console.log("fashfjkashj")
        }

        return(
                <div className="cartItems">
                    <img className='img' src= {cartItems.imageUrl}alt={cartItems.productName}/>
        
                    <div className="description">
                        <div className='left'>
                            <text style={{fontSize: 18, fontWeight: 'bold',paddingBottom:10}}>Product Name: {cartItems.productName}</text>
                            <text style={{fontSize: 14, fontWeight: 400,paddingBottom:10,paddingTop:10}}>Product Id: {cartItems.productId}</text>
                        </div>
                        <div className='right'>
                            <text style={{fontSize: 14, fontWeight: 400,paddingBottom:10}}>Quantity: {cartItems.quantity}</text>
                            <text style={{fontSize: 14, fontWeight: 400,paddingBottom:10}}>Total: {cartItems.amount}</text>
                        </div>
                    </div>
                 </div>
                
        )
      })
    

)
};

export default UserCartItems;