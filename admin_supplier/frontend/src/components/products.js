import '../styles/orderedproducts.css'

const ShopProducts=()=>{

    let obj =localStorage.getItem("shopItems")
    const Items =JSON.parse(obj)

    console.log(Items)

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
                    <text style={{fontSize: 14, fontWeight: 400,paddingBottom:10}}>Price: {orderItems.unitPrice}</text>
                </div>
             
            </div>
          </div>
        )
      })
    

)
};

export default ShopProducts;