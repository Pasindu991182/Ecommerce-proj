import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Verify from './pages/Verify'

const App = () => {
  return (
    // 💠 App background theme aligned with Navbar (blue-white)
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-[#e0f7ff] via-[#f5fbff] to-white text-blue-900'>

      {/* Toast messages and Top section */}
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer />
        <Navbar />
        <SearchBar />
      </div>

      {/* Page content */}
      <main className='flex-grow px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pb-16'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productID' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
