import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Close } from 'styled-icons/evaicons-solid';
import { Menu3 } from 'styled-icons/icomoon';
import { BookingBtn, CartBtn, LeftNav, ListItem, Logo, MobileIcon, NavContainer, NavItemBtn, NavLogo, NavMenu, NavOverlay, ProfileImage, RegisterBtn, RightNav, UserNavContainer, UserProfile } from './Navbar.elements';
import headerLogo from "../../assets/Header/food_ninja3.png";
import DefaultPic from '../../assets/Login/default_pic.jpg'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { ShoppingCartOutline } from 'styled-icons/evaicons-outline';
import { useShoppingCart } from 'use-shopping-cart';

const Navbar = () => {
  const [user] = useAuthState(auth);
  // console.log(user);
  const logout = () => {
    signOut(auth);
  };


  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { cartCount, cartDetails } = useShoppingCart();
  const cartItems = Object.keys(cartDetails).map((key) => cartDetails[key]);
  // .........................................
  // /..................................
  const [button, setButton] = useState(true);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);


  return (
    <>
      <NavContainer>
        <NavLogo to="/" onClick={closeMobileMenu}>
          <Logo src={headerLogo} alt="Company Logo" />
        </NavLogo>

        <LeftNav>
          <NavMenu click={click}>
            <ListItem>
              <NavLink end to="/" onClick={closeMobileMenu}>
                Home
              </NavLink>
            </ListItem>
            {/* <ListItem>
              <NavLink to="/menu" onClick={closeMobileMenu}>
                Menu
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/restaurants" onClick={closeMobileMenu}>
                Restaurants
              </NavLink>
            </ListItem> */}
            <ListItem>
              <NavLink to="/dashboard" onClick={closeMobileMenu}>
                Dashboard
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/contact" onClick={closeMobileMenu}>
                Contact
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/blog" onClick={closeMobileMenu}>
                Blog
              </NavLink>
            </ListItem>
            <ListItem>
              {
                user ?
                  <button onClick={logout} className='btn btn-warning'>SignOut</button>
                  :
                  <NavLink to="/signin" onClick={closeMobileMenu}>
                    Signin
                  </NavLink>
              }

            </ListItem>
            <ListItem>
              <CartBtn>
                <div className="indicator">
                  <span className="indicator-bottom indicator-start indicator-item badge badge-error">
                    {cartCount}
                  </span>

                  <ShoppingCartOutline
                    className="grid bg-base-300 place-items-center"
                    width={40}
                    height={40}
                  />
                </div>
              </CartBtn>
            </ListItem>
            <NavItemBtn>
              {!button && (
                <>
                  <ListItem>
                    <NavLink to="/book">
                      <BookingBtn>Book A table</BookingBtn>
                    </NavLink>
                  </ListItem>
                  <ListItem>
                    {user ? (
                      <RegisterBtn user onClick={logout}>
                        Sign Out
                      </RegisterBtn>
                    ) : (
                      <Link to="/signup">
                        <RegisterBtn>Sign Up</RegisterBtn>
                      </Link>
                    )}
                  </ListItem>
                </>
              )}
            </NavItemBtn>
          </NavMenu>

        </LeftNav>

        <RightNav>
          <Link to="/signup">
            <BookingBtn>Book A table</BookingBtn>
          </Link>
          {user ? (
            <RegisterBtn user onClick={logout}>
              Sign Out
            </RegisterBtn>
          ) : (
            <Link to="/signin">
              <RegisterBtn>Sign In</RegisterBtn>
            </Link>
          )}
        </RightNav>

        <MobileIcon onClick={handleClick}>
          {!click ? <Menu3 size="48" /> : <Close size="48" />}
        </MobileIcon>

      </NavContainer>
      <NavOverlay></NavOverlay>

      {/* ......................
      ......................... */}
      {user && (
        <UserNavContainer className='mt-10'>
          <div className="grid z-10 flex-grow  bg-slate-200  place-items-center p-1 ">
            <UserProfile>
              <ProfileImage>
                <img
                  src={user?.photoURL ? user.photoURL : DefaultPic}
                  alt="profile avatar"
                  referrerPolicy="no-referrer"
                  className="shadow rounded-full max-w-full h-auto align-middle border-none"
                />
              </ProfileImage>
              <p className="px-1 font-bold text-slate-600">
                {user?.displayName ? user?.displayName : "user"}
              </p>

              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="btn btn-circle btn-accent btn-sm"
                >
                  <ChevronDown width={24} height={24} />
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content mt-4 menu p-2 gap-2 shadow bg-slate-100 rounded w-52"
                >
                  <li>
                    <Link to="/dashboard" className="p-0">
                      <button className="btn btn-ghost btn-block">
                        Profile
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="p-0">
                      <button className="btn btn-ghost btn-block">
                        Orders
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button
                      className="btn btn-outline btn-error"
                      onClick={logout}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>

            </UserProfile>
          </div>
          <div className="divider divider-horizontal p-0 m-0"></div>
          <div className="grid z-10 flex-grow  bg-slate-300  place-items-center">
            {cartCount ? (
              <NavLink
                to={`/restaurant/${cartItems[0]?.restaurantInfo?.restaurant_id}`}
                onClick={() => {
                  window.reload();
                }}
              >
                <CartBtn>
                  <div className="indicator">
                    <span className="indicator-bottom indicator-start indicator-item badge badge-error">
                      {cartCount}
                    </span>

                    <ShoppingCartOutline
                      className="grid bg-base-300 place-items-center"
                      width={40}
                      height={40}
                    />
                  </div>
                </CartBtn>
              </NavLink>
            ) : (
              <CartBtn>
                <div className="indicator">
                  <span className="indicator-bottom indicator-start indicator-item badge badge-error">
                    {cartCount}
                  </span>

                  <ShoppingCartOutline
                    className="grid bg-base-300 place-items-center"
                    width={40}
                    height={40}
                  />
                </div>
              </CartBtn>
            )}
          </div>
        </UserNavContainer>
      )}

    </>
  );
};

export default Navbar;