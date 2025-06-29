import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-4 items-center mb-6'>
      <p className='text-2xl sm:text-3xl font-semibold text-gray-600'>
        {text1}
        <span className='text-gray-800'>{text2}</span>
      </p>
      <p className='w-10 sm:w-14 h-[2px] sm:h-[3px] bg-gray-800'></p>
    </div>
  );
};

export default Title;
