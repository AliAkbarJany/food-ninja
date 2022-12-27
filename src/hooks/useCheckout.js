import axios from 'axios';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useShoppingCart } from 'use-shopping-cart';
import auth from '../firebase.init';

const useCheckout = () => {
    const [user] = useAuthState(auth);
    const { cartDetails, redirectToCheckout } = useShoppingCart();
    console.log(cartDetails)
  
    const navigate = useNavigate();
  
    // console.log(user);
    async function handleCheckout() {
      const session = await axios
        .post("https://food-ninja-server.onrender.com/checkout-sessions", cartDetails)
        .then((res) => res.data)
        .catch((error) => {
          toast.error("checkout failed");
          console.log("Error during checkout : ", error);
        });
  
      if (session?.checkoutSession && user?.email) {
        console.log("this is session", session);
        window.location.assign(session?.checkoutSession?.url);
      } else {
        navigate("/signin");
      }
    }
    return handleCheckout;
};

export default useCheckout;