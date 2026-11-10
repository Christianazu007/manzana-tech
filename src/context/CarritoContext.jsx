import { createContext, useContext, useState } from 'react';

export const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    if (quantity <= 0) return;
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const getCartQuantity = () => cart.reduce((acc, item) => acc + item.quantity, 0);

  const getCartTotal = () => cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  return (
    <CarritoContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getCartQuantity, getCartTotal }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
