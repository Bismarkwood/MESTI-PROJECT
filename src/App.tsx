import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomCursor from './components/CustomCursor/CustomCursor'
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton'
import ScrollToTop from './components/ScrollToTop'
import usePageTracking from './hooks/usePageTracking'
import Homepage from './pages/Homepage'
import './App.css'

// Lazy load pages for better performance
const Geospatial = lazy(() => import('./pages/Geospatial'))
const CloudPlatforms = lazy(() => import('./pages/CloudPlatforms'))
const AIAutomation = lazy(() => import('./pages/AIAutomation'))
const DataAnalytics = lazy(() => import('./pages/DataAnalytics'))
const Solutions = lazy(() => import('./pages/Solutions'))
const Insights = lazy(() => import('./pages/Insights'))
const InsightDetail = lazy(() => import('./pages/InsightDetail'))
const About = lazy(() => import('./pages/About'))
// const Team = lazy(() => import('./pages/Team'))
// const Careers = lazy(() => import('./pages/Careers'))
// const CareerDetail = lazy(() => import('./pages/CareerDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Privacy = lazy(() => import('./pages/Privacy'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Terms = lazy(() => import('./pages/Terms'))
const Cookies = lazy(() => import('./pages/Cookies'))
const KnowledgeHub = lazy(() => import('./pages/KnowledgeHub'))
const ResourceDetail = lazy(() => import('./pages/ResourceDetail'))
const CefPs = lazy(() => import('./pages/CefPs'))
const Impact = lazy(() => import('./pages/Impact'))


function PageTracker() {
  usePageTracking()
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageTracker />
      <Suspense fallback={null}>
        <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/services" element={<CefPs />} />
              <Route path="/geospatial" element={<Geospatial />} />
              <Route path="/cloud-platforms" element={<CloudPlatforms />} />
              <Route path="/ai-automation" element={<AIAutomation />} />
              <Route path="/data-analytics" element={<DataAnalytics />} />
              <Route path="/proof" element={<CefPs />} />

              <Route path="/solutions" element={<Solutions />} />
              <Route path="/solutions/:slug" element={<ProjectDetail />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<InsightDetail />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/team" element={<Team />} /> */}
              {/* <Route path="/careers" element={<Careers />} /> */}
              {/* <Route path="/careers/:slug" element={<CareerDetail />} /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/knowledge-hub" element={<KnowledgeHub />} />
              <Route path="/knowledge-hub/:slug" element={<ResourceDetail />} />
              <Route path="/csr" element={<KnowledgeHub />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/cef-ps" element={<CefPs />} />
              <Route path="/projects/cef-ps" element={<CefPs />} />
              <Route path="/programmes/cef-ps" element={<CefPs />} />
        </Routes>
      </Suspense>
      <ScrollToTopButton />
      <CustomCursor />
    </BrowserRouter>
  )
}

export default App
