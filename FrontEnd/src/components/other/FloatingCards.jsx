import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, User, Star, Award, MessageCircle, Code, Brush } from 'lucide-react';
import { Link } from 'react-router-dom'

const AnimatedServiceCards = () => {
  const colors = {
    primary: '#FF6B35', // Orange
    secondary: '#2B2D42', // Black
    background: '#FFFFFF', // White
  }

  

  const services = [
    {
      icon: BookOpen,
      title: 'Academic Tuitions',
      description: 'Comprehensive academic support across all boards, subjects, and standards. Designed to strengthen foundational knowledge and ensure academic excellence.',
      delay: 0,
      navigationlink: '/academic',
    },
    {
      icon: User,
      title: 'General Knowledge',
      description: 'Interactive sessions designed to expand young minds with everything about everything, covering fun and engaging topics for children of various age groups.',
      delay: 0.2,
      navigationlink: '/gk',
    },
    {
      icon: MessageCircle,
      title: 'English Grammar, Creative Writing, Public Speaking',
      description: 'Improve English skills with programs that include grammar, creative writing, and public speaking, tailored for different age groups to foster confidence and articulation.',
      delay: 0.4,
      navigationlink: '/english-advanced',
    },
    {
      icon: Star,
      title: 'Logical Reasoning ',
      description: 'Fun and engaging activities to strengthen logical reasoning and mental math skills, fostering problem-solving abilities',
      delay: 0.6,
      navigationlink: '/logical-reasoning',
    },
    {
      icon: Brush,
      title: 'Art & Crafts',
      description: 'Explore creativity with various art styles taught by an experienced JJ Arts veteran, offering sessions from beginner to advanced levels.',
      delay: 0.8,
      navigationlink: '/art-craft',
    },
    {
      icon: Code,
      title: 'Coding & Games',
      description: 'Specialized coding classes in C, C++, Java, Scratch, and Python, tailored to individual learning levels to develop programming skills.',
      delay: 1,
      navigationlink: '/academic',
    },
  ];


  return (
    <div className="w-full py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
          {services.map((service, index) => (
            <Link to={service.navigationlink}>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: service.delay,
                ease: "easeOut"
              }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
                className="bg-white rounded-2xl p-8 h-full border border-gray-100 shadow-2xl"
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-6"
                >
                  <service.icon 
                    size={32}
                    style={{ color: colors.primary }}
                  />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: service.delay + 0.3 }}
                >
                  <h3 
                    className="text-2xl font-bold mb-4"
                    style={{ color: colors.secondary }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <motion.a
                    href="#"
                    className="inline-flex items-center font-semibold"
                    style={{ color: colors.primary }}
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </motion.div>

                {/* Background Decoration */}
                <motion.div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5"
                  style={{ background: colors.primary }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
            
          </Link>
          ))}

        </div>
      </div>
    </div>
  )
}

export default AnimatedServiceCards