import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contex/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 8));
  }, [products]);

  return (
    <div className='my-14 px-4 sm:px-[5vw] py-16 bg-gray-100 rounded-3xl shadow-md'>

      {/* Section Title */}
      <div className='text-center mb-10'>
        <Title text1='BEST ' text2='SELLERS' />
        <p className='w-full max-w-2xl mx-auto mt-4 text-base text-gray-600 leading-relaxed'>
          Step into style with our most-loved pieces! Our best sellers are customer favorites 
          for a reason — offering the perfect blend of comfort, quality, and trend-setting design.
        </p>
      </div>

      {/* Product Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
        {bestSeller.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
