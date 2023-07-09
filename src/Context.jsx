import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./Reducer.js";
import cartItems from "./data.jsx";
import {
  CLEAR_CART,
  LOAD_ITEMS,
  LOADING,
  DECREASE,
  INCREASE,
  REMOVE,
} from "./Actions.js";
import { getTotals } from "./utils.js";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

const newCart = cartItems.map((item) => [item.id, item]);
const latestCart = new Map(newCart);
// console.log(latestCart);

const initialArg = {
  isLoading: false,
  cart: new Map(),
};

export const AppConProv = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialArg);

  const { totalAmount, totalCost } = getTotals(state.cart);

  const handleClear = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: { act: id } });
  };

  const increaseItem = (id) => {
    dispatch({ type: INCREASE, payload: { act: id } });
  };

  const decreaseItem = (id) => {
    dispatch({ type: DECREASE, payload: { act: id } });
  };

  const fetchData = async () => {
    dispatch({ type: LOADING });
    const data = await fetch(url);
    const cart = await data.json();
    dispatch({ type: LOAD_ITEMS, payload: { cart } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleClear,
        removeItem,
        increaseItem,
        decreaseItem,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobeContext = () => {
  return useContext(AppContext);
};
