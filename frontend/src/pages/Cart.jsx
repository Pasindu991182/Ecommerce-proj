import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contex/ShopContext';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    addToCart,
    removeFromCart,
    deleteItemFromCart,
    navigate
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    // Only process if cartItems exists and has content
    if (cartItems && typeof cartItems === 'object') {
      for (const itemId in cartItems) {
        if (cartItems[itemId] && typeof cartItems[itemId] === 'object') {
          for (const size in cartItems[itemId]) {
            const quantity = cartItems[itemId][size];
            if (quantity > 0) {
              tempData.push({
                _id: itemId,
                size,
                quantity,
              });
            }
          }
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  // Check if cart is truly empty
  const isCartEmpty = !cartData || cartData.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Title text1={'YOUR '} text2={'CART'} />
              <p className="text-gray-600 mt-2">
                {cartData.length} {cartData.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            {!isCartEmpty && (
              <button
                onClick={() => navigate('/products')}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Continue Shopping
              </button>
            )}
          </div>
        </div>

        {isCartEmpty ? (
          /* Empty Cart State */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
              <button
                onClick={() => navigate('/collection')}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Items in Cart</h3>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartData.map((item, index) => {
                    const productData = products.find((p) => p._id === item._id);
                    if (!productData) return null;

                    return (
                      <div key={`${item._id}-${item.size}-${index}`} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                        <div className="flex items-center space-x-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src={productData.image[0]}
                              alt={productData.name}
                              onError={(e) => {
                                e.target.src = '/placeholder-image.jpg'; // fallback image
                              }}
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-medium text-gray-900 truncate">
                              {productData.name}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              {currency}{productData.price.toFixed(2)} each
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <button
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-150 disabled:opacity-50"
                              onClick={() => removeFromCart(item._id, item.size)}
                              disabled={item.quantity <= 1}
                            >
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                              </svg>
                            </button>
                            
                            <span className="w-12 text-center font-medium text-gray-900">
                              {item.quantity}
                            </span>
                            
                            <button
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-150"
                              onClick={() => addToCart(item._id, item.size)}
                            >
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>

                          {/* Item Total & Delete */}
                          <div className="flex flex-col items-end space-y-2">
                            <p className="text-base font-semibold text-gray-900">
                              {currency}{(productData.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              className="text-red-500 hover:text-red-700 p-1 transition-colors duration-150"
                              onClick={() => deleteItemFromCart(item._id, item.size)}
                              title="Remove item"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Cart Total Section */}
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <CartTotal />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;