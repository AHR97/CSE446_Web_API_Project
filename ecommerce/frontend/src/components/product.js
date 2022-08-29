import '../styles/products.css'
//import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

//import Data from '../data/items.json'

  const Product = () => {

  const navigate=useNavigate();


  let obj =localStorage.getItem("shopItems")
  const Items =JSON.parse(obj)

  console.log(Items)

 
  function pageNavi(id){

    localStorage.setItem("currentProductId", id);

    navigate('/details/'+id)
    //console.log(id)

  }

  return(
    Items.map(product => {        
        return(
            <div className="product">
            <img  src= {product.imageUrl}alt={product.productName}/>
      
            <div className="product__info">
              <p className="info__name">{product.productName}</p>
      
              <p className="info__description">{product.description.substring(0, 100)}...</p>
      
              <p className="info__price">{product.unitPrice}</p>
              
      
              <div className='info_button' onClick={() => pageNavi(product._id)}>View</div>
            </div>
          </div>
        )
      })

  );
};

export default Product;

