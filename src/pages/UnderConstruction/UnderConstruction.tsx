import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import './UnderConstruction.css'

function UnderConstruction() {
  return (
    <main className="under-construction">
      <Navbar light />
      <section className="under-construction__content">
        <span className="under-construction__badge">🚧 Coming Soon</span>
        <h1 className="under-construction__title">Under Construction</h1>
        <p className="under-construction__sub">
          This page is currently being built. We're working hard to bring you something great. Check back soon.
        </p>
        <Link to="/" className="under-construction__btn">← Back to Home</Link>
      </section>
      <Footer />
    </main>
  )
}

export default UnderConstruction
