import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item or increment quantity by 1
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Number(item.quantity) + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove item by ID
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Set quantity directly to a new number (e.g., updateQuantity(id, 5))
  const updateQuantity = (id, newQuantity) => {
    const qty = Number(newQuantity);

    // If newQuantity is 0 or less, remove item or cap at 1
    if (isNaN(qty) || qty < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => setCart([]);

  // Totals calculated using Number() coercion to avoid string concatenation
  const totalItems = cart.reduce((acc, item) => acc + Number(item.quantity), 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * Number(item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);