import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BankLogin from './pages/BankLogin';
import BankRegister from './pages/BankRegister';
import BankHome from './pages/BankHome';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<BankLogin/>}/>
          <Route exact path="/bankregister" element={<BankRegister/>}/>
          <Route exact path="/bankhome" element={<BankHome/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
