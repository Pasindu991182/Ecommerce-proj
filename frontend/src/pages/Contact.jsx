import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsLetterBox';

const Contact = () => {
  return (
    <div className="bg-sky-50 min-h-screen py-10 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Title */}
        <div>
          <Title text1={'CONTACT '} text2={'US'} />
        </div>

        {/* Contact Section */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">

          {/* Contact Image */}
          <div className="flex-1">
            <img
              src={assets.pasindu}
              alt="Contact Us"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>

          {/* Store Info */}
          <div className="flex-1 bg-white shadow-md p-6 rounded-xl space-y-5 text-gray-800">
            <h3 className="text-xl font-semibold text-blue-800">Our Stores</h3>
            <p className="text-base">
              <strong>country road</strong><br />
              82, Kumaratunga Road, Matara
            </p>

            <h4 className="font-semibold mt-4">Contact</h4>
            <p>📞 Tel: 041 22 32218</p>
            <p>📧 Email: pasindughp@gmail.com</p>

            <h4 className="font-semibold mt-4">Careers at Forever</h4>
            <p>We're hiring! Join our growing team of passionate individuals.</p>
            <button className="mt-2 bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
              Explore Jobs
            </button>
          </div>
        </div>

        {/* Newsletter Box */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <NewsletterBox />
        </div>
      </div>
    </div>
  );
};

export default Contact;
