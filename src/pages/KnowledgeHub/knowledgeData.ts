export interface ResourceItem {
  id: string;
  title: string;
  slug: string;
  type: 'Policy' | 'Strategy' | 'Report' | 'Guideline' | 'Manual' | 'Toolkit' | 'Case Study' | 'Dataset' | 'Infographic' | 'Video' | 'Presentation';
  topic: string;
  programme: 'CPF Ghana' | 'CEF-PS' | 'National Plastic Action Partnership' | 'MESTI Initiatives' | 'Partner Programmes';
  publisher: string;
  author?: string;
  date: string; // e.g. "2026", "2025"
  lastUpdated?: string;
  format: string; // e.g. "PDF · 4.8 MB"
  fileSize: string;
  fileType: string;
  pages?: number;
  readingTime: string;
  description: string;
  summary: string;
  language: string;
  keywords: string[];
  featured?: boolean;
  accentColor: string; // Hex or theme color class
}

export const QUICK_CATEGORIES = [
  {
    id: 'policies',
    title: 'Policies and Strategies',
    description: 'National policies, frameworks and implementation strategies.',
    count: '24 Resources',
    icon: '📜',
    filterType: 'Policy'
  },
  {
    id: 'reports',
    title: 'Research and Reports',
    description: 'Sector studies, assessments, programme reports and evidence.',
    count: '38 Resources',
    icon: '📊',
    filterType: 'Report'
  },
  {
    id: 'guidelines',
    title: 'Technical Guidelines',
    description: 'Standards, methodologies, manuals and implementation guidance.',
    count: '19 Resources',
    icon: '📐',
    filterType: 'Guideline'
  },
  {
    id: 'training',
    title: 'Training Resources',
    description: 'Presentations, curricula, toolkits and learning materials.',
    count: '15 Resources',
    icon: '🎓',
    filterType: 'Toolkit'
  },
  {
    id: 'case-studies',
    title: 'Case Studies',
    description: 'Practical experiences, lessons and circular-economy solutions.',
    count: '12 Resources',
    icon: '💡',
    filterType: 'Case Study'
  },
  {
    id: 'data',
    title: 'Data and Insights',
    description: 'Datasets, indicators, infographics and sector information.',
    count: '21 Resources',
    icon: '📈',
    filterType: 'Dataset'
  }
];

export const MOCK_RESOURCES: ResourceItem[] = [
  {
    id: 'res-01',
    title: 'National Circular Plastics Management Policy 2026',
    slug: 'national-circular-plastics-management-policy-2026',
    type: 'Policy',
    topic: 'Plastic Policy and Governance',
    programme: 'CPF Ghana',
    publisher: 'MESTI',
    author: 'Ministry of Environment, Science, Technology and Innovation',
    date: '2026',
    lastUpdated: 'January 2026',
    format: 'PDF · 5.2 MB',
    fileSize: '5.2 MB',
    fileType: 'PDF Document',
    pages: 64,
    readingTime: '30 mins',
    description: 'A comprehensive national framework outlining Ghana’s priorities and strategic direction for sustainable plastic management and circular economy transition.',
    summary: 'This landmark policy establishes the formal governance, regulatory standards, and fiscal mechanisms required to transform Ghana from a linear plastics economy into a zero-leakage, high-recovery circular model by 2035. It mandates extended producer responsibility (EPR), incentives for domestic recycling infrastructure, and integrated community waste collection frameworks.',
    language: 'English',
    keywords: ['National Policy', 'EPR', 'Circular Economy', 'MESTI Governance', 'Plastic Waste'],
    featured: true,
    accentColor: '#0C3B2E' // Deep green
  },
  {
    id: 'res-02',
    title: 'Establishing a Circular Economy Framework (CEF-PS): Consolidated Baseline Report',
    slug: 'cef-ps-consolidated-baseline-report',
    type: 'Report',
    topic: 'Circular Economy',
    programme: 'CEF-PS',
    publisher: 'UNIDO & EPA Ghana',
    author: 'GEF 10401 Project Technical Team',
    date: '2025',
    lastUpdated: 'November 2025',
    format: 'PDF · 8.4 MB',
    fileSize: '8.4 MB',
    fileType: 'PDF Document',
    pages: 112,
    readingTime: '45 mins',
    description: 'Detailed baseline analysis of industrial plastic polymer import, processing, consumption, and post-consumer recovery rates across Greater Accra and Ashanti regions.',
    summary: 'Commissioned under GEF Project 10401, this report provides empirical data on Ghana’s plastic polymer flows. It identifies critical leakage hotspots along major urban waterways and evaluates the operational capacity of over 40 informal recycling clusters and formal processing facilities.',
    language: 'English',
    keywords: ['CEF-PS', 'Baseline Study', 'Polymer Flows', 'UNIDO', 'Waste Mapping'],
    accentColor: '#157A9C' // Ocean blue
  },
  {
    id: 'res-03',
    title: 'Technical Guidance for Post-Consumer PET & HDPE Sorting and Washing',
    slug: 'technical-guidance-pet-hdpe-sorting-washing',
    type: 'Guideline',
    topic: 'Recycling and Recovery',
    programme: 'CEF-PS',
    publisher: 'EPA Ghana',
    author: 'Environmental Protection Agency Circularity Directorate',
    date: '2025',
    lastUpdated: 'August 2025',
    format: 'PDF · 3.6 MB',
    fileSize: '3.6 MB',
    fileType: 'PDF Guideline',
    pages: 42,
    readingTime: '20 mins',
    description: 'Standard operating procedures and quality assurance standards for community aggregators and small-to-medium recycling enterprises (SMEs).',
    summary: 'Provides step-by-step technical instructions on identifying plastic resin codes, removing contaminants, optimizing hot-wash cycles, and maintaining effluent treatment standards in decentralized recycling plants to meet food-grade and export-grade recyclate specifications.',
    language: 'English',
    keywords: ['PET', 'HDPE', 'Sorting SOP', 'Recycling Quality', 'EPA Standards'],
    accentColor: '#38A169' // Fresh green
  },
  {
    id: 'res-04',
    title: 'Marine Plastic Pollution Prevention Strategy for Ghana’s Coastline',
    slug: 'marine-plastic-pollution-prevention-strategy',
    type: 'Strategy',
    topic: 'Marine Plastic Pollution',
    programme: 'National Plastic Action Partnership',
    publisher: 'MESTI & NPAP Ghana',
    author: 'Coastal Zone Protection Taskforce',
    date: '2025',
    lastUpdated: 'October 2025',
    format: 'PDF · 6.1 MB',
    fileSize: '6.1 MB',
    fileType: 'PDF Strategy',
    pages: 78,
    readingTime: '35 mins',
    description: 'An integrated multi-stakeholder roadmap designed to intercept riverine plastic waste and eliminate municipal dumping along Ghana’s 550km shoreline.',
    summary: 'Details targeted interventions for coastal municipalities, including boom installations at river estuaries, fishing gear recovery incentives, and community-led beach monitoring programs linked to global marine debris tracking systems.',
    language: 'English',
    keywords: ['Marine Litter', 'Coastal Protection', 'NPAP', 'River Booms', 'Ghost Gear'],
    accentColor: '#157A9C'
  },
  {
    id: 'res-05',
    title: 'Circular Business Models for Informal Waste Aggregators: A Toolkit',
    slug: 'circular-business-models-informal-waste-aggregators',
    type: 'Toolkit',
    topic: 'Circular Business and Innovation',
    programme: 'CEF-PS',
    publisher: 'UNDP Ghana',
    author: 'Accra Innovation Hub & Waste Pickers Association',
    date: '2024',
    lastUpdated: 'May 2025',
    format: 'PDF / XLSX · 11.2 MB',
    fileSize: '11.2 MB',
    fileType: 'Interactive Toolkit',
    pages: 56,
    readingTime: '25 mins',
    description: 'Practical business templates, pricing calculators, and occupational health guidelines to assist informal waste pickers in transitioning to registered cooperatives.',
    summary: 'A modular training toolkit designed for field facilitators. Contains editable Excel cash-flow forecasting templates, contract negotiations advice with formal recyclers, and personal protective equipment (PPE) compliance checklists.',
    language: 'English',
    keywords: ['Informal Sector', 'Cooperatives', 'SME Toolkit', 'UNDP', 'Livelihoods'],
    accentColor: '#E5B73B' // Ghana gold
  },
  {
    id: 'res-06',
    title: 'Ghana Circular Plastics National Indicator Dataset (2021-2025)',
    slug: 'ghana-circular-plastics-indicator-dataset',
    type: 'Dataset',
    topic: 'Data and Research',
    programme: 'CPF Ghana',
    publisher: 'MESTI & Ghana Statistical Service',
    author: 'National Data Observatory Team',
    date: '2026',
    lastUpdated: 'January 2026',
    format: 'CSV / JSON · 2.1 MB',
    fileSize: '2.1 MB',
    fileType: 'Open Dataset',
    pages: 1,
    readingTime: '15 mins',
    description: 'Time-series dataset covering national resin imports, municipal plastic waste generation, formal recycling tonnage, and recycled resin export values.',
    summary: 'Open-access data tables validated by the Ghana Statistical Service and EPA. Includes regional breakdowns across all 16 regions of Ghana, serving as the official benchmark for National Plastic Action Partnership (NPAP) progress metrics.',
    language: 'English',
    keywords: ['Open Data', 'Statistical Service', 'Recycling Tonnage', 'Baseline Data', 'NPAP Metrics'],
    accentColor: '#17241F' // Dark charcoal
  },
  {
    id: 'res-07',
    title: 'Case Study: School-Based Plastic Segregation and Upcycling in Kumasi',
    slug: 'case-study-school-based-segregation-kumasi',
    type: 'Case Study',
    topic: 'Behaviour Change',
    programme: 'Partner Programmes',
    publisher: 'UNICEF & Ghana Education Service',
    author: 'Eco-Schools West Africa Initiative',
    date: '2024',
    lastUpdated: 'December 2024',
    format: 'PDF · 4.0 MB',
    fileSize: '4.0 MB',
    fileType: 'Case Study PDF',
    pages: 28,
    readingTime: '15 mins',
    description: 'An empirical evaluation of a two-year pilot program introducing source segregation and recycled plastic furniture fabrication across 50 public primary schools.',
    summary: 'Demonstrates how behavioral nudges and student-led environmental clubs achieved an 82% diversion rate for single-use water sachets and PET bottles within participating campuses, while generating supplemental revenue for school maintenance.',
    language: 'English',
    keywords: ['Kumasi Schools', 'Upcycling', 'Youth Education', 'Behaviour Change', 'UNICEF'],
    accentColor: '#17241F'
  },
  {
    id: 'res-08',
    title: 'Standard Operating Procedures for Municipal Plastic Waste Buy-Back Centres',
    slug: 'sop-municipal-plastic-buy-back-centres',
    type: 'Manual',
    topic: 'Standards and Compliance',
    programme: 'MESTI Initiatives',
    publisher: 'MESTI',
    author: 'Directorate of Science, Technology and Innovation',
    date: '2025',
    lastUpdated: 'September 2025',
    format: 'PDF · 3.1 MB',
    fileSize: '3.1 MB',
    fileType: 'SOP Manual',
    pages: 36,
    readingTime: '20 mins',
    description: 'Operational manual covering site selection, digital scale calibration, transparent pricing boards, and fire safety protocols for municipal buy-back kiosks.',
    summary: 'Designed for district assemblies and private waste management contractors. Establishes uniform standards for citizen-facing buy-back centers to ensure fair compensation and safe storage of compressed plastic bales.',
    language: 'English',
    keywords: ['Buy-Back Centres', 'Municipal Waste', 'SOPs', 'District Assemblies', 'Safety Protocols'],
    accentColor: '#38A169'
  }
];

export const FEATURED_RESOURCE: ResourceItem = {
  id: 'feat-01',
  title: 'Ghana’s Circular Plastics Transition: Framework, Progress and Opportunities',
  slug: 'ghanas-circular-plastics-transition-framework-progress-opportunities',
  type: 'Report',
  topic: 'Plastic Policy and Governance',
  programme: 'CPF Ghana',
  publisher: 'CPF Ghana / MESTI',
  author: 'National Circular Economy Secretariat & Lead Technical Advisers',
  date: '2026',
  lastUpdated: 'January 2026',
  format: 'PDF · 9.6 MB',
  fileSize: '9.6 MB',
  fileType: 'Flagship Publication',
  pages: 144,
  readingTime: '25 mins',
  description: 'A flagship publication presenting the policy direction, programmes, partnerships, emerging solutions and opportunities shaping Ghana’s transition towards a circular plastics economy.',
  summary: 'This comprehensive national report synthesizes four years of cross-sectoral collaboration under MESTI. It highlights key legislative breakthroughs, maps over $45M in ongoing catalytic green investments, and details priority intervention zones for polymer chemical recycling, eco-design innovations, and municipal infrastructure expansion through 2030.',
  language: 'English',
  keywords: ['Flagship Report', 'Circular Framework', 'Green Investment', 'MESTI 2026', 'National Roadmap'],
  featured: true,
  accentColor: '#E5B73B'
};

export const THEME_COLLECTIONS = [
  {
    id: 'col-policy',
    title: 'Policy and Governance',
    description: 'Policies, strategies, regulations and institutional resources supporting circular-plastics governance.',
    count: '32 Resources',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80',
    topicFilter: 'Plastic Policy and Governance'
  },
  {
    id: 'col-business',
    title: 'Circular Business and Innovation',
    description: 'Business models, technologies, SME experiences and practical circular solutions.',
    count: '28 Resources',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80',
    topicFilter: 'Circular Business and Innovation'
  },
  {
    id: 'col-recycling',
    title: 'Plastic Recovery and Recycling',
    description: 'Guidance, research and case studies covering collection, sorting, recovery and material processing.',
    count: '45 Resources',
    image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=1000&q=80',
    topicFilter: 'Recycling and Recovery'
  },
  {
    id: 'col-education',
    title: 'Education and Behaviour Change',
    description: 'Campaign materials, training resources and tools supporting public awareness and responsible plastic use.',
    count: '19 Resources',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    topicFilter: 'Behaviour Change'
  }
];

export const CEF_PS_RESOURCES = [
  {
    id: 'cef-01',
    title: 'Consolidated Project Baseline & Material Flow Analysis',
    category: 'Project Reports',
    format: 'PDF · 8.4 MB',
    date: 'Nov 2025',
    code: 'GEF-10401-R01'
  },
  {
    id: 'cef-02',
    title: 'Technical Guidelines for Food-Grade Recyclate Washing Plants',
    category: 'Technical Guidelines and SOPs',
    format: 'PDF · 4.2 MB',
    date: 'Aug 2025',
    code: 'GEF-10401-G04'
  },
  {
    id: 'cef-03',
    title: 'Project Monitoring and Evaluation Framework (2021-2026)',
    category: 'Workplans and Monitoring Resources',
    format: 'PDF / XLSX · 5.1 MB',
    date: 'Jan 2026',
    code: 'GEF-10401-ME'
  },
  {
    id: 'cef-04',
    title: 'Pilot Project Learning Materials: Informal Sector Integration',
    category: 'Pilot Project Learning Materials',
    format: 'ZIP Toolkit · 14.8 MB',
    date: 'Oct 2025',
    code: 'GEF-10401-L02'
  }
];

export const LATEST_ARTICLES = [
  {
    id: 'art-01',
    topic: 'VALUE CHAIN ANALYSIS',
    title: 'Understanding Ghana’s Plastic Value Chain',
    description: 'An overview of how plastics move through production, consumption, collection, recovery and recycling systems across urban and peri-urban centers.',
    author: 'CPF Ghana Research Team',
    date: 'January 18, 2026',
    readingTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    id: 'art-02',
    topic: 'ENTERPRISE SPOTLIGHT',
    title: 'The Role of Circular Enterprises',
    description: 'How businesses and local innovators can contribute to plastic recovery, employment and sustainable domestic production in Ghana.',
    author: 'MESTI Innovation Directorate',
    date: 'December 12, 2025',
    readingTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80',
    featured: false
  },
  {
    id: 'art-03',
    topic: 'COASTAL PROTECTION',
    title: 'Preventing Plastic Leakage into Waterways',
    description: 'Practical and policy approaches for reducing plastic waste entering drains, rivers and coastal environments along the Gulf of Guinea.',
    author: 'EPA Ghana Coastal Taskforce',
    date: 'November 28, 2025',
    readingTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=900&q=80',
    featured: false
  }
];
