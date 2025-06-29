import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudnary.js';
import userRouter from './routes/userRoutes.js';
import producrRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoute.js';

//Apconfig
const app = express();
const port = process.env.PORT || 4000

connectDB();
connectCloudinary();

//midleware
app.use(express.json())
app.use(cors())

//api endpoint
app.use('/api/user',userRouter)
app.use('/api/product',producrRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>console.log('Server Started on PORT : ' + port));
