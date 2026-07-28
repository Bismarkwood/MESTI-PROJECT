import { useState, useRef } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import smeFacilityImg from '../../assets/sme-facility.jpg'
import './Contact.css'

/* ─── Types ─── */
interface FormData {
  fullName: string
  email: string
  telephone: string
  organisation: string
  role: string
  category: string
  subject: string
  message: string
  file: File | null
  consent: boolean
}

interface FormErrors {
  [key: string]: string
}

const ENQUIRY_CATEGORIES = [
  'General enquiry',
  'Programme information',
  'Partnership and collaboration',
  'Circular solution submission',
  'Research and data request',
  'Resource or publication submission',
  'Media enquiry',
  'Event or training enquiry',
  'Funding or opportunity enquiry',
  'Website feedback',
  'Other',
]

const QUICK_CONTACTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
    category: 'General Enquiries',
    desc: 'Questions about CEF-PS Ghana, its mandate, activities and website information.',
    email: '[GENERAL EMAIL ADDRESS]',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    category: 'Programmes and Projects',
    desc: 'Information about CEF-PS and other circular-plastics programmes on the platform.',
    email: '[PROGRAMME EMAIL ADDRESS]',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    category: 'Partnerships and Collaboration',
    desc: 'Requests from businesses, institutions, development partners and researchers.',
    email: '[PARTNERSHIP EMAIL ADDRESS]',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 11.7 19.79 19.79 0 0 1 1.07 3.07 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    category: 'Media and Communications',
    desc: 'Interview requests, official statements, media materials and communications enquiries.',
    email: '[MEDIA EMAIL ADDRESS]',
  },
]

const PURPOSE_ROWS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    category: 'Submit a Circular Solution',
    desc: 'For businesses, recyclers, innovators and community organisations seeking to share a circular-plastics initiative.',
    action: 'Submit a Solution',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    category: 'Contribute a Resource',
    desc: 'For researchers and institutions submitting reports, publications, data or training resources to the Knowledge Hub.',
    action: 'Submit a Resource',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    category: 'Explore Partnership Opportunities',
    desc: 'For institutions seeking technical, financial, research or programme collaboration.',
    action: 'Propose a Partnership',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    category: 'Request Data or Research Information',
    desc: 'For approved enquiries relating to public plastic-sector data, research or technical documents.',
    action: 'Submit a Data Request',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 11.7 19.79 19.79 0 0 1 1.07 3.07 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    category: 'Media Requests',
    desc: 'For official statements, interviews, photographs and communications materials.',
    action: 'Contact Communications',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Can I apply for funding through the contact form?',
    a: 'The contact form may be used to request information about officially published opportunities. It does not serve as a funding application unless a specific call directs applicants to use it.',
  },
  {
    q: 'Can I submit my organisation for inclusion on the website?',
    a: 'Yes. Select Circular Solution Submission and provide information about your organisation, activities, location and impact. All submissions are reviewed before publication.',
  },
  {
    q: 'Can I report plastic pollution through this page?',
    a: 'The contact page is intended for information and stakeholder enquiries. Urgent environmental complaints should be directed to the appropriate environmental authority or local assembly unless an official reporting service is introduced.',
  },
  {
    q: 'How can I submit a report to the Knowledge Hub?',
    a: 'Select Resource or Publication Submission and attach the publication or provide a link. Submissions are reviewed for relevance, credibility and publication rights.',
  },
]

const GUIDANCE_CHECKLIST = [
  'Name of your organisation',
  'Nature of your request',
  'Programme or topic involved',
  'Proposed activity or partnership',
  'Relevant location',
  'Expected timeline',
  'Supporting documentation',
]

/* ─── Component ─── */
function Contact() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '', email: '', telephone: '', organisation: '', role: '',
    category: '', subject: '', message: '', file: null, consent: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [refNumber, setRefNumber] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterInterest, setNewsletterInterest] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.'
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (!formData.telephone.trim()) newErrors.telephone = 'Telephone number is required.'
    if (!formData.category) newErrors.category = 'Please select an enquiry category.'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.'
    if (!formData.message.trim()) newErrors.message = 'Message is required.'
    if (!formData.consent) newErrors.consent = 'You must confirm your consent to proceed.'
    if (formData.file) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png']
      if (!allowedTypes.includes(formData.file.type)) {
        newErrors.file = 'Accepted formats: PDF, DOCX, XLSX, JPG or PNG.'
      }
      if (formData.file.size > 10 * 1024 * 1024) {
        newErrors.file = 'File size must not exceed 10 MB.'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const ref = `CEFPS-${Date.now().toString(36).toUpperCase()}`
    setRefNumber(ref)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n })
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, consent: e.target.checked }))
    if (errors.consent) setErrors(prev => { const n = { ...prev }; delete n.consent; return n })
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, file }))
    if (errors.file) setErrors(prev => { const n = { ...prev }; delete n.file; return n })
  }

  return (
    <main className="contact-page">
      <SEO
        title="Contact CEF-PS Ghana | Circular Plastics Framework"
        description="Contact CEF-PS Ghana for information about circular-plastics programmes, partnerships, research, resources, events and opportunities under MEST."
        path="/contact"
      />
      <Navbar />

      {/* ── 1. HERO ── */}
      <section className="ct-hero">
        <div className="ct-hero__inner">
          <div className="ct-hero__left">
            <span className="ct-hero__label">Contact CEF-PS Ghana</span>
            <h1 className="ct-hero__title">Let's Connect for a<br />Circular Plastics Future</h1>
            <p className="ct-hero__desc">
              Have a question, partnership idea or resource to share? Contact the CEF-PS Ghana team for
              information about programmes, circular-plastics initiatives, research, events and opportunities.
            </p>
            <div className="ct-hero__links">
              <a href="mailto:[GENERAL EMAIL ADDRESS]" className="ct-hero__link">
                <span className="ct-hero__link-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
                  </svg>
                </span>
                [GENERAL EMAIL ADDRESS]
              </a>
              <a href="tel:[OFFICIAL TELEPHONE NUMBER]" className="ct-hero__link">
                <span className="ct-hero__link-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 11.7 19.79 19.79 0 0 1 1.07 3.07 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </span>
                [OFFICIAL TELEPHONE NUMBER]
              </a>
              <span className="ct-hero__link">
                <span className="ct-hero__link-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                [OFFICIAL MEST ADDRESS], Accra, Ghana
              </span>
            </div>
          </div>
          <div className="ct-hero__right">
            <img src={smeFacilityImg} alt="Circular-plastics stakeholders participating in a meeting in Ghana" className="ct-hero__img" />
            <div className="ct-hero__img-badge">
              <span>♻️</span> CEF-PS Ghana Stakeholder Engagement
            </div>
          </div>
        </div>
        <div className="ct-hero__bg-circles" aria-hidden="true">
          <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="700" cy="80" r="300" stroke="rgba(12,59,46,0.04)" strokeWidth="1.5" strokeDasharray="12 12"/>
            <circle cx="700" cy="80" r="200" stroke="rgba(12,59,46,0.03)" strokeWidth="1"/>
            <circle cx="80" cy="500" r="280" stroke="rgba(12,59,46,0.03)" strokeWidth="1.5" strokeDasharray="16 16"/>
          </svg>
        </div>
      </section>

      {/* ── 2. QUICK CONTACT OPTIONS ── */}
      <section className="ct-quick">
        <div className="ct-quick__inner">
          <div className="ct-quick__header">
            <span className="ct-section-label">How Can We Help?</span>
            <h2 className="ct-section-title">Reach the Right Team</h2>
            <p className="ct-section-desc">Select the channel that best matches your enquiry to ensure your message reaches the right team.</p>
          </div>
          <div className="ct-quick__grid">
            {QUICK_CONTACTS.map((card) => (
              <div key={card.category} className="ct-quick__card">
                <div className="ct-quick__card-icon">{card.icon}</div>
                <h3 className="ct-quick__card-cat">{card.category}</h3>
                <p className="ct-quick__card-desc">{card.desc}</p>
                <a href={`mailto:${card.email}`} className="ct-quick__card-email">{card.email}</a>
                <a href="#contact-form" className="ct-quick__card-link">
                  Send an Enquiry <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. MAIN FORM + GUIDANCE ── */}
      <section className="ct-form-section" id="contact-form">
        <div className="ct-form-section__inner">

          {/* Guidance Panel */}
          <aside className="ct-guidance">
            <span className="ct-section-label ct-section-label--dark">Send an Enquiry</span>
            <h2 className="ct-guidance__title">Before You Submit</h2>
            <p className="ct-guidance__intro">
              Providing complete and accurate information will help the CEF-PS Ghana team respond appropriately.
            </p>
            <p className="ct-guidance__sub">Include the following where relevant:</p>
            <ul className="ct-guidance__list">
              {GUIDANCE_CHECKLIST.map(item => (
                <li key={item} className="ct-guidance__item">
                  <span className="ct-guidance__check">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E8A00" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="ct-guidance__notice">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
              </svg>
              <p>Enquiries are reviewed during official working hours. Requests requiring technical review or engagement with another institution may take longer to process.</p>
            </div>
            <div className="ct-guidance__warning">
              <strong>Important:</strong> Submitting an enquiry, proposal or partnership request does not automatically create an agreement, approve funding or guarantee participation in a programme.
            </div>
          </aside>

          {/* Form Card */}
          <div className="ct-form-card">
            <div className="ct-form-card__header">
              <h2 className="ct-form-card__title">Tell Us How We Can Support You</h2>
              <p className="ct-form-card__sub">Complete the form and select the category that best describes your enquiry. Your message will be directed to the appropriate CEF-PS Ghana team.</p>
            </div>

            {submitted ? (
              <div className="ct-form-success">
                <div className="ct-form-success__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1E8A00" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="ct-form-success__title">Thank You for Contacting CEF-PS Ghana</h3>
                <p className="ct-form-success__text">Your enquiry has been received successfully. A member of the appropriate team will review your message and respond using the contact information provided.</p>
                <div className="ct-form-success__ref">
                  <span className="ct-form-success__ref-label">Reference number</span>
                  <span className="ct-form-success__ref-value">{refNumber}</span>
                </div>
                <button className="ct-form-success__reset" onClick={() => { setSubmitted(false); setFormData({ fullName: '', email: '', telephone: '', organisation: '', role: '', category: '', subject: '', message: '', file: null, consent: false }); setErrors({}) }}>
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form className="ct-form" onSubmit={handleSubmit} noValidate>
                <div className="ct-form__section-label">Personal Information</div>

                <div className="ct-form__row">
                  <div className="ct-form__field">
                    <label htmlFor="fullName">Full name <span className="ct-form__req">*</span></label>
                    <input id="fullName" name="fullName" type="text" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} className={errors.fullName ? 'ct-form__input--error' : ''} />
                    {errors.fullName && <span className="ct-form__error">{errors.fullName}</span>}
                  </div>
                  <div className="ct-form__field">
                    <label htmlFor="email">Email address <span className="ct-form__req">*</span></label>
                    <input id="email" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} className={errors.email ? 'ct-form__input--error' : ''} />
                    {errors.email && <span className="ct-form__error">{errors.email}</span>}
                  </div>
                </div>

                <div className="ct-form__row">
                  <div className="ct-form__field">
                    <label htmlFor="telephone">Telephone number <span className="ct-form__req">*</span></label>
                    <input id="telephone" name="telephone" type="tel" placeholder="+233 00 000 0000" value={formData.telephone} onChange={handleChange} className={errors.telephone ? 'ct-form__input--error' : ''} />
                    {errors.telephone && <span className="ct-form__error">{errors.telephone}</span>}
                  </div>
                  <div className="ct-form__field">
                    <label htmlFor="organisation">Organisation or institution</label>
                    <input id="organisation" name="organisation" type="text" placeholder="Your organisation" value={formData.organisation} onChange={handleChange} />
                  </div>
                </div>

                <div className="ct-form__field ct-form__field--full">
                  <label htmlFor="role">Position or role</label>
                  <input id="role" name="role" type="text" placeholder="Your position or role" value={formData.role} onChange={handleChange} />
                </div>

                <div className="ct-form__divider" />
                <div className="ct-form__section-label">Enquiry Details</div>

                <div className="ct-form__field ct-form__field--full">
                  <label htmlFor="category">Enquiry category <span className="ct-form__req">*</span></label>
                  <div className="ct-form__select-wrap">
                    <select id="category" name="category" value={formData.category} onChange={handleChange} className={errors.category ? 'ct-form__input--error' : ''}>
                      <option value="">Select a category</option>
                      {ENQUIRY_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <svg className="ct-form__select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                  {errors.category && <span className="ct-form__error">{errors.category}</span>}
                </div>

                <div className="ct-form__field ct-form__field--full">
                  <label htmlFor="subject">Subject <span className="ct-form__req">*</span></label>
                  <input id="subject" name="subject" type="text" placeholder="Enter a short title for your enquiry" value={formData.subject} onChange={handleChange} className={errors.subject ? 'ct-form__input--error' : ''} />
                  {errors.subject && <span className="ct-form__error">{errors.subject}</span>}
                </div>

                <div className="ct-form__field ct-form__field--full">
                  <label htmlFor="message">Message <span className="ct-form__req">*</span></label>
                  <textarea id="message" name="message" rows={5} placeholder="Please provide enough information to help us understand and respond to your request." value={formData.message} onChange={handleChange} className={errors.message ? 'ct-form__input--error' : ''} />
                  {errors.message && <span className="ct-form__error">{errors.message}</span>}
                </div>

                <div className="ct-form__field ct-form__field--full">
                  <label>Supporting document <span className="ct-form__optional">(Optional)</span></label>
                  <div className="ct-form__file-zone" onClick={() => fileInputRef.current?.click()}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span>{formData.file ? formData.file.name : 'Click to upload a file'}</span>
                    <span className="ct-form__file-hint">PDF, DOCX, XLSX, JPG or PNG — Maximum 10 MB</span>
                    <input ref={fileInputRef} type="file" accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png" onChange={handleFile} style={{ display: 'none' }} />
                  </div>
                  {errors.file && <span className="ct-form__error">{errors.file}</span>}
                </div>

                <div className="ct-form__divider" />

                <label className="ct-form__consent">
                  <input type="checkbox" checked={formData.consent} onChange={handleCheckbox} className={errors.consent ? 'ct-form__input--error' : ''} />
                  <span>I confirm that the information provided is accurate and consent to CEF-PS Ghana using my details to respond to this enquiry in accordance with the <a href="/privacy">Privacy Policy</a>.</span>
                </label>
                {errors.consent && <span className="ct-form__error">{errors.consent}</span>}

                <button type="submit" className="ct-form__submit">
                  Send Enquiry
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>

                <p className="ct-form__error-note">
                  If you experience an issue, please contact us using the details provided on this page.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. OFFICIAL OFFICE DETAILS + MAP ── */}
      <section className="ct-office">
        <div className="ct-office__inner">
          <div className="ct-office__panel">
            <span className="ct-section-label ct-section-label--light">Official Contact Information</span>
            <h2 className="ct-office__title">Visit the Coordinating Institution</h2>
            <p className="ct-office__intro">CEF-PS Ghana is coordinated under the Ministry of Environment, Science, Technology and Innovation.</p>
            <div className="ct-office__details">
              <div className="ct-office__detail">
                <span className="ct-office__detail-label">Institution</span>
                <span className="ct-office__detail-value">Ministry of Environment, Science, Technology and Innovation</span>
              </div>
              <div className="ct-office__detail">
                <span className="ct-office__detail-label">Office Address</span>
                <span className="ct-office__detail-value">[OFFICIAL MEST ADDRESS]<br />Accra, Ghana</span>
              </div>
              <div className="ct-office__detail">
                <span className="ct-office__detail-label">Postal Address</span>
                <span className="ct-office__detail-value">[POSTAL ADDRESS]</span>
              </div>
              <div className="ct-office__detail">
                <span className="ct-office__detail-label">Telephone</span>
                <span className="ct-office__detail-value">[OFFICIAL TELEPHONE NUMBER]</span>
              </div>
              <div className="ct-office__detail">
                <span className="ct-office__detail-label">Email</span>
                <span className="ct-office__detail-value">[OFFICIAL EMAIL ADDRESS]</span>
              </div>
              <div className="ct-office__detail">
                <span className="ct-office__detail-label">Working Hours</span>
                <span className="ct-office__detail-value">Monday–Friday<br />[OPENING TIME] – [CLOSING TIME]</span>
              </div>
              <div className="ct-office__detail">
                <span className="ct-office__detail-label">Public Holidays</span>
                <span className="ct-office__detail-value">Closed on statutory public holidays.</span>
              </div>
            </div>
            <div className="ct-office__actions">
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="ct-office__btn ct-office__btn--primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Get Directions
              </a>
              <a href="tel:[OFFICIAL TELEPHONE NUMBER]" className="ct-office__btn ct-office__btn--secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 11.7 19.79 19.79 0 0 1 1.07 3.07 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call Office
              </a>
            </div>
          </div>
          <div className="ct-office__map">
            <iframe
              title="MEST Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9!2d-0.187!3d5.614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzYnNTAuNCJOIDDCsDExJzEzLjIiVw!5e0!3m2!1sen!2sgh!4v1700000000000"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ── 5. CONTACT BY PURPOSE ── */}
      <section className="ct-purpose">
        <div className="ct-purpose__inner">
          <div className="ct-purpose__header">
            <span className="ct-section-label">Find the Right Contact Channel</span>
            <h2 className="ct-section-title">What Brings You Here?</h2>
          </div>
          <div className="ct-purpose__rows">
            {PURPOSE_ROWS.map((row) => (
              <div key={row.category} className="ct-purpose__row">
                <div className="ct-purpose__row-icon">{row.icon}</div>
                <div className="ct-purpose__row-content">
                  <h3 className="ct-purpose__row-cat">{row.category}</h3>
                  <p className="ct-purpose__row-desc">{row.desc}</p>
                </div>
                <a href="#contact-form" className="ct-purpose__row-btn">{row.action}</a>
                <span className="ct-purpose__row-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CEF-PS PROGRAMME CONTACT ── */}
      <section className="ct-cefps">
        <div className="ct-cefps__inner">
          <div className="ct-cefps__content">
            <span className="ct-section-label ct-section-label--teal">Programme Enquiries</span>
            <h2 className="ct-cefps__title">Looking for Information About CEF-PS?</h2>
            <p className="ct-cefps__desc">
              For questions about the Establishing a Circular Economy Framework for the Plastic Sector in Ghana project,
              select <strong>Programme Information</strong> in the contact form.
            </p>
            <ul className="ct-cefps__list">
              {['Project activities', 'Pilot projects', 'Publications and resources', 'Stakeholder engagements', 'Training and events', 'Approved programme opportunities'].map(item => (
                <li key={item}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <a href="/cef-ps" className="ct-cefps__btn">Visit the CEF-PS Project Page</a>
          </div>
          <div className="ct-cefps__image-wrap">
            <div className="ct-cefps__image-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span>CEF-PS Project Image</span>
              <small>Project team at a pilot-site monitoring visit, workshop or stakeholder meeting</small>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ACCORDION ── */}
      <section className="ct-faq">
        <div className="ct-faq__inner">
          <div className="ct-faq__header">
            <span className="ct-section-label">Frequently Asked Questions</span>
            <h2 className="ct-section-title">Before You Contact Us</h2>
          </div>
          <div className="ct-faq__list">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={`ct-faq__item${openFaq === i ? ' ct-faq__item--open' : ''}`}>
                <button className="ct-faq__question" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span>{item.q}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ct-faq__chevron">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="ct-faq__answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ct-faq__footer">
            <a href="/faq" className="ct-faq__more-btn">View All Frequently Asked Questions</a>
          </div>
        </div>
      </section>

      {/* ── 8. SOCIAL CHANNELS ── */}
      <section className="ct-social">
        <div className="ct-social__inner">
          <span className="ct-section-label">Stay Connected</span>
          <h2 className="ct-section-title ct-social__title">Follow CEF-PS Ghana</h2>
          <p className="ct-social__desc">Stay informed about circular-plastics programmes, resources, events, stakeholder activities and opportunities.</p>
          <div className="ct-social__icons">
            <a href="#" className="ct-social__icon" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
              </svg>
            </a>
            <a href="#" className="ct-social__icon" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20.06 12 20.06 12 20.06s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
              </svg>
            </a>
            <a href="#" className="ct-social__icon" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" className="ct-social__icon" aria-label="X (Twitter)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M13.232 10.232L20 4"/>
              </svg>
            </a>
            <a href="#contact-form" className="ct-social__icon ct-social__icon--newsletter" aria-label="Newsletter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── 9. NEWSLETTER CALLOUT ── */}
      <section className="ct-newsletter">
        <div className="ct-newsletter__inner">
          <div className="ct-newsletter__text">
            <h2 className="ct-newsletter__title">Stay Connected</h2>
            <p className="ct-newsletter__desc">Receive updates on policies, programmes, reports, events and opportunities from Ghana's circular-plastics ecosystem.</p>
          </div>
          <form className="ct-newsletter__form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              className="ct-newsletter__email"
            />
            <select value={newsletterInterest} onChange={e => setNewsletterInterest(e.target.value)} className="ct-newsletter__interest">
              <option value="">Area of interest</option>
              <option value="programmes">Programmes & Projects</option>
              <option value="policy">Policy & Regulation</option>
              <option value="research">Research & Data</option>
              <option value="events">Events & Training</option>
              <option value="partnerships">Partnerships</option>
            </select>
            <button type="submit" className="ct-newsletter__btn">Subscribe</button>
          </form>
          <p className="ct-newsletter__privacy">Your information will be used only to send selected CEF-PS Ghana updates and will be handled according to the website's <a href="/privacy">Privacy Policy</a>.</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Contact
