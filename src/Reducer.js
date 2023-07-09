import {
  CLEAR_CART,
  LOAD_ITEMS,
  LOADING,
  DECREASE,
  INCREASE,
  REMOVE,
} from "./Actions.js";

export const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }

  if (action.type === REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload.act);
    return { ...state, cart: newCart };
  }

  if (action.type === INCREASE) {
    const item = new Map(state.cart);
    const itemId = action.payload.act;
    const newItem = item.get(itemId);
    const updateItem = { ...newItem, amount: newItem.amount + 1 };
    item.set(itemId, updateItem);
    return { ...state, cart: item };
  }

  if (action.type === DECREASE) {
    const item = new Map(state.cart);
    const itemId = action.payload.act;
    const newItem = item.get(itemId);
    if (newItem.amount === 1) {
      item.delete(itemId);
      return { ...state, cart: item };
    }
    const updateItem = { ...newItem, amount: newItem.amount - 1 };
    item.set(itemId, updateItem);
    return { ...state, cart: item };
  }

  if (action.type === LOADING) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOAD_ITEMS) {
    const newCart = new Map(action.payload.cart.map((item) => [item.id, item]));
    return { ...state, isLoading: false, cart: newCart };
  }

  throw new Error(`Action type '${action.type}' wasn't found`);
};
