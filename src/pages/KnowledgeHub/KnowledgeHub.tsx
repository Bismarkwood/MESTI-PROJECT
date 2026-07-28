import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import JoinCta from '../../components/JoinCta';
import type { ResourceItem } from './knowledgeData';
import {
  QUICK_CATEGORIES,
  MOCK_RESOURCES,
  FEATURED_RESOURCE,
  THEME_COLLECTIONS,
  CEF_PS_RESOURCES,
  LATEST_ARTICLES
} from './knowledgeData';
import './KnowledgeHub.css';

export default function KnowledgeHub() {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedProgrammes, setSelectedProgrammes] = useState<string[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  
  // Controls & UI State
  const [sortOption, setSortOption] = useState<'newest' | 'oldest' | 'downloads' | 'alpha' | 'updated'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Interaction State
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [activeModalResource, setActiveModalResource] = useState<ResourceItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Newsletter & Submission Form State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterOrg, setNewsletterOrg] = useState('');
  const [newsletterTopic, setNewsletterTopic] = useState('All Updates');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cpf_knowledge_bookmarks');
      if (saved) {
        setBookmarkedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    }
  }, []);

  // Save bookmarks
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let updated: string[];
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter(item => item !== id);
      showToast('Removed from saved bookmarks');
    } else {
      updated = [...bookmarkedIds, id];
      showToast('Saved to your bookmarks');
    }
    setBookmarkedIds(updated);
    try {
      localStorage.setItem('cpf_knowledge_bookmarks', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save bookmarks', err);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Live search effect (3+ chars or empty)
  useEffect(() => {
    if (searchQuery.trim().length >= 3 || searchQuery.trim().length === 0) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setActiveSearch(searchQuery.trim());
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Handle explicit search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setActiveSearch(searchQuery.trim());
      setIsLoading(false);
    }, 200);
  };

  // Filtered and sorted resources
  const filteredResources = useMemo(() => {
    return MOCK_RESOURCES.filter(res => {
      // Search check
      if (activeSearch) {
        const query = activeSearch.toLowerCase();
        const matchTitle = res.title.toLowerCase().includes(query);
        const matchDesc = res.description.toLowerCase().includes(query);
        const matchTopic = res.topic.toLowerCase().includes(query);
        const matchKeywords = res.keywords.some(k => k.toLowerCase().includes(query));
        if (!matchTitle && !matchDesc && !matchTopic && !matchKeywords) {
          return false;
        }
      }
      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(res.type)) return false;
      // Topic filter
      if (selectedTopics.length > 0 && !selectedTopics.includes(res.topic)) return false;
      // Programme filter
      if (selectedProgrammes.length > 0 && !selectedProgrammes.includes(res.programme)) return false;
      // Publisher filter
      if (selectedPublishers.length > 0 && !selectedPublishers.includes(res.publisher)) return false;
      // Year filter
      if (selectedYears.length > 0 && !selectedYears.includes(res.date)) return false;

      return true;
    }).sort((a, b) => {
      if (sortOption === 'newest') return b.date.localeCompare(a.date);
      if (sortOption === 'oldest') return a.date.localeCompare(b.date);
      if (sortOption === 'alpha') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [activeSearch, selectedTypes, selectedTopics, selectedProgrammes, selectedPublishers, selectedYears, sortOption]);

  // Toggle array item in filters
  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 200);
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const clearAllFilters = () => {
    setIsLoading(true);
    setSearchQuery('');
    setActiveSearch('');
    setSelectedTypes([]);
    setSelectedTopics([]);
    setSelectedProgrammes([]);
    setSelectedPublishers([]);
    setSelectedYears([]);
    setTimeout(() => setIsLoading(false), 200);
  };

  const hasActiveFilters = Boolean(
    activeSearch ||
    selectedTypes.length ||
    selectedTopics.length ||
    selectedProgrammes.length ||
    selectedPublishers.length ||
    selectedYears.length
  );

  // Handle simulated download
  const handleDownload = (res: ResourceItem | { title: string; format: string }, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    showToast(`Downloading: ${res.title} (${res.format})`);
  };

  // Copy link
  const handleShare = (slug: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = `${window.location.origin}/knowledge-hub/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast('Resource link copied to clipboard!');
    }).catch(() => {
      showToast('Link copied to clipboard!');
    });
  };

  // Newsletter submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      showToast('Thank you for subscribing to CEF-PS Ghana updates!');
    }
  };

  return (
    <div className="kh-page">
      <Navbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="kh-toast" role="alert">
          <span>ℹ️</span> {toastMessage}
        </div>
      )}

      {/* 2. KNOWLEDGE HUB HERO */}
      <section className="kh-hero">
        <div className="kh-hero__inner">
          <div className="kh-hero__content">
            <span className="kh-label kh-label--light">KNOWLEDGE HUB</span>
            <h1 className="kh-hero__title">Knowledge for a Circular Plastics Future</h1>
            <p className="kh-hero__desc">
              Access policies, research, technical guidance, project reports, training materials and practical resources supporting Ghana’s transition towards a circular plastics economy.
            </p>

            <form className="kh-search-form" onSubmit={handleSearchSubmit}>
              <div className="kh-search-input-wrapper">
                <span className="kh-search-icon" aria-hidden="true">🔍</span>
                <input
                  type="text"
                  className="kh-search-input"
                  placeholder="Search policies, reports, guidelines, research and more"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search resources"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="kh-search-clear"
                    onClick={() => { setSearchQuery(''); setActiveSearch(''); }}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button type="submit" className="kh-btn kh-btn--primary kh-search-btn">
                Search
              </button>
            </form>

          </div>


        </div>
      </section>

      {/* 3. QUICK RESOURCE CATEGORIES */}
      <section className="kh-categories">
        <div className="kh-categories__inner">
          <div className="kh-section-header kh-section-header--center">
            <h2 className="kh-section-title">Explore by Resource Type</h2>
          </div>
          <div className="kh-categories__grid">
            {QUICK_CATEGORIES.map(cat => (
              <div
                key={cat.id}
                className="kh-cat-card"
                onClick={() => {
                  toggleFilter(selectedTypes, setSelectedTypes, cat.filterType);
                  const libSection = document.getElementById('resource-library');
                  if (libSection) libSection.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') toggleFilter(selectedTypes, setSelectedTypes, cat.filterType); }}
              >
                <div className="kh-cat-card__top">
                  <span className="kh-cat-card__icon" aria-hidden="true">{cat.icon}</span>
                  <span className="kh-cat-card__arrow">→</span>
                </div>
                <h3 className="kh-cat-card__title">{cat.title}</h3>
                <p className="kh-cat-card__desc">{cat.description}</p>
                <span className="kh-cat-card__count">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RESOURCE LIBRARY & FILTERS */}
      <section className="kh-library" id="resource-library">
        <div className="kh-library__inner">
          <div className="kh-library__header">
            <div>
              <span className="kh-label">RESOURCE LIBRARY</span>
              <h2 className="kh-section-title">Browse All Resources</h2>
              <p className="kh-section-sub">
                Find approved documents and learning materials published by CEF-PS Ghana, MEST, participating programmes and partner institutions.
              </p>
            </div>

            <button
              type="button"
              className="kh-btn kh-btn--outline kh-mobile-filter-btn"
              onClick={() => setMobileFilterOpen(true)}
            >
              <span>⚙️</span> Filter & Sort ({filteredResources.length})
            </button>
          </div>

          {/* Top Controls & Active Filter Chips */}
          <div className="kh-controls">
            <div className="kh-controls__left">
              <span className="kh-result-count">
                Showing <strong>{Math.min(visibleCount, filteredResources.length)}</strong> of <strong>{filteredResources.length}</strong> resources
              </span>
              {hasActiveFilters && (
                <button type="button" className="kh-clear-link" onClick={clearAllFilters}>
                  Clear all filters ✕
                </button>
              )}
            </div>

            <div className="kh-controls__right">
              <div className="kh-sort-group">
                <label htmlFor="sort-select" className="kh-sort-label">Sort by:</label>
                <select
                  id="sort-select"
                  className="kh-sort-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="alpha">Alphabetical</option>
                  <option value="downloads">Most downloaded</option>
                  <option value="updated">Recently updated</option>
                </select>
              </div>

              <div className="kh-view-toggle">
                <button
                  type="button"
                  className={`kh-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  ▦
                </button>
                <button
                  type="button"
                  className={`kh-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  title="List view"
                >
                  ≡
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="kh-filter-chips">
              {activeSearch && (
                <span className="kh-chip">
                  Search: “{activeSearch}”
                  <button onClick={() => { setSearchQuery(''); setActiveSearch(''); }}>✕</button>
                </span>
              )}
              {selectedTypes.map(t => (
                <span key={t} className="kh-chip">
                  Type: {t} <button onClick={() => toggleFilter(selectedTypes, setSelectedTypes, t)}>✕</button>
                </span>
              ))}
              {selectedTopics.map(t => (
                <span key={t} className="kh-chip">
                  Topic: {t} <button onClick={() => toggleFilter(selectedTopics, setSelectedTopics, t)}>✕</button>
                </span>
              ))}
              {selectedProgrammes.map(t => (
                <span key={t} className="kh-chip">
                  Programme: {t} <button onClick={() => toggleFilter(selectedProgrammes, setSelectedProgrammes, t)}>✕</button>
                </span>
              ))}
              {selectedPublishers.map(t => (
                <span key={t} className="kh-chip">
                  Publisher: {t} <button onClick={() => toggleFilter(selectedPublishers, setSelectedPublishers, t)}>✕</button>
                </span>
              ))}
              {selectedYears.map(t => (
                <span key={t} className="kh-chip">
                  Year: {t} <button onClick={() => toggleFilter(selectedYears, setSelectedYears, t)}>✕</button>
                </span>
              ))}
            </div>
          )}

          <div className="kh-library__body">
            {/* LEFT FILTER SIDEBAR (Desktop / Modal on Mobile) */}
            <aside className={`kh-sidebar ${mobileFilterOpen ? 'kh-sidebar--open' : ''}`}>
              <div className="kh-sidebar__header-mobile">
                <h3>Filter Resources</h3>
                <button type="button" onClick={() => setMobileFilterOpen(false)}>✕</button>
              </div>

              <div className="kh-sidebar-group">
                <h4 className="kh-sidebar-title">Resource Type</h4>
                <div className="kh-checkbox-list">
                  {['Policy', 'Strategy', 'Report', 'Guideline', 'Manual', 'Toolkit', 'Case Study', 'Dataset', 'Infographic', 'Video', 'Presentation'].map(type => (
                    <label key={type} className="kh-checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleFilter(selectedTypes, setSelectedTypes, type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="kh-sidebar-group">
                <h4 className="kh-sidebar-title">Topic</h4>
                <div className="kh-checkbox-list">
                  {['Plastic Policy and Governance', 'Circular Economy', 'Plastic Collection', 'Recycling and Recovery', 'Marine Plastic Pollution', 'Circular Business and Innovation', 'Data and Research', 'Behaviour Change', 'Standards and Compliance', 'Monitoring and Evaluation'].map(topic => (
                    <label key={topic} className="kh-checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => toggleFilter(selectedTopics, setSelectedTopics, topic)}
                      />
                      <span>{topic}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="kh-sidebar-group">
                <h4 className="kh-sidebar-title">Programme</h4>
                <div className="kh-checkbox-list">
                  {['CEF-PS Ghana', 'CEF-PS', 'National Plastic Action Partnership', 'MEST Initiatives', 'Partner Programmes'].map(prog => (
                    <label key={prog} className="kh-checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedProgrammes.includes(prog)}
                        onChange={() => toggleFilter(selectedProgrammes, setSelectedProgrammes, prog)}
                      />
                      <span>{prog}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="kh-sidebar-group">
                <h4 className="kh-sidebar-title">Publisher</h4>
                <div className="kh-checkbox-list">
                  {['MEST', 'EPA Ghana', 'UNIDO', 'GEF', 'UNDP', 'Research Institutions', 'Partner Organisations'].map(pub => (
                    <label key={pub} className="kh-checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedPublishers.includes(pub)}
                        onChange={() => toggleFilter(selectedPublishers, setSelectedPublishers, pub)}
                      />
                      <span>{pub}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="kh-sidebar-group">
                <h4 className="kh-sidebar-title">Publication Year</h4>
                <div className="kh-checkbox-list">
                  {['2026', '2025', '2024', '2023', '2022', '2021'].map(yr => (
                    <label key={yr} className="kh-checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedYears.includes(yr)}
                        onChange={() => toggleFilter(selectedYears, setSelectedYears, yr)}
                      />
                      <span>{yr}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="kh-sidebar-actions">
                <button
                  type="button"
                  className="kh-btn kh-btn--primary kh-btn--full"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  Apply Filters ({filteredResources.length})
                </button>
                <button
                  type="button"
                  className="kh-btn kh-btn--outline kh-btn--full"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </button>
              </div>
            </aside>

            {/* RIGHT RESOURCES CONTENT */}
            <main className="kh-library-main">
              {isLoading ? (
                /* 9. Loading State (Skeleton Loaders) */
                <div className={`kh-resource-grid kh-resource-grid--${viewMode}`}>
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <div key={n} className="kh-skeleton-card">
                      <div className="kh-skeleton-cover" />
                      <div className="kh-skeleton-text kh-skeleton-text--title" />
                      <div className="kh-skeleton-text kh-skeleton-text--desc" />
                      <div className="kh-skeleton-text kh-skeleton-text--meta" />
                    </div>
                  ))}
                </div>
              ) : filteredResources.length === 0 ? (
                /* 8. Empty State */
                <div className="kh-empty-state">
                  <div className="kh-empty-icon">📂</div>
                  <h3>No resources match your current search.</h3>
                  <p>Try adjusting your search terms or clearing selected filter criteria to explore more documents.</p>
                  <div className="kh-empty-actions">
                    <button type="button" className="kh-btn kh-btn--outline" onClick={clearAllFilters}>
                      Clear Filters
                    </button>
                    <button type="button" className="kh-btn kh-btn--primary" onClick={clearAllFilters}>
                      Browse All Resources
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={`kh-resource-grid kh-resource-grid--${viewMode}`}>
                    {filteredResources.slice(0, visibleCount).map(res => (
                      <article key={res.id} className="kh-res-card">
                        <div
                          className="kh-res-card__cover"
                          style={{ backgroundColor: res.accentColor || '#146B4A' }}
                          onClick={() => setActiveModalResource(res)}
                        >
                          <div className="kh-cover-inner">
                            <span className="kh-cover-tag">{res.type}</span>
                            <div className="kh-cover-title">{res.title}</div>
                            <div className="kh-cover-publisher">{res.publisher} · {res.date}</div>
                          </div>
                          <button
                            type="button"
                            className={`kh-bookmark-btn ${bookmarkedIds.includes(res.id) ? 'active' : ''}`}
                            onClick={(e) => toggleBookmark(res.id, e)}
                            aria-label="Save resource"
                            title={bookmarkedIds.includes(res.id) ? "Remove bookmark" : "Save bookmark"}
                          >
                            {bookmarkedIds.includes(res.id) ? '★' : '☆'}
                          </button>
                        </div>

                        <div className="kh-res-card__body">
                          <div className="kh-res-card__badges">
                            <span className="kh-badge kh-badge--type">{res.type}</span>
                            <span className="kh-badge kh-badge--prog">{res.programme}</span>
                          </div>

                          <h3 className="kh-res-card__title" onClick={() => setActiveModalResource(res)}>
                            {res.title}
                          </h3>
                          <p className="kh-res-card__desc">{res.description}</p>

                          <div className="kh-res-card__meta">
                            <span>🏛️ {res.publisher}</span>
                            <span>📅 {res.date}</span>
                            <span>⏱️ {res.readingTime}</span>
                          </div>

                          <div className="kh-res-card__footer">
                            <span className="kh-format-badge">{res.format}</span>
                            <div className="kh-card-actions">
                              <button
                                type="button"
                                className="kh-action-icon-btn"
                                onClick={(e) => handleShare(res.slug, e)}
                                title="Share link"
                              >
                                🔗
                              </button>
                              <button
                                type="button"
                                className="kh-action-icon-btn"
                                onClick={(e) => handleDownload(res, e)}
                                title="Download resource"
                              >
                                📥
                              </button>
                              <button
                                type="button"
                                className="kh-btn kh-btn--primary kh-btn--sm"
                                onClick={() => setActiveModalResource(res)}
                              >
                                View Resource
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {visibleCount < filteredResources.length && (
                    <div className="kh-load-more">
                      <button
                        type="button"
                        className="kh-btn kh-btn--outline"
                        onClick={() => {
                          setIsLoading(true);
                          setTimeout(() => {
                            setVisibleCount(prev => prev + 6);
                            setIsLoading(false);
                          }, 300);
                        }}
                      >
                        Load More Resources ({filteredResources.length - visibleCount} remaining)
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* 5. FEATURED RESOURCE */}
      <section className="kh-featured">
        <div className="kh-featured__inner">
          <div className="kh-featured__card">
            <div className="kh-featured__cover-col">
              <div className="kh-featured-cover">
                <div className="kh-featured-cover__header">
                  <span className="kh-cover-tag kh-cover-tag--gold">★ FEATURED PUBLICATION</span>
                </div>
                <div className="kh-featured-cover__title">{FEATURED_RESOURCE.title}</div>
                <div className="kh-featured-cover__sub">MEST · CEF-PS Ghana · 2026 ROADMAP</div>
                <div className="kh-featured-cover__seal">🇬🇭</div>
              </div>
            </div>

            <div className="kh-featured__content-col">
              <span className="kh-label kh-label--gold">FEATURED PUBLICATION</span>
              <h2 className="kh-featured__title">{FEATURED_RESOURCE.title}</h2>
              <p className="kh-featured__desc">{FEATURED_RESOURCE.description}</p>

              <div className="kh-featured__specs">
                <div><strong>Publisher:</strong> {FEATURED_RESOURCE.publisher}</div>
                <div><strong>Publication year:</strong> {FEATURED_RESOURCE.date}</div>
                <div><strong>Format:</strong> {FEATURED_RESOURCE.format}</div>
                <div><strong>Reading time:</strong> {FEATURED_RESOURCE.readingTime}</div>
                <div><strong>Language:</strong> {FEATURED_RESOURCE.language}</div>
              </div>

              <div className="kh-featured__actions">
                <button
                  type="button"
                  className="kh-btn kh-btn--gold"
                  onClick={() => setActiveModalResource(FEATURED_RESOURCE)}
                >
                  Read Publication
                </button>
                <button
                  type="button"
                  className="kh-btn kh-btn--outline-white"
                  onClick={() => handleDownload(FEATURED_RESOURCE)}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. KNOWLEDGE COLLECTIONS */}
      <section className="kh-collections">
        <div className="kh-collections__inner">
          <div className="kh-section-header">
            <span className="kh-label">CURATED COLLECTIONS</span>
            <h2 className="kh-section-title">Explore Resources by Theme</h2>
            <p className="kh-section-sub">
              Browse selected collections created to help policymakers, businesses, researchers, educators and communities find the information most relevant to their work.
            </p>
          </div>

          <div className="kh-collections__grid">
            {THEME_COLLECTIONS.map(col => (
              <div
                key={col.id}
                className="kh-col-card"
                onClick={() => {
                  setSelectedTopics([col.topicFilter]);
                  const libSection = document.getElementById('resource-library');
                  if (libSection) libSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <img src={col.image} alt={col.title} className="kh-col-card__img" />
                <div className="kh-col-card__overlay" />
                <div className="kh-col-card__content">
                  <span className="kh-col-card__count">{col.count}</span>
                  <h3 className="kh-col-card__title">{col.title}</h3>
                  <p className="kh-col-card__desc">{col.description}</p>
                  <span className="kh-col-card__arrow">Explore Collection →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CEF-PS RESOURCE COLLECTION */}
      <section className="kh-cefps">
        <div className="kh-container kh-cefps__inner">
          <div className="kh-cefps__left">
            <span className="kh-label kh-label--blue">PROGRAMME COLLECTION</span>
            <h2 className="kh-section-title">CEF-PS Resources</h2>
            <p className="kh-cefps__desc">
              Access reports, workplans, technical guidance, monitoring materials and learning resources from the Establishing a Circular Economy Framework for the Plastic Sector in Ghana project.
            </p>

            <ul className="kh-cefps__list">
              <li>📌 <strong>Project Reports:</strong> Comprehensive baseline & polymer flow assessments.</li>
              <li>📌 <strong>Technical Guidelines & SOPs:</strong> Quality standards for washing & sorting plants.</li>
              <li>📌 <strong>Workplans & Monitoring:</strong> GEF-10401 tracking indicators & timelines.</li>
              <li>📌 <strong>Pilot Project Learning:</strong> Informal waste sector integration toolkits.</li>
            </ul>

            <Link to="/cef-ps" className="kh-btn kh-btn--blue kh-cefps-btn">
              View All CEF-PS Resources →
            </Link>
          </div>

          <div className="kh-cefps__right">
            <div className="kh-cefps-stack">
              {CEF_PS_RESOURCES.map((item, idx) => (
                <div
                  key={item.id}
                  className={`kh-cefps-doc kh-cefps-doc--${idx}`}
                  onClick={() => handleDownload({ title: item.title, format: item.format })}
                >
                  <div className="kh-cefps-doc__top">
                    <span className="kh-cefps-doc__cat">{item.category}</span>
                    <span className="kh-cefps-doc__code">{item.code}</span>
                  </div>
                  <h4 className="kh-cefps-doc__title">{item.title}</h4>
                  <div className="kh-cefps-doc__bot">
                    <span>{item.date}</span>
                    <span>{item.format} 📥</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. LATEST RESEARCH AND INSIGHTS */}
      <section className="kh-insights">
        <div className="kh-insights__inner">
          <div className="kh-section-header">
            <span className="kh-label">RESEARCH AND INSIGHTS</span>
            <h2 className="kh-section-title">Latest Knowledge from the Plastics Sector</h2>
          </div>

          <div className="kh-insights__editorial">
            {/* Featured Article (Left) */}
            {LATEST_ARTICLES.filter(a => a.featured).map(art => (
              <article key={art.id} className="kh-art-card kh-art-card--featured">
                <div className="kh-art-card__img-wrap">
                  <img src={art.image} alt={art.title} />
                  <span className="kh-art-card__topic">{art.topic}</span>
                </div>
                <div className="kh-art-card__body">
                  <div className="kh-art-card__meta">
                    <span>✍️ {art.author}</span>
                    <span>📅 {art.date}</span>
                    <span>⏱️ {art.readingTime}</span>
                  </div>
                  <h3 className="kh-art-card__title">{art.title}</h3>
                  <p className="kh-art-card__desc">{art.description}</p>
                  <a href="#read" onClick={(e) => { e.preventDefault(); showToast(`Opening article: ${art.title}`); }} className="kh-art-card__link">
                    Read insight →
                  </a>
                </div>
              </article>
            ))}

            {/* Smaller Stacked Articles (Right) */}
            <div className="kh-insights__stack">
              {LATEST_ARTICLES.filter(a => !a.featured).map(art => (
                <article key={art.id} className="kh-art-card kh-art-card--sm">
                  <div className="kh-art-card__img-wrap kh-art-card__img-wrap--sm">
                    <img src={art.image} alt={art.title} />
                  </div>
                  <div className="kh-art-card__body">
                    <span className="kh-art-card__topic kh-art-card__topic--sm">{art.topic}</span>
                    <h4 className="kh-art-card__title">{art.title}</h4>
                    <p className="kh-art-card__desc">{art.description}</p>
                    <div className="kh-art-card__meta">
                      <span>{art.date}</span> · <span>{art.readingTime}</span>
                    </div>
                    <a href="#read" onClick={(e) => { e.preventDefault(); showToast(`Opening article: ${art.title}`); }} className="kh-art-card__link">
                      Read insight →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. DATA AND VISUAL RESOURCES */}
      <section className="kh-visuals">
        <div className="kh-container">
          <div className="kh-section-header kh-section-header--light">
            <span className="kh-label kh-label--light">VISUAL KNOWLEDGE</span>
            <h2 className="kh-section-title kh-section-title--white">Explore Data, Infographics and Media</h2>
            <p className="kh-section-sub kh-section-sub--light">
              Discover visual resources that make circular-plastics information easier to understand and use.
            </p>
          </div>

          <div className="kh-visuals__grid">
            <div className="kh-visual-card">
              <div className="kh-visual-card__preview kh-visual-card__preview--data">
                <div className="kh-data-chart">
                  <div className="kh-chart-bar" style={{ height: '60%' }} />
                  <div className="kh-chart-bar" style={{ height: '85%' }} />
                  <div className="kh-chart-bar" style={{ height: '40%' }} />
                  <div className="kh-chart-bar" style={{ height: '95%' }} />
                  <div className="kh-chart-bar" style={{ height: '75%' }} />
                </div>
                <span className="kh-visual-badge">OPEN DATASET</span>
              </div>
              <div className="kh-visual-card__body">
                <h3>Data and Indicators</h3>
                <p>Explore validated time-series charts, NPAP progress indicators, and approved regional datasets.</p>
                <button type="button" className="kh-btn kh-btn--outline-white kh-btn--sm" onClick={() => showToast('Opening Data Dashboard...')}>
                  Explore Datasets →
                </button>
              </div>
            </div>

            <div className="kh-visual-card">
              <div className="kh-visual-card__preview kh-visual-card__preview--info">
                <div className="kh-info-flow">
                  <span>Production 🏭</span> → <span>Collection 🚚</span> → <span>Recycling ♻️</span>
                </div>
                <span className="kh-visual-badge">INFOGRAPHICS</span>
              </div>
              <div className="kh-visual-card__body">
                <h3>Infographics</h3>
                <p>View high-resolution visual explanations of polymer material flows, recycling pathways, and circularity principles.</p>
                <button type="button" className="kh-btn kh-btn--outline-white kh-btn--sm" onClick={() => showToast('Opening Infographic Library...')}>
                  View Infographics →
                </button>
              </div>
            </div>

            <div className="kh-visual-card">
              <div className="kh-visual-card__preview kh-visual-card__preview--video">
                <div className="kh-video-play">▶</div>
                <span className="kh-visual-badge">VIDEO MEDIA</span>
              </div>
              <div className="kh-visual-card__body">
                <h3>Videos and Presentations</h3>
                <p>Access recorded stakeholder workshops, MEST policy presentations, and educational community webinars.</p>
                <button type="button" className="kh-btn kh-btn--outline-white kh-btn--sm" onClick={() => showToast('Opening Video Library...')}>
                  Watch Media →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. RESOURCE SUBMISSION SECTION */}
      {/* CTA BANNER */}
      <JoinCta
        heading="Building a Circular Plastics Economy Through Action"
        description="Discover the enterprises, activities and resources contributing to the implementation of CEF-PS across Ghana."
      />

      {/* 11. NEWSLETTER SECTION */}
      <section className="kh-newsletter">
        <div className="kh-container kh-newsletter__inner">
          <div className="kh-newsletter__text">
            <h2>Receive New Resources and Insights</h2>
            <p>
              Subscribe for updates when new policies, reports, research, training materials and sector resources are published.
            </p>
            <span className="kh-newsletter__privacy">
              🔒 By subscribing, you agree to receive CEF-PS Ghana updates. Your information will be handled in accordance with the website’s privacy policy.
            </span>
          </div>

          <form className="kh-newsletter__form" onSubmit={handleNewsletterSubmit}>
            {newsletterSubmitted ? (
              <div className="kh-newsletter-success">
                <span>✅ Thank you! You are now subscribed to CEF-PS Ghana updates.</span>
              </div>
            ) : (
              <>
                <div className="kh-form-row">
                  <input
                    type="email"
                    required
                    placeholder="Email address *"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="kh-input"
                  />
                  <input
                    type="text"
                    placeholder="Organisation (optional)"
                    value={newsletterOrg}
                    onChange={(e) => setNewsletterOrg(e.target.value)}
                    className="kh-input"
                  />
                </div>
                <div className="kh-form-row">
                  <select
                    value={newsletterTopic}
                    onChange={(e) => setNewsletterTopic(e.target.value)}
                    className="kh-select"
                  >
                    <option value="All Updates">Area of interest: All Updates</option>
                    <option value="Policy and Governance">Policy and Governance</option>
                    <option value="Research and Data">Research and Data</option>
                    <option value="Circular Business">Circular Business</option>
                    <option value="Recycling and Recovery">Recycling and Recovery</option>
                    <option value="Training and Events">Training and Events</option>
                  </select>
                  <button type="submit" className="kh-btn kh-btn--primary">
                    Subscribe
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>

      {/* RESOURCE DETAIL MODAL / DRAWER (INTERACTION 3 & DETAIL PAGE REQUIREMENTS) */}
      {activeModalResource && (
        <div className="kh-modal-overlay" onClick={() => setActiveModalResource(null)}>
          <div className="kh-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="modal-title">
            <button
              type="button"
              className="kh-modal-close"
              onClick={() => setActiveModalResource(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="kh-modal__header">
              <div className="kh-modal__badges">
                <span className="kh-badge kh-badge--type">{activeModalResource.type}</span>
                <span className="kh-badge kh-badge--prog">{activeModalResource.programme}</span>
                {activeModalResource.featured && <span className="kh-badge kh-badge--gold">Featured</span>}
              </div>
              <h2 id="modal-title" className="kh-modal__title">{activeModalResource.title}</h2>
              <div className="kh-modal__meta">
                <span>🏛️ <strong>Publisher:</strong> {activeModalResource.publisher}</span>
                {activeModalResource.author && <span>✍️ <strong>Author:</strong> {activeModalResource.author}</span>}
                <span>📅 <strong>Published:</strong> {activeModalResource.date}</span>
                {activeModalResource.lastUpdated && <span>🔄 <strong>Updated:</strong> {activeModalResource.lastUpdated}</span>}
              </div>
            </div>

            <div className="kh-modal__body">
              <div className="kh-modal__col-main">
                <h4>Executive Summary</h4>
                <p className="kh-modal__summary">{activeModalResource.summary}</p>
                
                <h4>Description</h4>
                <p>{activeModalResource.description}</p>

                <h4>Key Topics & Keywords</h4>
                <div className="kh-modal__keywords">
                  <span className="kh-keyword-tag">{activeModalResource.topic}</span>
                  {activeModalResource.keywords.map(k => (
                    <span key={k} className="kh-keyword-tag">{k}</span>
                  ))}
                </div>

                <div className="kh-modal__citation">
                  <h5>📑 Recommended Citation</h5>
                  <code>
                    {activeModalResource.author || activeModalResource.publisher} ({activeModalResource.date}). {activeModalResource.title}. Ministry of Environment, Science, Technology and Innovation (MEST) / CEF-PS Ghana Knowledge Hub.
                  </code>
                </div>

                <div className="kh-modal__disclaimer">
                  <small>
                    ⚠️ <strong>Disclaimer:</strong> This resource is published for information purposes. Please refer to the responsible institution ({activeModalResource.publisher}) for the most current official version.
                  </small>
                </div>
              </div>

              <div className="kh-modal__col-side">
                <div className="kh-modal-preview-card" style={{ backgroundColor: activeModalResource.accentColor || '#146B4A' }}>
                  <div className="kh-preview-cover">
                    <span>{activeModalResource.type}</span>
                    <strong>{activeModalResource.title}</strong>
                    <small>{activeModalResource.publisher}</small>
                  </div>
                </div>

                <div className="kh-modal-specs">
                  <div><span>Format:</span> <strong>{activeModalResource.fileType}</strong></div>
                  <div><span>File Size:</span> <strong>{activeModalResource.fileSize}</strong></div>
                  <div><span>Language:</span> <strong>{activeModalResource.language}</strong></div>
                  {activeModalResource.pages && <div><span>Pages:</span> <strong>{activeModalResource.pages} pages</strong></div>}
                  <div><span>Reading Time:</span> <strong>{activeModalResource.readingTime}</strong></div>
                </div>

                <div className="kh-modal-actions">
                  <button
                    type="button"
                    className="kh-btn kh-btn--primary kh-btn--full"
                    onClick={() => handleDownload(activeModalResource)}
                  >
                    📥 Download Resource ({activeModalResource.fileSize})
                  </button>
                  <button
                    type="button"
                    className="kh-btn kh-btn--outline kh-btn--full"
                    onClick={() => handleShare(activeModalResource.slug)}
                  >
                    🔗 Share Link
                  </button>
                  <button
                    type="button"
                    className={`kh-btn kh-btn--outline kh-btn--full ${bookmarkedIds.includes(activeModalResource.id) ? 'active' : ''}`}
                    onClick={() => toggleBookmark(activeModalResource.id)}
                  >
                    {bookmarkedIds.includes(activeModalResource.id) ? '★ Saved to Bookmarks' : '☆ Save to Bookmarks'}
                  </button>
                </div>

                <div className="kh-modal-contact">
                  <small>📧 For document enquiries or technical revisions, contact <a href="mailto:info@cpfghana.org">info@cpfghana.org</a>.</small>
                </div>
              </div>
            </div>

            {/* Related Resources (Interaction 7) */}
            <div className="kh-modal__related">
              <h4>Related Resources</h4>
              <div className="kh-related-grid">
                {MOCK_RESOURCES.filter(r => r.id !== activeModalResource.id && (r.topic === activeModalResource.topic || r.type === activeModalResource.type)).slice(0, 3).map(rel => (
                  <div
                    key={rel.id}
                    className="kh-related-item"
                    onClick={() => setActiveModalResource(rel)}
                  >
                    <span className="kh-related-type">{rel.type}</span>
                    <h5>{rel.title}</h5>
                    <small>{rel.publisher} · {rel.date}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
