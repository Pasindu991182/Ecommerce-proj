import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div className="bg-sky-50 min-h-screen px-4 py-10 sm:px-10">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* ABOUT US SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <Title text1="ABOUT" text2="US" />
            <p className="text-gray-700 text-lg leading-relaxed">
              We are dedicated to providing a seamless and enjoyable shopping experience. With a strong focus on quality, customer satisfaction, and timely service, our store brings you the best products across various categories. Whether you're shopping for essentials or gifts, we’re here to make it effortless and enjoyable.
            </p>
          </div>
          <div className="flex-1">
            <img
              src={assets.about_img}
              alt="About Us"
              className="w-full rounded-lg shadow-md object-cover"
            />
          </div>
        </div>

        {/* WHY CHOOSE US SECTION */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Title text1="WHY" text2="CHOOSE US" />
          <ul className="grid sm:grid-cols-2 gap-6 text-gray-700 text-base mt-4">
            <li className="flex items-start gap-3">
              <span className="text-blue-700 font-bold text-xl">✔</span>
              Premium quality products at great value.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-700 font-bold text-xl">✔</span>
              Timely delivery and real-time tracking.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-700 font-bold text-xl">✔</span>
              24/7 responsive customer support.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-700 font-bold text-xl">✔</span>
              Secure payment methods and privacy protection.
            </li>
          </ul>
        </div>

        {/* OUR MISSION SECTION */}
        <div className="bg-blue-100 p-6 rounded-xl shadow-md">
          <Title text1="OUR" text2="MISSION" />
          <p className="text-gray-800 text-lg leading-relaxed">
            Our mission is to bridge the gap between premium products and customers around the world. We believe in quality, trust, and innovation. Our aim is to continuously evolve, bringing the most convenient and customer-focused online shopping experience while fostering long-term relationships with our customers.
          </p>
        </div>
      </div> 
      <div className='mt-10'>
        <NewsletterBox />
      </div>
    </div>
  );
};

export default About;
