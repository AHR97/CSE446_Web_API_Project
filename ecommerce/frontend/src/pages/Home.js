import React from 'react'
import Navbar from '../components/Navbar'
import Product from '../components/product'
import '../styles/home.css'

const Home = () => {



  return (
    <div className='homescreen'>
      <Navbar/>
      <h2 className="homescreen__title">Latest Products</h2>
      <div className="homescreen__products">
          <Product/>
      </div>
      
    </div>
    
  )
}

export default Home