import React, { createContext, useContext, useReducer } from "react";

const Context = createContext();

/* 1- Define initial state for the cart as an object with an empty array
for `items` and a `totalAmount` of `0`
*/
const initialCartState = {
  items: [],
  totalAmount: 0,
};

/* 2- Define a reducer that takes the current state and an action
and returns a new state based of the type of action received
*/
const cartReducer = (state, action) => {
  // 3- If an action of type "ADD_ITEM" is received,
  if (action.type === "ADD_ITEM") {
    // 3a- A new `items` array is created by adding the input `item` using `concat()` method on the original `state.items`
    const updatedItems = state.items.concat(action.item);

    const updatedTotalAmount =
      /* 3b- A new `totalAmount` is calculated by adding `item.price` multiplied
    by `item.amount` and plus the original `state.totalAmount` 
    */
      state.totalAmount + action.item.price * action.item.amount;

    // Finally, a new state object is returned containing the updated `items` array and `totalAmount`
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const itemIndex = state.items.findIndex((item) => item.id === action.id);
    if (itemIndex === -1) {
      return state;
    }
    const updatedItems = [...state.items];

    const removableItem = updatedItems[itemIndex];

    if (removableItem.amount > 1) {
      removableItem.amount--;
    } else {
      updatedItems.splice(itemIndex, 1);
    }

    const updatedTotalAmount = state.totalAmount - removableItem.price;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "RESET_CART") {
    return initialCartState;
  }
};

function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  const addItemFn = function (item) {
    dispatch({ type: "ADD_ITEM", item: item });
  };

  const removeItemFn = function (id) {
    dispatch({ type: "REMOVE_ITEM", id: id });
  };

  const resetCartFn = () => {
    dispatch({ type: "RESET_CART" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItemFn: addItemFn,
    removeItemFn: removeItemFn,
    resetCartFn: resetCartFn,
  };

  return <Context.Provider value={cartContext}>{children}</Context.Provider>;
}

export const GlobalContext = function () {
  return useContext(Context);
};

export { CartProvider, Context };
