import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FarmerLogin = () => {
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const navigate = useNavigate()
  const validateForm = () => {
    let errors = {};
    if (!loginData.identifier) errors.identifier = "Phone number or Aadhaar number is required";
    if (!loginData.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsLoggingIn(true);
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoggingIn(false);
      setLoginSuccess(true);
    }
  };

  const inputVariants = {
    focus: { scale: 1.05, transition: { type: 'spring', stiffness: 300 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-white text-black font-sans py-12 px-4">
      <motion.div 
        className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8">
          <motion.h1 
            className="text-3xl font-bold text-center text-orange-600 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Farmer Login
          </motion.h1>

          <AnimatePresence mode="wait">
            {!loginSuccess ? (
              <motion.form
                key="loginForm"
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div className="relative" variants={inputVariants}>
                  <label htmlFor="identifier" className="text-sm font-medium text-gray-700 block mb-1">
                    Phone Number / Aadhaar Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="identifier"
                      name="identifier"
                      value={loginData.identifier}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 pl-10 border ${errors.identifier ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      placeholder="Enter phone or Aadhaar number"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                  {errors.identifier && (
                    <motion.p 
                      className="text-red-500 text-xs mt-1 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle size={12} className="mr-1" /> {errors.identifier}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div className="relative" variants={inputVariants}>
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 pl-10 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      placeholder="Enter your password"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                  {errors.password && (
                    <motion.p 
                      className="text-red-500 text-xs mt-1 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle size={12} className="mr-1" /> {errors.password}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                      Forgot your password?
                    </a>
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    'Log In'
                  )}
                </motion.button>

                <motion.p 
                  className="text-center text-sm text-gray-600 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Don't have an account?{' '}
                  <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                    Sign up
                  </a>
                </motion.p>
              </motion.form>
            ) : (
              <motion.div
                key="loginSuccess"
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <User className="w-8 h-8 text-green-500" />
                </motion.div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Login Successful!</h2>
                <p className="text-gray-600 mb-6">Welcome back to your farmer dashboard.</p>
                <motion.button
                  className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {navigate('/');}}
                >
                  Home Page
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default FarmerLogin;

