import React, { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const FarmerLogin = () => {
  const navigate =useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  })
  const [user, setUser] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        formData,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,  // Required for session cookies
        }
    );
      setSuccess("Logged in successfully!")
      setUser(response.data.farmer)
      console.log("Login successful:", response.data)
      navigate("/")
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during login.")
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-white p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden my-32">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">Farmer Login</h1>

          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </motion.div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-red-600 text-center">
              {error}
            </motion.p>
          )}

          {success && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-green-600 text-center">
              {success}
            </motion.p>
          )}

          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-gray-100 rounded-md"
            >
              <h2 className="text-xl font-semibold mb-2">Welcome, {user.fullname.firstname}!</h2>
              <p className="text-sm text-gray-600">Phone: {user.phoneNumber}</p>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FarmerLogin

