import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Group } from 'styled-icons/boxicons-regular';
import { InfoOutline } from 'styled-icons/evaicons-outline';
import { Menu3, Time } from 'styled-icons/remix-fill';
import MenuItems from '../../components/MenuItems/MenuItems';
import Loading from '../../shared/Loading/Loading';

import { useShoppingCart } from "use-shopping-cart";

import {
    Adressbar,
    Aside,
    BannerBox,
    BookingButton, Box, BoxContainer, CartBox,
    Container, DrawerContent, Grid, RestaurantContainer,
    Seperator, StoreInfo, Tags, VendorBanner, VendorButton,
    VendorDetails, VendorInfo, VendorLogo, VendorOpen, VendorTags
} from './Restaurant.element';
import CartSummary from '../../components/CartSummary/CartSummary';
import Navbar from '../../shared/Navbar/Navbar';


const Restaurant = () => {
    const { restaurantId } = useParams();
    const [restaurantTags, setRestaurantTags] = useState([]);
    const [click, setClick] = useState(false);

    const [showCart, setShowCart] = useState(true);
    const { cartCount, cartDetails } = useShoppingCart();
    const cartItems = Object.keys(cartDetails).map((key) => cartDetails[key]);

    // React query...
    const { data: restaurant, isLoading: restaurantLoading } = useQuery(["restaurant", restaurantId], () => fetch(`http://localhost:5000/restaurants/vendor/${restaurantId}`).then((res) => res.json()));

    useEffect(() => {
        setRestaurantTags(restaurant?.restaurantType.split(", "));
    }, [restaurant]);

    const {
        data: store,
        isLoading: menuLoading,
        refetch,
    } = useQuery(["menu", restaurantId], () =>fetch(`http://localhost:5000/menu/${restaurantId}`).then((res) => res.json(), {
            refetchOnWindowFocus: false,
            // enabled: false,
            // staleTime: Infinity,
            cacheTime: 0,
        })
    );
    useEffect(() => {
        if (cartCount) {
          // refetch();
          if (restaurantId !== cartItems[0]?.restaurantInfo?.restaurant_id) {
            setShowCart(false);
          }
        }
      }, [cartCount,cartItems, restaurantId, refetch]);


    if (restaurantLoading || menuLoading) {
        return <Loading></Loading>;
    }

 
    return (
        <>
            <Container>
            <Navbar></Navbar>
                <Grid>
                    <RestaurantContainer>
                        <BoxContainer>
                            <Box>
                                <BannerBox>
                                    <VendorBanner>
                                        <img
                                            crossorigin="anonymous"
                                            src={restaurant?.restaurantBanner}
                                            alt="Vendor Banner"
                                        />
                                    </VendorBanner>
                                    <VendorLogo>
                                        <div>
                                            <picture>
                                                <img
                                                    loading="eager"
                                                    src={restaurant?.restaurantLogo}
                                                    alt="restaurant logo"
                                                />
                                            </picture>
                                        </div>
                                    </VendorLogo>
                                </BannerBox>
                                <VendorInfo>
                                    {/* <h1>{restaurant?.restaurantName}</h1> */}
                                    <VendorDetails>
                                        <StoreInfo>
                                            <Tags>
                                                <p>৳৳৳</p>
                                                {restaurantTags?.map((tag, index) => (
                                                    <div key={index}>
                                                        <Seperator />
                                                        <VendorTags>
                                                            <span>{tag}</span>
                                                        </VendorTags>
                                                    </div>
                                                ))}
                                            </Tags>
                                            <Adressbar>
                                                <Time size="15" />
                                                <VendorOpen>
                                                    <p>Closed</p>
                                                </VendorOpen>
                                                <Seperator />
                                                <span>Opens at 10:00 AM</span>
                                                <Seperator />
                                                {/* <p>{restaurant?.restaurantAddress}</p> */}
                                            </Adressbar>
                                        </StoreInfo>
                                        <VendorButton>
                                            <button>
                                                <span>
                                                    <span>
                                                        <InfoOutline size="20" />
                                                        More Info
                                                    </span>
                                                </span>
                                            </button>

                                            {/* <Link to={`/booking/${restaurant.restaurant_id}`}>
                                                <BookingButton>
                                                    <span>
                                                        <span>
                                                            <Group size="20" />
                                                            Book A Table
                                                        </span>
                                                    </span>
                                                </BookingButton>
                                            </Link> */}
                                        </VendorButton>
                                    </VendorDetails>
                                </VendorInfo>
                                {/* restaurant content section */}
                                <DrawerContent className="drawer-content md:hidden">
                                    {/* <!-- Page content here --> */}
                                    <label
                                        htmlFor="my-drawer"
                                        className="p-2 btn btn-secondary"
                                    // onClick={handleClick}
                                    >
                                        <span>
                                            Cart <Menu3 size="28" />
                                        </span>
                                    </label>
                                </DrawerContent>

                                {/* <VendorNavigation store={store} /> */}
                                <MenuItems
                                    store={store}
                                    showCart={showCart}
                                    setShowCart={setShowCart}
                                    restaurantId={restaurantId}
                                />
                            </Box>
                        </BoxContainer>
                    </RestaurantContainer>
                    <Aside click={click}>
                        <CartBox>
                            <CartSummary
                                restaurant={restaurant}
                                showCart={showCart}
                                setClick={setClick}
                            ></CartSummary>
                        </CartBox>
                    </Aside>
                </Grid>
            </Container>
        </>
    );
};

export default Restaurant;