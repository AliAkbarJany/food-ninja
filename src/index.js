import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// react-router...
import { BrowserRouter } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { CartProvider } from "use-shopping-cart";

// React  Query........
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
})

const stripePromise = loadStripe("pk_test_51LEr9KBhhQqyCqe6pdI3j9qwMMZZCdC2wHTxL5Zyv3QGdZoJvg5iv6bVSxvonKuO9ag4l4bdADRBDPoNKTzUKdiV00eUm9i66S")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <CartProvider mode="checkout-session" stripe={stripePromise} currency="USD">
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </CartProvider>
  </QueryClientProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
