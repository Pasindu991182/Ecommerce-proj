
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = "LKR";
const deliveryCharge = 10;

//gateway intitialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing order COD 
const PlaceOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Razorpay & Stripe placeholder


const PlaceOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    // Step 1: Create order in DB
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData); // ✅ creates order in DB
    await newOrder.save(); // ✅ save order before creating Stripe session

    // ✅ Step 2: Create line items for Stripe (price in cents)
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency, // ✅ use currency constant (e.g., "usd")
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // ✅ convert to smallest currency unit
      },
      quantity: item.quantity,
    }));

    // ✅ Add delivery charge as a separate item
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: deliveryCharge * 100, // ✅ $10 delivery fee
      },
      quantity: 1,
    });

    // ✅ Step 3: Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`, // ✅ fixed success URL
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`, // ✅ fixed cancel URL (was incorrect before)
      line_items,
      mode: 'payment',
    });

    // ✅ Step 4: Send Stripe checkout session URL to frontend
    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Verify Stripe

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  if (!orderId || !userId) {
    return res.json({ success: false, message: "Missing orderId or userId" });
  }

  try {
    if (success === 'true') {
      const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { payment: true });

      if (!updatedOrder) {
        return res.json({ success: false, message: "Order not found" });
      }

      // Clear cart from backend (DB)
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      return res.json({ success: true, message: "Payment verified" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment failed, order deleted" });
    }
  } catch (error) {
    console.error("Stripe verification error:", error);
    return res.json({ success: false, message: "Server error during verification" });
  }
};


const PlaceOrderRazorpay = async (req, res) => {};

// Admin: Fetch all orders
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User: Fetch user orders
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Admin: Update order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Order ID and new status are required" });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated successfully", order: updatedOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  PlaceOrder,
  PlaceOrderRazorpay,
  PlaceOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe
};
