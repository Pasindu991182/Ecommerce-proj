import React, { useContext } from 'react';
import { ShopContext } from '../contex/ShopContext';

const CartTotal = () => {
  const { getCartTotal, currency, delivery_fee, navigate } = useContext(ShopContext);

  const subtotal = getCartTotal() - delivery_fee;
  const total = getCartTotal();

  return (
    <div className="sticky top-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
        </div>

        {/* Summary Details */}
        <div className="p-6 space-y-4">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">
              {currency}{subtotal.toFixed(2)}
            </span>
          </div>

          {/* Delivery Fee */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <span className="text-gray-600">Delivery Fee</span>
              <div className="group relative">
                <svg className="w-4 h-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap">
                  Standard delivery
                </div>
              </div>
            </div>
            <span className="font-medium text-gray-900">
              {delivery_fee > 0 ? `${currency}${delivery_fee.toFixed(2)}` : 'Free'}
            </span>
          </div>

          <hr className="border-gray-200" />

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">
              {currency}{total.toFixed(2)}
            </span>
          </div>

          {/* Savings Badge (if applicable) */}
          {delivery_fee === 0 && subtotal > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-green-800">
                  You saved on delivery!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Checkout Button */}
        <div className="px-6 pb-6">
          <button
            onClick={() => navigate('/place-order')}
            className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Proceed to Checkout
          </button>
          
          {/* Security Badge */}
          <div className="flex items-center justify-center space-x-2 mt-4 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secure checkout</span>
          </div>
        </div>
      </div>

      {/* Additional Options */}
      <div className="mt-6 space-y-3">
        <button
          onClick={() => navigate('/cart')}
          className="w-full text-center text-gray-600 hover:text-gray-900 py-2 text-sm font-medium transition-colors duration-200"
        >
          ← Continue Shopping
        </button>
        
        {/* Promo Code Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-900">
              <span>Have a promo code?</span>
              <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Enter promo code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                Apply Code
              </button>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;