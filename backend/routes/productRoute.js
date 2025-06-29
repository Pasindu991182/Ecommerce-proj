import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';


const producrRouter = express.Router();

producrRouter.post('/add',adminAuth ,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]), addProduct); 
producrRouter.post('/remove',adminAuth,removeProduct);
producrRouter.post('/single',singleProduct);
producrRouter.get('/list',listProduct)


export default producrRouter;
