import afcLogo from '../../assets/Client Logos/AFC.webp'
import ecLogo from '../../assets/Client Logos/EC.webp'
import indomieLogo from '../../assets/Client Logos/Indomie.webp'
import ntlLogo from '../../assets/Client Logos/NTL.webp'
import ntmelLogo from '../../assets/Client Logos/NTMEL.webp'
import parliamentLogo from '../../assets/Client Logos/Parliament of ghana.webp'
import usaidLogo from '../../assets/Client Logos/USAID Logo.webp'
import wcfLogo from '../../assets/Client Logos/World Cocoa Foundation.webp'
import ecomLogo from '../../assets/Client Logos/ECOM.webp'
import gizLogo from '../../assets/Client Logos/GIZ.webp'
import deaLogo from '../../assets/Client Logos/Digital Earth Africa.webp'
import nitaLogo from '../../assets/Client Logos/NITA logo.webp'
import ugLogo from '../../assets/Client Logos/UG Logo.webp'
import './ClientLogos.css'

const logos = [afcLogo, ecLogo, indomieLogo, ntlLogo, ntmelLogo, parliamentLogo, usaidLogo, wcfLogo, ecomLogo, gizLogo, deaLogo, nitaLogo, ugLogo]

function ClientLogos() {
  return (
    <section className="client-logos">
      <h3 className="client-logos__title">Trusted By</h3>
      <div className="client-logos__track-wrapper">
        <div className="client-logos__track">
          {logos.map((logo, i) => (
            <div className="client-logos__item" key={i}>
              <img src={logo} alt="" />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {logos.map((logo, i) => (
            <div className="client-logos__item" key={`dup-${i}`}>
              <img src={logo} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientLogos
