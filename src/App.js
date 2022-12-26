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
import RequireAdmin from './pages/Login/RequireAuth';
import ManageItems from './pages/Dashboard/ManageItems/ManageItems';
import RequireVendor from './pages/Login/RequireVendor'
import AddMenu from './pages/Dashboard/AddMenu/AddMenu';
import Restaurant from './pages/Restaurant/Restaurant';
import Result from './pages/Result/Result';

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

        <Route
          path="restaurant/:restaurantId"
          element={<Restaurant></Restaurant>}
        ></Route>

        {/* merchant.... */}
        <Route path='merchants' element={<Merchant></Merchant>} ></Route>

        <Route
            path="result"
            element={
              <RequireAuth>
                <Result></Result>
              </RequireAuth>
            }
          ></Route>

        {/* .......DashBoard......... */}
        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard></Dashboard>
          </RequireAuth>
        } >

          <Route index element={<MyProfile></MyProfile>} ></Route>

          <Route path='all_user' element={
            <RequireAdmin>
              <AllUsers></AllUsers>
            </RequireAdmin>
          }></Route>

          <Route path='all_vendor' element={
            <RequireAdmin>
              <AllVendors></AllVendors>
            </RequireAdmin>
          }></Route>
          
          <Route path='make_vendor' element={
            <RequireAdmin>
              <MakeVendor></MakeVendor>
            </RequireAdmin>
          }></Route>

          {/* <Route
            path="menu_list"
            element={
              <RequireVendor>
                <MenuList></MenuList>
              </RequireVendor>
            }
          ></Route> */}

          <Route
            path="add_menu"
            element={
              <RequireVendor>
                <AddMenu></AddMenu>
              </RequireVendor>
            }
          ></Route>

          {/* <Route
            path="all_order"
            element={
              <RequireVendor>
                <AllOrders></AllOrders>
              </RequireVendor>
            }
          ></Route> */}

          <Route
            path="manage_items"
            element={
              <RequireVendor>
                <ManageItems></ManageItems>
              </RequireVendor>
            }
          ></Route>

        </Route>
        {/* .........Dashboard end......... */}

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
