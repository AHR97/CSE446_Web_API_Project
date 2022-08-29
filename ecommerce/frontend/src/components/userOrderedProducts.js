import '../styles/orderedproducts.css'

const UserOrderedProducts=()=>{

    let obj =localStorage.getItem("userOrderItems")
    const Items =JSON.parse(obj)

    let total=0

    for(let i=0; i<Items.length;i++)
    {
        total=total+parseInt(Items[i].amount)
    }
    
    console.log(total)

    return(  
    Items.map(orderItems => {
        return(
            <div className="orderedItems">
            <img className='img' src= {orderItems.imageUrl}alt={orderItems.productName}/>
      
            <div className="description">
                <div className='left'>
                    <text style={{fontSize: 18, fontWeight: 'bold',paddingBottom:10}}>Product Name: {orderItems.productName}</text>
                    <text style={{fontSize: 14, fontWeight: 400,paddingBottom:10,paddingTop:10}}>Product Id: {orderItems.productId}</text>
                    <text style={{fontSize: 14, fontWeight: 400,paddingBottom:10}}>Quantity: {orderItems.quantity}</text>
                </div>
                <div className='right'>
                    <text style={{fontSize: 14, fontWeight: 400,paddingBottom:10}}>Transection Id: {orderItems.transactionId}</text>
                    <text style={{fontSize: 14, fontWeight: 400,paddingBottom:10}}>Total: {orderItems.amount}</text>
                </div>
              
             
            </div>
          </div>
        )
      })
    

)
};

export default UserOrderedProducts;