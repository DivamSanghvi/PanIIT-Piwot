import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AadhaarSignup = () => {
  const [step, setStep] = useState('upload');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setStep('loading');

    // Simulating API call
    setTimeout(() => {
      setStep('verified');
    }, 3000);
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
            Aadhaar Signup
          </motion.h1>

          <AnimatePresence mode="wait">
            {step === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-center mb-6 text-gray-600">Please upload a clear photo of your Aadhaar card</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-orange-300 border-dashed rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100 transition-colors duration-300">
                      {preview ? (
                        <img src={preview || "/placeholder.svg"} alt="Aadhaar Preview" className="w-full h-full object-contain" />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-10 h-10 mb-3 text-orange-400" />
                          <p className="mb-2 text-sm text-orange-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-orange-500">PNG, JPG or PDF (MAX. 5MB)</p>
                        </div>
                      )}
                      <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*,application/pdf" />
                    </label>
                  </div>
                  {file && (
                    <p className="text-sm text-gray-500 text-center">
                      Selected file: {file.name}
                    </p>
                  )}
                  <motion.button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!file}
                  >
                    Verify Aadhaar
                  </motion.button>
                </form>
              </motion.div>
            )}

            {step === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <motion.div
                  className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <h2 className="text-xl font-semibold text-orange-600 mb-2">Verifying Your Aadhaar</h2>
                <p className="text-gray-600">Please wait while we process your information...</p>
              </motion.div>
            )}

            {step === 'verified' && (
              <motion.div
                key="verified"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Check className="w-8 h-8 text-green-500" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-green-600 mb-2">Aadhaar Verified!</h2>
                  <p className="text-gray-600">Your Aadhaar information has been successfully verified.</p>
                </div>
                <motion.button
      className="w-full mt-6 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        setStep('upload'); // Update step
        navigate('/details'); // Navigate to "/details"
      }}
    >
      Proceed to Next Step
    </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AadhaarSignup;

