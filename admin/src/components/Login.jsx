import React, { useState } from 'react';
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password});
            if(response.data.success){
               setToken(response.data.token);
            }else{
              toast.error(response.data.message);
            }
            
            } catch (error) {
            console.error(error);
            toast.error('Login failed. Please try again.');
            }

    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-1">Email Address</p>
            <input
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="admin@gmail.com"
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
          </div>
          <div className="mb-6">
            <p className="text-sm text-gray-700 mb-1">Password</p>
            <input
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="............."
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
