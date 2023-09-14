import { createContext, useContext, useState } from "react";

// Create a context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    // Check if the product already exists in the cart
    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (productIndex !== -1) {
      // If it exists, update its quantity
      const updatedCart = [...cart];
      if (updatedCart[productIndex].quantity < 20) {
        updatedCart[productIndex].quantity++;
      }
      setCart(updatedCart);
    } else {
      // If it doesn't exist, add it with initial quantity and checked status
      const productWithProps = {
        ...product,
        quantity: 1, // Initial quantity
        checked: true, // Initial checked status
      };
      setCart([...cart, productWithProps]);
    }
  };

  // Function to remove a product from the cart (if needed)
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  // Function to check or uncheck a product in the cart
  const toggleProductCheck = (productId) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? { ...product, checked: !product.checked }
          : product
      )
    );
  };

  // Function to update the quantity of a product in the cart
  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  // Function to check the checked status of a product in the cart
  const isProductChecked = (productId) => {
    const product = cart.find((item) => item.id === productId);
    return product ? product.checked : false;
  };

  // Function to calculate and return the total quantity
  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    cart.forEach((product) => {
      totalQuantity += product.quantity;
    });
    return totalQuantity;
  };

  const calculateTotalQuantityChecked = () => {
    let totalQuantity = 0;
    cart.forEach((product) => {
      if (product.checked === true) {
        totalQuantity += product.quantity;
      }
    });
    return totalQuantity;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isProductChecked,
        toggleProductCheck,
        updateQuantity,
        calculateTotalQuantity,
        calculateTotalQuantityChecked
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
