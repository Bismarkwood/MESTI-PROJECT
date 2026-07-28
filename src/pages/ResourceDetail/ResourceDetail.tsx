import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { MOCK_RESOURCES as knowledgeData } from '../KnowledgeHub/knowledgeData'
import './ResourceDetail.css'

const ResourceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const resource = knowledgeData.find(res => res.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!resource) {
    return (
      <div className="res-detail__not-found">
        <Navbar />
        <div className="res-detail__nf-content">
          <h1>Resource Not Found</h1>
          <p>The document you are looking for does not exist or has been removed.</p>
          <Link to="/knowledge-hub" className="res-detail__back-btn">
            ← Back to Knowledge Hub
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  // Find some related resources
  const relatedResources = knowledgeData
    .filter(res => res.id !== resource.id && (res.topic === resource.topic || res.type === resource.type))
    .slice(0, 3)

  return (
    <div className="res-detail-page">
      <Helmet>
        <title>{resource.title} · Resource Library</title>
        <meta name="description" content={resource.summary} />
      </Helmet>

      <Navbar />

      <main className="res-detail-main">
        <div className="res-detail-hero" style={{ backgroundColor: resource.accentColor || '#146B4A' }}>
          <div className="res-detail-hero__inner">
            <Link to="/knowledge-hub" className="res-detail-back">
              ← Back to Library
            </Link>
            <div className="res-detail-hero__badges">
              <span className="res-badge">{resource.type}</span>
              <span className="res-badge">{resource.programme}</span>
            </div>
            <h1 className="res-detail-hero__title">{resource.title}</h1>
            <p className="res-detail-hero__pub">Published by {resource.publisher} · {resource.date}</p>
          </div>
        </div>

        <div className="res-detail-content-wrap">
          <div className="res-detail-content">
            <section className="res-detail-section">
              <h2>About this Document</h2>
              <div className="res-detail-desc">
                {/* Simulated paragraphs from the description for a better reading experience */}
                <p>{resource.description}</p>
                <p>{resource.summary}</p>
              </div>
            </section>

            <section className="res-detail-meta">
              <div className="res-meta-item">
                <span className="res-meta-label">Format</span>
                <span className="res-meta-val">{resource.format}</span>
              </div>
              <div className="res-meta-item">
                <span className="res-meta-label">Reading Time</span>
                <span className="res-meta-val">{resource.readingTime}</span>
              </div>
              <div className="res-meta-item">
                <span className="res-meta-label">Topic</span>
                <span className="res-meta-val">{resource.topic}</span>
              </div>
              <div className="res-meta-item">
                <span className="res-meta-label">Language</span>
                <span className="res-meta-val">{resource.language}</span>
              </div>
            </section>

            <div className="res-detail-actions">
              <button className="res-btn-primary">Download {resource.fileType}</button>
              <button className="res-btn-outline">Share Link</button>
            </div>
          </div>
        </div>

        {relatedResources.length > 0 && (
          <div className="res-detail-related">
            <div className="res-detail-related__inner">
              <h2>Related Resources</h2>
              <div className="kh-resource-grid kh-resource-grid--grid">
                {relatedResources.map((res) => (
                  <article key={res.id} className="kh-res-card" onClick={() => navigate(`/knowledge-hub/${res.slug}`)}>
                    <div
                      className="kh-res-card__cover"
                      style={{ backgroundColor: res.accentColor || '#146B4A' }}
                    >
                      <div className="kh-cover-inner">
                        <div className="kh-cover-title">{res.title}</div>
                      </div>
                    </div>
                    <div className="kh-res-card__body">
                      <h3 className="kh-res-card__title">
                        {res.title}
                      </h3>
                      <div className="kh-res-card__meta">
                        <span className="kh-badge kh-badge--type">{res.type}</span>
                        <span>{res.publisher}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default ResourceDetail
