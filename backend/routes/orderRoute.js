import express from 'express'
import {PlaceOrder,PlaceOrderRazorpay,PlaceOrderStripe,allOrders,userOrders,updateStatus, verifyStripe} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

//Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payement features
orderRouter.post('/place',authUser,PlaceOrder)
orderRouter.post('/stripe',authUser,PlaceOrderStripe)
orderRouter.post('/razorpay',authUser,PlaceOrderRazorpay)

//user features
orderRouter.post('/userorders',authUser,userOrders)

//verifypayment
orderRouter.post('/verifyStripe',authUser,verifyStripe)
export default orderRouter