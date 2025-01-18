'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Users, Calendar, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import picture from "../../../Temp/portrait-cheerful-young-girl-holding-books.jpg"
export default function WhyUrja() {
  const [hoveredBenefit, setHoveredBenefit] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const heroImageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-20 sm:py-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[#FF6B00] opacity-5 mix-blend-multiply" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Why Choose{' '}
                <motion.span
                  initial={{ color: '#FFFFFF' }}
                  animate={{ color: '#FF6B00' }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  URJA
                </motion.span>{' '}
                Talents?
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                We all know the benefits and need of extra tutoring. With classroom flooded with 20-40 students, 
                tuition has become something very necessary for us all.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-10 flex items-center gap-x-6"
              >
                <motion.a
                  href="#benefits"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-[#FF6B00] px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FF8533] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B00] transition-all duration-200"
                >
                  Explore Benefits
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative mt-4 lg:mt-0"
            >
              <motion.img
                variants={heroImageVariants}
                whileHover="hover"
                src={picture}
                alt="Education Illustration"
                className="relative z-10 rounded-xl bg-gray-900 shadow-xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -top-4 -right-4 h-full w-full rounded-xl bg-[#FF6B00]"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-14 sm:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-7xl px-6 lg:px-8"
        >
          <motion.div
            variants={itemVariants}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our HIGH-lights
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover what makes URJA Talents the perfect choice for your educational journey
            </p>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                onHoverStart={() => setHoveredBenefit(index)}
                onHoverEnd={() => setHoveredBenefit(null)}
                className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <div className="relative flex-1 px-6 pt-16 pb-8">
                  <motion.div
                    animate={{
                      rotate: hoveredBenefit === index ? 360 : 0
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 inline-block -translate-y-1/2 transform rounded-xl bg-[#FF6B00] p-5 shadow-lg"
                  >
                    <benefit.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold leading-7 text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-6 text-base leading-7 text-gray-600">
                    {benefit.description}
                  </p>
                </div>
                <div className="mt-auto flex border-t border-gray-200">
                  <motion.a
                    href={benefit.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-2 px-6 py-4 text-sm font-medium text-[#FF6B00] hover:text-[#FF8533] transition-colors duration-200"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-7xl px-6 lg:px-8"
        >
          <motion.div
            variants={itemVariants}
            className="mx-auto max-w-2xl lg:text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to excel
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At URJA, we provide comprehensive support for your educational journey
            </p>
          </motion.div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="flex flex-col"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="h-5 w-5 flex-none text-[#FF6B00]" />
                    </motion.div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </motion.div>
      </section>

      
    </div>
  )
}

const benefits = [
  {
    title: 'Your All-in-One Stop',
    description: 'We mentor, coach and motivate students to excel academically & overall. Our skilled tutors teach all standards and subjects across boards.',
    icon: GraduationCap,
    href: '#',
  },
  {
    title: 'Personalized Attention',
    description: 'We believe every child is different. We provide one-on-one or small group classes for personalized attention and better learning outcomes.',
    icon: Users,
    href: '#',
  },
  {
    title: 'Best Tutor Match',
    description: 'Our teachers are filtered according to Experience, Skills, Knowledge as per your exact requirements. You choose the teacher that best fits your needs.',
    icon: CheckCircle,
    href: '#',
  },
]

const features = [
  {
    name: 'Regular PTMA Meets',
    description: 'We conduct regular Parent-Teacher-Management-Association meets for assessments, progress discussions, and improvement suggestions.',
    icon: Calendar,
  },
  {
    name: 'Pay-Per-Hour System',
    description: 'We charge hour-wise, not subject-wise or board-wise. This makes our pricing transparent and cost-effective for you.',
    icon: Clock,
  },
  {
    name: 'Comprehensive Support',
    description: 'From academic tutoring to competitive exam preparation, we provide complete educational support under one roof.',
    icon: CheckCircle,
  },
]


