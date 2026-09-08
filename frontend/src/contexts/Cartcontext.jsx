import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);


  // ADD TO CART
  const addToCart = (food) => {

    setCartItems((currentItems) => {

      const existingItem = currentItems.find(
        (item) => item.id === food.id
      );

      if (existingItem) {

        return currentItems.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );

      }

      return [
        ...currentItems,
        {
          ...food,
          quantity: 1,
        },
      ];

    });

  };


  // REMOVE COMPLETELY
  const removeFromCart = (id) => {

    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id
      )
    );

  };


  // INCREASE QUANTITY
  const increaseQuantity = (id) => {

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );

  };


  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {

    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

  };


  // CLEAR CART
  const clearCart = () => {

    setCartItems([]);

  };


  // TOTAL ITEMS
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );


  // TOTAL PRICE
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >

      {children}

    </CartContext.Provider>

  );
}


// CUSTOM HOOK
export function useCart() {

  return useContext(CartContext);

}