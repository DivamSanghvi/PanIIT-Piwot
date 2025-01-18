import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLeaf, FaCloudUploadAlt, FaMicroscope, FaShieldAlt } from 'react-icons/fa'
import PlantDiseaseHero from '../components/other/FarmerHero'

const EnhancedPlantDiseaseAnalyzer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleAnalyze = async () => {
    if (!file) return
    setIsModalOpen(false)
    setIsAnalyzing(true)
    // Simulating API call
    setTimeout(() => {
      setIsAnalyzing(false)
      setResults({
        disease: "Frog-eye Leaf Spot (Cercospora Leaf Spot)",
        confidence: 95,
        description: "Frog-eye leaf spot is a fungal disease caused by the fungus Cercospora sojina. It's characterized by small, reddish-brown to dark brown lesions that develop on leaves, stems, and pods. These lesions often have a lighter, yellowish-green halo around them, giving them a \"frog-eye\" appearance. As the disease progresses, lesions enlarge, coalesce (merge), and may cause leaf defoliation. Severe infections can significantly reduce soybean yield and quality.",
        cause: "The cause is the fungal pathogen Cercospora sojina. The fungus survives in infected plant debris in the soil over the winter, and spores are then spread by wind and rain splash to healthy plants during the growing season. Warm, humid conditions favor disease development.",
        solutions: [
          { title: "Crop Rotation", description: "Rotate soybeans with non-host crops for at least 2-3 years to disrupt the fungal life cycle." },
          { title: "Residue Management", description: "Properly till or incorporate infected crop debris into the soil to promote decomposition and reduce inoculum levels." },
          { title: "Weed Control", description: "Weeds can harbor the fungus, so good weed management is important." },
          { title: "Planting Date", description: "Planting at the recommended time for your region can reduce disease severity." },
          { title: "Chemical Control", description: "Fungicide application is most effective as a preventative measure or early in the disease's progression." }
        ],
        precautions: [
          "Plant resistant soybean varieties",
          "Use certified, disease-free seed",
          "Regularly scout fields for signs of frog-eye leaf spot",
          "Clean equipment after working in infected fields"
        ]
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
        <PlantDiseaseHero/>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Protect Your Harvest
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-white"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              ..............
            </motion.p>
            <motion.button
              className="bg-white text-orange-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-100 transition-colors duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
            >
              Analyze Your Crop
            </motion.button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#fff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: FaLeaf, title: "Identify Symptoms", description: "Take a clear photo of the affected plant part" },
              { icon: FaCloudUploadAlt, title: "Upload Image", description: "Securely upload the image to our AI system" },
              { icon: FaMicroscope, title: "AI Analysis", description: "Our advanced AI analyzes the image for diseases" },
              { icon: FaShieldAlt, title: "Get Solutions", description: "Receive tailored treatment recommendations" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <feature.icon className="mx-auto text-5xl text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* File Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Upload Plant Image</h2>
              <p className="mb-4 text-gray-600">Take a clear, close-up photo of the affected plant part for the most accurate analysis.</p>
              <input 
                type="file" 
                onChange={handleFileChange}
                className="mb-4 w-full p-2 border border-gray-300 rounded"
              />
              <div className="flex justify-end">
                <button 
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-300 transition-colors duration-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-300"
                  onClick={handleAnalyze}
                >
                  Analyze
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Animation */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <motion.div 
                className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Analyzing Your Crop</h2>
              <p className="text-gray-600">Our AI is examining the image for signs of disease...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Display */}
      <AnimatePresence>
        {results && (
          <motion.section 
            className="py-16 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Analysis Results</h2>
              <div className="bg-orange-50 p-6 rounded-lg shadow-lg mb-8">
                <div className="flex items-center mb-4">
                  <img src="/placeholder.svg?height=100&width=100" alt="Disease Image" className="w-16 h-16 rounded-full mr-4" />
                  <div>
                    <h3 className="text-2xl font-semibold text-orange-600">{results.disease}</h3>
                    <p className="text-gray-600">Confidence: {results.confidence}%</p>
                  </div>
                </div>
                <p className="mb-4 text-gray-700">{results.description}</p>
                <h4 className="text-xl font-semibold mb-2 text-gray-900">Probable Cause:</h4>
                <p className="mb-4 text-gray-700">{results.cause}</p>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Treatment Plan</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {results.solutions.map((solution, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white p-4 rounded-lg shadow border border-orange-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h4 className="text-lg font-semibold mb-2 text-orange-600">{solution.title}</h4>
                    <p className="text-gray-700">{solution.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Future Precautions</h3>
              <ul className="list-disc pl-5 mb-8">
                {results.precautions.map((precaution, index) => (
                  <motion.li 
                    key={index}
                    className="text-gray-700 mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {precaution}
                  </motion.li>
                ))}
              </ul>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-semibold">Important Note:</p>
                <p className="text-blue-700">This analysis is based on visual observation. For a definitive diagnosis, it's always recommended to submit a sample to a plant diagnostic clinic or a local extension office for confirmation and specific treatment recommendations.</p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Protect Your Crops Today</h2>
          <p className="text-xl mb-8">Don't let plant diseases affect your yield. Start using our AI-powered analysis tool now.</p>
          <motion.button
            className="bg-white text-orange-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-100 transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
          >
            Analyze Your Crop
          </motion.button>
        </div>
      </section>
    </div>
  )
}

export default EnhancedPlantDiseaseAnalyzer