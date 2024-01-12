import React, { createContext, useEffect, useReducer, useState } from "react";
import Reducer from './Reducer';
import axios from "axios";
import { apiDomain } from "../utils/utilsDomain";


const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
}

export const Context = createContext({
  ...INITIAL_STATE,
});

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    try {
      const response = await axios.get(`${apiDomain}/cart/${user.id}`);
      dispatch({ type: "SET_CART_ITEMS", payload: response.data });
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleAddToCart = async (product_id) => {

    try {
      await axios.post(`${apiDomain}/cart`, { product_id });
      getCartItems();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <Context.Provider value={{ user: state.user, cartItems, dispatch, products, handleAddToCart, setCartItems }}>
      {children}
    </Context.Provider>
  );
}