import Navbar from "../components/Navbar"
import ShopProducts from "../components/products"


const AllShopProducts = () =>{
    return(
        <div className="homescreen">
            <Navbar/>
            <div className="homescreen__detailscol">
                <h1>All Shop Products</h1>
                <ShopProducts/>
            </div>
            
        </div>
    )
}

export default AllShopProducts