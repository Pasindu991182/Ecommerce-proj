import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../contex/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { backendUrl, token, setCartItems } = useContext(ShopContext);

  useEffect(() => {
    const verifyStripePayment = async () => {
      const query = new URLSearchParams(location.search);
      const success = query.get('success');
      const orderId = query.get('orderId');

      if (!orderId || !success) {
        toast.error('Invalid payment verification request.');
        navigate('/');
        return;
      }

      try {
        const response = await axios.post(
          `${backendUrl}/api/order/verifyStripe`,
          { success, orderId, userId: localStorage.getItem('userId') }, // or use userId from token decoded
          { headers: { token } }
        );

        if (response.data.success) {
          setCartItems({});
          localStorage.removeItem('cartItems');
          toast.success('✅ Payment successful! Order confirmed.');
          navigate('/orders');
        } else {
          toast.error('❌ Payment failed or cancelled.');
          navigate('/');
        }
      } catch (error) {
        console.error('Stripe verification failed:', error);
        toast.error('⚠️ Verification error. Please contact support.');
        navigate('/');
      }
    };

    verifyStripePayment();
  }, [location.search, backendUrl, token, setCartItems, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg font-semibold text-blue-700">Verifying your payment...</p>
    </div>
  );
};

export default Verify;
