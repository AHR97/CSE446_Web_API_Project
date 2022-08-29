import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'
import BankInfo from './pages/BankInfo';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/bankinfo" element={<BankInfo/>}/>
            <Route exact path="/userprofile" element={<UserProfile/>}/>
            <Route exact path="/details/:id" element={<ProductDetails/>}/>
            <Route exact path="/cart" element={<Cart/>}/>
          
        </Routes>
      </Router>
    </div>

  );
}

export default App;
