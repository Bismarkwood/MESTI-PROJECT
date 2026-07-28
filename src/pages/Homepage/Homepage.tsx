import { HeroScrollSection } from '../../components/HeroSection'
import AboutCPFSection from '../../components/AboutCPFSection'
import WhatWeDoSection from '../../components/WhatWeDoSection'
import CapabilitiesSection from '../../components/CapabilitiesSection'
import InsightsSection from '../../components/InsightsSection'
import JoinCta from '../../components/JoinCta'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import SEO from '../../components/SEO'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CEF-PS Ghana',
  url: 'https://cefpsghana.org',
  description: 'Coordinated national platform under MEST supporting Ghana’s transition towards a circular plastics economy.',
  foundingDate: '2026',
  areaServed: 'Ghana',
  sameAs: [],
  knowsAbout: ['Circular Plastics Economy', 'Plastic Waste Management', 'Environmental Policy', 'Recycling Infrastructure', 'Sustainable Innovations'],
}

function Homepage() {
  return (
    <main>
      <SEO
        title="CEF-PS Ghana | Circular Plastics Economy Platform"
        description="CEF-PS Ghana brings together government, businesses, innovators, development partners, researchers and communities to accelerate Ghana’s transition towards a circular plastics economy."
        path="/"
        structuredData={structuredData}
      />
      {/* 1. Header */}
      <Navbar />
      
      {/* 2. Hero */}
      <HeroScrollSection />
      
      {/* 3. About CEF-PS */}
      <AboutCPFSection />
      
      {/* 4. Focus Areas */}
      <WhatWeDoSection />
      
      {/* 5. Featured Programme */}
      <CapabilitiesSection />
      
      {/* 6. Knowledge and Updates */}
      <InsightsSection />
      
      {/* 7. Call to Action */}
      <JoinCta />
      
      {/* 8. Footer */}
      <Footer />
    </main>
  )
}

export default Homepage
