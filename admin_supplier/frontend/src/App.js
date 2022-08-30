import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AllOrderedProducts from './pages/OrderedProducts';
import AllShopProducts from './pages/ShopProducts';
import AllUsers from './pages/AllUsers';
import SupplierDashboard from './pages/SupplierDashboard';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/admindashboard" element={<AdminDashboard/>}/>
          <Route exact path="/adminorders" element={<AllOrderedProducts/>}/>
          <Route exact path="/adminshop" element={<AllShopProducts/>}/>
          <Route exact path="/adminusers" element={<AllUsers/>}/>
          <Route exact path="/supplierdash" element={<SupplierDashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
