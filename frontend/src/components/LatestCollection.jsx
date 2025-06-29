import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../contex/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';



const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestproduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 16));
  }, [products]);

  return (
    <div className='my-14 px-4 sm:px-[5vw] py-16 bg-gradient-to-br from-[#eaf5ff] via-[#f6fbff] to-white rounded-3xl shadow-md'>

      {/* Section Title */}
      <div className='text-center mb-10'>
        <Title text1='NEW' text2=' ARRIVALS' />
        <p className='w-full max-w-2xl mx-auto mt-4 text-base text-gray-600 leading-relaxed'>
          Explore our curated selection of stylish, sustainable, and seasonal clothing for all ages. 
          From everyday essentials to standout statement pieces — upgrade your wardrobe today.
        </p>
      </div>

      {/* Product Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
        {latestproduct.map(product => (
          <div key={product._id} className='hover:scale-[1.02] transition-transform duration-300 ease-in-out'>
            <ProductItem
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
