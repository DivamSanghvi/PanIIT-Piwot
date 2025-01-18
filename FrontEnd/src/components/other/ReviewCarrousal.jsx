'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Twitter, Facebook, Instagram } from 'lucide-react'
import photo1 from "../../../Temp/smiling-businessman-face-portrait-wearing-suit.jpg"

// Sample testimonial data
const testimonials = [
  {
    name: 'Linda Anand',
    role: 'DESIGNER',
    rating: 2,
    text: 'Exceptional quality and professional approach. Would highly recommend to anyone seeking top-tier service.',
    avatar: {photo1},
    social: <Twitter className="h-5 w-5 text-[#1DA1F2]" />,
  },
  {
    name: 'David Gueta',
    role: 'ARTIST',
    rating: 5,
    text: 'Innovative solutions and outstanding support. The team went above and beyond to ensure satisfaction.',
    avatar: '/placeholder.svg?height=80&width=80',
    social: <Twitter className="h-5 w-5 text-[#1DA1F2]" />,
  },
  {
    name: 'Sarah Chen',
    role: 'DEVELOPER',
    rating: 5,
    text: 'Remarkable attention to detail and creative problem-solving. A truly exceptional experience.',
    avatar: '/placeholder.svg?height=80&width=80',
    social: <Instagram className="h-5 w-5 text-[#E4405F]" />,
  },
  {
    name: 'Michael Ross',
    role: 'ENTREPRENEUR',
    rating: 5,
    text: 'Outstanding service and incredible results. Couldn\'t be happier with the outcome.',
    avatar: '/placeholder.svg?height=80&width=80',
    social: <Facebook className="h-5 w-5 text-[#1877F2]" />,
  },
  {
    name: 'Frank Klin',
    role: 'DESIGNER',
    rating: 5,
    text: 'Impressive service and attention to detail. Exceeded all expectations. Truly a service that delivers.',
    avatar: '/placeholder.svg?height=80&width=80',
    social: <Twitter className="h-5 w-5 text-[#1DA1F2]" />,
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection) => {
    const newIndex = (currentIndex + newDirection + testimonials.length) % testimonials.length
    setCurrentIndex(newIndex)
  }

  return (
    <div className="relative h-200px w-full overflow-hidden bg-gray-50 flex items-center justify-center">
        
      <div className="relative w-full max-w-7xl ">
      <div className="text-center font-bold text-orange-500 text-2xl sm:text-3xl lg:text-4xl py-10 ">
    Check out what People Say
</div>

        <div className="flex justify-center items-center">
          {/* Navigation Buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 z-10 rounded-full bg-white p-3 shadow-lg hover:bg-gray-100"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <div className="relative h-[400px] w-full max-w-4xl overflow-hidden">
            <AnimatePresence initial={false} custom={currentIndex}>
              <motion.div
                key={currentIndex}
                custom={currentIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
                className="absolute w-full"
              >
                <div className="flex items-center justify-center gap-6">
                  {/* Previous Preview Card */}
                  <div className="hidden md:block opacity-50 scale-90">
                    <TestimonialCard
                      testimonial={testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length]}
                    />
                  </div>

                  {/* Current Card */}
                  <TestimonialCard testimonial={testimonials[currentIndex]} />

                  {/* Next Preview Card */}
                  <div className="hidden md:block opacity-50 scale-90">
                    <TestimonialCard
                      testimonial={testimonials[(currentIndex + 1) % testimonials.length]}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => paginate(1)}
            className="absolute right-4 z-10 rounded-full bg-white p-3 shadow-lg hover:bg-gray-100"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>      
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="w-[300px] bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#FF6B00]">
            <img
              src={photo1}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name and Role */}
        <h3 className="mt-4 font-semibold text-lg">{testimonial.name}</h3>
        <p className="text-sm text-[#FF6B00] font-medium">{testimonial.role}</p>

        {/* Rating Stars */}
        <div className="flex gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < testimonial.rating ? 'text-[#FF6B00]' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="mt-4 text-gray-600 text-sm leading-relaxed">
          {testimonial.text}
        </p>

        {/* Social Icon */}
        <div className="mt-4">
          {testimonial.social}
        </div>
      </div>
    </div>
  )
}

