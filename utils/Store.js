import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

// use Cookies.get to get value from cookie to set the cart
const initialState = {
  cart: Cookies.get('cart')  
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [], shippingAddress:{} },
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
      // update the cart item(for the refreshing of page)
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    // another case to remove cart item
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      // return previous state in the cart, keep previous cart and then pass the cartItems as a parameter
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    // cart reset
    case 'CART_RESET':
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      };

      // another case to save shipping address
      case 'SAVE_SHIPPING_ADDRESS':
        return {
          ...state,
          cart: {
            ...state.cart,
            shippingAddress: {
              ...state.cart.shippingAddress,
              ...action.payload,
            },
          },
        };

        case 'SAVE_PAYMENT_METHOD':
        return {
          ...state,
          cart: {
            ...state.cart,
            paymentMethod: action.payload
          },
        };
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
