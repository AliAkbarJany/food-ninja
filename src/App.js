import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './shared/Navbar/Navbar';
import Home from './pages/Home/Home';
import Signin from './pages/Login/Signin';
import SignUp from './pages/Login/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Contact from './pages/Contact/Contact';

// React Toastyfy......
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import AllUsers from './pages/Dashboard/AllUsers/AllUsers';
import AllVendors from './pages/Dashboard/AllVendors/AllVendors';
import MakeVendor from './pages/Dashboard/MakeVendor/MakeVendor';
import Merchant from './pages/Merchant/Merchant';
import MyProfile from './pages/Dashboard/MyProfile';
import RequireAuth from './pages/Login/RequireAuth';

function App() {
  return (
    <div className="App">

      {/* <Navbar></Navbar> */}
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/signin' element={<Signin></Signin>}></Route>

        {/* merchant.... */}
        <Route path='merchants' element={<Merchant></Merchant>} ></Route>

        {/* .......DashBoard......... */}
        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard></Dashboard>
          </RequireAuth>
        } >

          <Route index element={<MyProfile></MyProfile>} ></Route>

          <Route path='all_user' element={<AllUsers></AllUsers>}></Route>
          <Route path='all_vendor' element={<AllVendors></AllVendors>}></Route>
          <Route path='make_vendor' element={<MakeVendor></MakeVendor>}></Route>

        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
