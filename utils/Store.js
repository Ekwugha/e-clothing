import { createContext, useReducer } from 'react';

export const Store = createContext();

// set the initial state of the cart to be empty (this is the first thing)
const initialState = {
  cart: { cartItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    // if action.type is CART_ADD_ITEM, then we need to update the state and add new item to the cart
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      //   search the state for the newItem using find method on the cartItem in the cart object that is in the state. If the item with the slug has been found then existItem gets the item
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      // The map function checks each items in the cart item if they're equal to existitem & replace it with the new item cause it contains the new quantity of the items in the cart otherwise keeps the items as they are.
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    // another case to remove cart item
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      // return previous state in the cart, keep previous cart and then pass the cartItems as a parameter   
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

// this component accept children as the parameter and creTE a wrapper for the children and make the store provider avalilable for the children
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  // store is coming from createcontext and provider is the wrapper for all the children(component) in the state
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
