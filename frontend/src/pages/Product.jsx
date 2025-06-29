import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../contex/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';


const Product = () => {
  const { productID } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState(''); // Selected size state

  // Load product details when productID or products change
  useEffect(() => {
    const product = products.find((item) => item._id === productID);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
      setSize(''); // Reset size selection on product change
    }
  }, [productID, products]);

  // Toggle size selection: deselect if same size clicked again
  const handleSizeClick = (clickedSize) => {
    if (clickedSize === size) {
      setSize(''); // Deselect if clicked again
    } else {
      setSize(clickedSize); // Select new size
    }
  };

  if (!productData) return <div className='opacity-0'></div>;

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500'>
      {/* Product Section */}
      <div className='flex gap-12 flex-col sm:flex-row'>
        {/* Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt={`Thumbnail ${index}`}
              />
            ))}
          </div>
          <img
            src={image}
            alt={productData.name}
            className='w-full h-auto object-contain'
          />
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="dull star" className="w-3.5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>
            {currency}{productData.price}
          </p>
          <p>{productData.description}</p>

          {/* Size Selection */}
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSizeClick(item)} // Use toggle function
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? 'border-orange-500' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              if (!size) {
                toast.error("Please select a size before adding to cart");
                return;
              }
              addToCart(productData._id, size);
            }}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% original product</p>
            <p>Cash on Delivery on this product</p>
            <p>Easy Return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Explore breathtaking destinations with our expert travel planning services. Whether you're dreaming of a tropical escape or a cultural city tour, we help turn your journey into a memorable adventure.</p>
          <p>Our dedicated team ensures smooth booking, comfortable accommodations, and unique local experiences tailored to your preferences. Start your next journey with confidence and excitement.</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
