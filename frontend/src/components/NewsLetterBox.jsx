import React, { useState } from 'react';

const NewsLetterBox = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#d0ecff] via-[#86c5ff] to-[#3490dc] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
            Stay in the Loop
          </h2>

          <div className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold text-lg mb-6 shadow-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            Subscribe now & get 20% off your first order!
          </div>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Join thousands of fashion enthusiasts and be the first to discover exclusive collections,
            special offers, and style inspiration delivered straight to your inbox.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={onSubmitHandler} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-2xl border border-gray-300 shadow-lg">
              <input
                className="flex-1 w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 text-base"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-black text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:bg-gray-900 transform hover:-translate-y-1"
              >
                SUBSCRIBE
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">Welcome aboard! 🎉</h3>
              <p className="text-gray-700 mb-4">
                Thank you for subscribing! Check your email for your 20% discount code.
              </p>
              <div className="bg-black text-white px-4 py-2 rounded-lg font-bold inline-block">
                Your discount is on the way!
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsLetterBox;
