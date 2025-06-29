import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contex/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true); // default to true to test
  const [filterProduct, setFilterProducts] = useState(products || []);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortBy, setSortBy] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubcategory = (e) => {
    const value = e.target.value;
    setSubcategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const APPLYFILTER = () => {
    let productCopy = [...products];

    if (search) {
      productCopy = productCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }

    if (subcategory.length > 0) {
      productCopy = productCopy.filter(item => subcategory.includes(item.subCategory));
    }

    if (sortBy === 'low-high') {
      productCopy.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      productCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productCopy);
  };

  useEffect(() => {
    APPLYFILTER();
  }, [category, subcategory, sortBy, products, search, showSearch]);

  console.log('Filtered Products:', filterProduct);

  return (
    <div className='flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t'>
      {/* Sidebar */}
      <div className='min-w-[240px]'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2 select-none'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="dropdown"
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 rounded-md shadow-sm bg-white ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium text-blue-900'>CATEGORY</p>
          <div className='flex flex-col gap-3 text-sm font-light text-blue-800'>
            {['Women', 'Men', 'Kids'].map((cat) => (
              <label key={cat} className='inline-flex items-center cursor-pointer gap-2 select-none'>
                <input
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  className="w-5 h-5"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 rounded-md shadow-sm bg-white ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium text-blue-900'>TYPE</p>
          <div className='flex flex-col gap-3 text-sm font-light text-blue-800'>
            {['Topwear', 'Winterwear', 'Bottomwear'].map((type) => (
              <label key={type} className='inline-flex items-center cursor-pointer gap-2 select-none'>
                <input
                  type="checkbox"
                  value={type}
                  onChange={toggleSubcategory}
                  className="w-5 h-5"
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4 items-center'>
          <Title text1={'All '} text2={'COLLECTION'} />

          {/* Sort Dropdown */}
          <select
            className='border-2 border-blue-400 text-blue-900 rounded-md px-3 py-1 text-sm cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                       transition-shadow duration-200'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProduct.length === 0 ? (
            <p className='col-span-full text-center text-gray-500'>No products found.</p>
          ) : (
            filterProduct.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
