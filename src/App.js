import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './shared/Navbar/Navbar';
import Home from './pages/Home/Home';
import Signin from './pages/Login/Signin';
import SignUp from './pages/Login/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <div className="App">
  
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/home' element={<Home></Home>}></Route>
      <Route path='/contact' element={<Contact></Contact>}></Route>
      <Route path='/signup'element={<SignUp></SignUp>}></Route>
      <Route path='/signin'element={<Signin></Signin>}></Route>

      {/* .......DashBoard......... */}
      <Route path='/dashboard' element={<Dashboard></Dashboard>} ></Route>
    </Routes>
    </div>
  );
}

export default App;
