import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contex/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [currentState, setCurrentState] = useState('Sign Up');

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          toast.success("Registration successful!");
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          navigate('/');
        } else {
          toast.error(response.data.message || "Registration failed.");
        }

      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          toast.success("Login successful!");
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          navigate('/');
        } else {
          toast.error(response.data.message || "Login failed.");
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <div className="text-center">
          <p className="text-2xl font-semibold text-blue-900">{currentState}</p>
          <hr className="mt-2 border-gray-300" />
        </div>

        {currentState === 'Sign Up' && (
          <input
            type="text"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-blue-50 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-900"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-blue-50 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-900"
        />

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded-md font-semibold hover:bg-blue-950 transition"
        >
          {currentState}
        </button>

        <div className="text-center text-sm mt-2">
          <p className="text-gray-600 cursor-pointer hover:underline">
            Forgot your password?
          </p>

          {currentState === 'Login' ? (
            <p
              className="text-blue-800 font-medium hover:underline cursor-pointer mt-1"
              onClick={() => setCurrentState('Sign Up')}
            >
              Create Account
            </p>
          ) : (
            <p
              className="text-blue-800 font-medium hover:underline cursor-pointer mt-1"
              onClick={() => setCurrentState('Login')}
            >
              Login here
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
