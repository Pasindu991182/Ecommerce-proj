import React, { useState, useContext } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { ShopContext } from '../contex/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [isLoading, setIsLoading] = useState(false);
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    currency,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(products.find((p) => p._id === itemId));
            if (!itemInfo) {
              console.warn('Item not found for ID:', itemId);
              continue;
            }
            itemInfo.size = size;
            itemInfo.quantity = cartItems[itemId][size];
            orderItems.push(itemInfo);
          }
        }
      }

      const amount = await getCartAmount();

      const orderData = {
        address: formData,
        items: orderItems,
        amount: amount + delivery_fee,
      };

      switch (method.toLowerCase()) {
        case 'cod': {
          const response = await axios.post(
            backendUrl + '/api/order/place',
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            toast.success('Order placed successfully!');
            navigate('/orders');
          } else {
            toast.error(response.data.message || 'Failed to place order.');
          }
          break;
        }

        case 'stripe': {
          const response = await axios.post(
            backendUrl + '/api/order/stripe',
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            window.location.href = response.data.session_url;
          } else {
            toast.error(response.data.message || 'Stripe payment failed.');
          }
          break;
        }

        default:
          toast.error('Unsupported payment method.');
          break;
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Something went wrong while placing the order.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate totals for display
  const getSubtotal = async () => {
    const cartAmount = await getCartAmount();
    return cartAmount;
  };

  const getTotal = async () => {
    const cartAmount = await getCartAmount();
    return cartAmount + delivery_fee;
  };

  // Use state to store calculated values
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // Calculate totals on component mount
  React.useEffect(() => {
    const calculateTotals = async () => {
      const sub = await getCartAmount();
      setSubtotal(sub);
      setTotal(sub + delivery_fee);
    };
    calculateTotals();
  }, [cartItems, delivery_fee, getCartAmount]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Title text1="CHECKOUT " text2="DETAILS" />
              <p className="text-gray-600 mt-2">Complete your order information</p>
            </div>
            <button
              onClick={() => navigate('/cart')}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Cart</span>
            </button>
          </div>
        </div>

        <form onSubmit={onSubmitHandler}>
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Delivery Information - 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8 lg:mb-0">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Delivery Information</span>
                  </h3>
                </div>

                <div className="p-6 space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Personal Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          required
                          onChange={onChangeHandler}
                          name="firstName"
                          value={formData.firstName}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          type="text"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          required
                          onChange={onChangeHandler}
                          name="lastName"
                          value={formData.lastName}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          type="text"
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Contact Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          required
                          onChange={onChangeHandler}
                          name="email"
                          value={formData.email}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          type="email"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          required
                          onChange={onChangeHandler}
                          name="phone"
                          value={formData.phone}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          type="tel"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Delivery Address</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address *
                        </label>
                        <input
                          required
                          onChange={onChangeHandler}
                          name="street"
                          value={formData.street}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                          type="text"
                          placeholder="Enter street address"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City *
                          </label>
                          <input
                            required
                            onChange={onChangeHandler}
                            name="city"
                            value={formData.city}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                            type="text"
                            placeholder="Enter city"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            State *
                          </label>
                          <input
                            required
                            onChange={onChangeHandler}
                            name="state"
                            value={formData.state}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                            type="text"
                            placeholder="Enter state"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code *
                          </label>
                          <input
                            required
                            onChange={onChangeHandler}
                            name="zipcode"
                            value={formData.zipcode}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                            type="text"
                            placeholder="Enter ZIP code"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country *
                          </label>
                          <input
                            required
                            onChange={onChangeHandler}
                            name="country"
                            value={formData.country}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                            type="text"
                            placeholder="Enter country"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary & Payment - 1 column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Payment Methods */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>Payment Method</span>
                  </h3>
                </div>

                <div className="p-6 space-y-3">
                  {[
                    { 
                      key: 'stripe', 
                      label: 'Credit/Debit Card',
                      icon: <img className="h-6" src={assets.stripe_logo} alt="Stripe" />,
                      description: 'Secure payment via Stripe'
                    },
                    { 
                      key: 'cod', 
                      label: 'Cash on Delivery',
                      icon: <span className="text-2xl">💵</span>,
                      description: 'Pay when you receive your order'
                    },
                  ].map(({ key, label, icon, description }) => (
                    <div key={key} className="relative">
                      <input
                        type="radio"
                        id={key}
                        name="payment"
                        checked={method === key}
                        onChange={() => setMethod(key)}
                        className="sr-only"
                      />
                      <label
                        htmlFor={key}
                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          method === key 
                            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="flex-shrink-0">
                            {icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{label}</div>
                            <div className="text-sm text-gray-500">{description}</div>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                          method === key 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300'
                        }`}>
                          {method === key && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
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
              </div>

              {/* Place Order Button */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center px-6 py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Place Order
                    </>
                  )}
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;