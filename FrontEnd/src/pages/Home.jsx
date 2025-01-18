import React from 'react'
import Hero from './Hero'
import AnimatedServiceCards from '../components/other/FloatingCards'
import TestimonialCarousel from '../components/other/ReviewCarrousal'
import WhyUrja from '../components/other/WhyUrjaPage'

const Home = () => {
  return (
    <div>
        <Hero/>
        <AnimatedServiceCards/>
        <TestimonialCarousel/>
        <WhyUrja/>
    </div>
  )
}

export default Home