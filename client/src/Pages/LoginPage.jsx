import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Loader, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = false;
  
  const handleLogin = () => {
    e.preventDefault();
  };
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl
  overflow-hidden"
  >
    <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome Back !  <span className='text-black'>{"🤗"}</span>
        </h2>
        <form onSubmit={handleLogin}>
         

          <Input
            Icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            Icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center mb-6">
            <Link to= '/forgot-password' className='text-sm text-green-400 hover:underline '>Forgot password?</Link>

          </div>
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500  to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-green-700  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto'/> : "Login"} 
          </motion.button>
        </form>
    </div>
    
    <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center" >
        <p className="text-sm text-gray-400" >
            Don&apos;t have an account? {" "}
            <Link to={"/signup"} className="text-green-400 hover:underline transition duration-500">Signup</Link>
        </p>
      </div>
  </motion.div>
  )
}

export default LoginPage