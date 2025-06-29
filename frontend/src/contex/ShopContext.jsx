import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "RS ";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});

  const navigate = useNavigate();

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Load products
  const getProductData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  // Sync cart from server if token exists
  useEffect(() => {
    if (token) {
      syncUserCart();
    } else {
      const storedCart = localStorage.getItem("cartItems");
      setCartItems(storedCart ? JSON.parse(storedCart) : {});
    }
  }, [token]);

  // Save cart to localStorage
  useEffect(() => {
    if (!token) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, token]);

  const syncUserCart = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (res.data.success && typeof res.data.cartData === "object" && res.data.cartData !== null) {
        setCartItems(res.data.cartData);
      } else {
        setCartItems({});
      }
    } catch (err) {
      console.error("Error syncing cart from backend:", err);
      setCartItems({});
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size before adding to cart.");
      return;
    }

    const updatedCart = JSON.parse(JSON.stringify(cartItems));
    if (!updatedCart[itemId]) updatedCart[itemId] = {};
    updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Failed to add to backend cart:", err);
      }
    }

    toast.success("Item added to cart!");
  };

  const updateCart = async (itemId, size, quantity) => {
    const updatedCart = JSON.parse(JSON.stringify(cartItems));
    if (!updatedCart[itemId]) updatedCart[itemId] = {};
    updatedCart[itemId][size] = quantity;
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Failed to update backend cart:", err);
      }
    }

    toast.success("Cart updated");
  };

  const removeFromCart = async (itemId, size) => {
    const updatedCart = JSON.parse(JSON.stringify(cartItems));

    if (updatedCart[itemId] && updatedCart[itemId][size]) {
      updatedCart[itemId][size] -= 1;

      if (updatedCart[itemId][size] <= 0) {
        delete updatedCart[itemId][size];
      }

      if (Object.keys(updatedCart[itemId]).length === 0) {
        delete updatedCart[itemId];
      }

      setCartItems(updatedCart);
      toast.info("Item removed from cart");

      if (token) {
        try {
          const newQty = updatedCart[itemId]?.[size] || 0;
          await axios.post(
            `${backendUrl}/api/cart/update`,
            { itemId, size, quantity: newQty },
            { headers: { token } }
          );
        } catch (err) {
          console.error("Error syncing removal to backend:", err);
        }
      }
    }
  };

  const deleteItemFromCart = async (itemId, size = null) => {
    const updatedCart = JSON.parse(JSON.stringify(cartItems));

    if (updatedCart[itemId]) {
      if (size) {
        delete updatedCart[itemId][size];
        if (Object.keys(updatedCart[itemId]).length === 0) {
          delete updatedCart[itemId];
        }
      } else {
        delete updatedCart[itemId];
      }

      setCartItems(updatedCart);
      toast.info("Item deleted from cart");

      if (token) {
        try {
          await axios.post(
            `${backendUrl}/api/cart/update`,
            { itemId, size, quantity: 0 },
            { headers: { token } }
          );
        } catch (err) {
          console.error("Failed to delete item in backend:", err);
        }
      }
    }
  };

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
    toast.info("Cart cleared");
  };

  const getCartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += cartItems[itemId][size];
      }
    }
    return count;
  };

  const getCartTotal = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        total += product.price * cartItems[itemId][size];
      }
    }
    return total + delivery_fee;
  };

  const getCartAmount = async () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        total += product.price * cartItems[itemId][size];
      }
    }
    return total;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    token,
    setToken,
    backendUrl,
    navigate,
    addToCart,
    updateCart,
    removeFromCart,
    deleteItemFromCart,
    clearCart,
    getCartCount,
    getCartTotal,
    getCartAmount,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
