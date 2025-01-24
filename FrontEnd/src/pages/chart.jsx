// import React, { useMemo } from "react"
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
// import { motion } from "framer-motion"

// const WeatherChart = ({ data, field }) => {
//   const chartData = useMemo(() => {
//     return data.list.map((item) => ({
//       time: new Date(item.dt * 1000).toLocaleString(),
//       [field]: item.main[field] || item.wind[field] || item[field],
//     }))
//   }, [data, field])

//   const getColor = (field) => {
//     const colors = {
//       humidity: "#3498db",
//       temp: "#e74c3c",
//       pressure: "#2ecc71",
//       speed: "#f39c12",
//       default: "#9b59b6",
//     }
//     return colors[field] || colors.default
//   }

//   const color = getColor(field)

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white rounded-lg shadow-lg p-6 mb-8"
//     >
//       <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//         {field.charAt(0).toUpperCase() + field.slice(1)} Chart
//       </h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//           <XAxis
//             dataKey="time"
//             stroke="#333"
//             tick={{ fill: "#333", fontSize: 12 }}
//             tickFormatter={(time) => new Date(time).toLocaleDateString()}
//           />
//           <YAxis stroke="#333" tick={{ fill: "#333", fontSize: 12 }} />
//           <Tooltip
//             contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "4px" }}
//             labelStyle={{ color: "#333", fontWeight: "bold" }}
//           />
//           <Legend />
//           <defs>
//             <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor={color} stopOpacity={0.8} />
//               <stop offset="95%" stopColor={color} stopOpacity={0} />
//             </linearGradient>
//           </defs>
//           <Line
//             type="monotone"
//             dataKey={field}
//             stroke={color}
//             strokeWidth={3}
//             dot={{ r: 4, fill: color }}
//             activeDot={{ r: 8 }}
//           />
//           <motion.rect
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.1 }}
//             transition={{ duration: 1, delay: 0.5 }}
//             x="0%"
//             y="0"
//             width="100%"
//             height="100%"
//             fill="url(#colorGradient)"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </motion.div>
//   )
// }

// export default WeatherChart



import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

const WeatherChart = ({ data, field }) => {
  if (!data || !data.list) return null

  const chartData = data.list.map((item) => ({
    time: new Date(item.dt * 1000).toLocaleString(),
    [field]: item.main[field] || item.wind[field] || item[field],
  }))

  const getColor = (field) => {
    const colors = {
      humidity: "#3498db",
      temp: "#e74c3c",
      pressure: "#2ecc71",
      speed: "#f39c12",
    }
    return colors[field] || "#9b59b6"
  }

  const color = getColor(field)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {field.charAt(0).toUpperCase() + field.slice(1)} Chart
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="time"
            stroke="#333"
            tick={{ fill: "#333", fontSize: 12 }}
            tickFormatter={(time) => new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          />
          <YAxis stroke="#333" tick={{ fill: "#333", fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "4px" }}
            labelStyle={{ color: "#333", fontWeight: "bold" }}
          />
          <Legend />
          <defs>
            <linearGradient id={`colorGradient-${field}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey={field}
            stroke={color}
            strokeWidth={3}
            dot={{ r: 4, fill: color }}
            activeDot={{ r: 8 }}
          />
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1, delay: 0.5 }}
            x="0%"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#colorGradient-${field})`}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export default WeatherChart

