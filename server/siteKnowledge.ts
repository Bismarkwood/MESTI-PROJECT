// Full site knowledge corpus, injected into the assistant's context so it can
// answer detailed questions about anything on the website. Keep this in sync
// with site content. (If this grows very large, switch to a Bedrock Knowledge
// Base / RAG so only relevant chunks are retrieved per query.)

export const SITE_KNOWLEDGE = `# BigData Ghana — Reference Knowledge

## Company
- BigData Ghana (BDG), legally BigData Ghana Limited. Founded 2016. Based in Accra, Ghana; serves Ghana and West Africa.
- A Ghanaian technology and intelligence company combining geospatial intelligence, cloud, data analytics and AI to help organisations understand the places, systems, assets and risks behind their decisions.
- Positioning: "You decide better with us." Narrative: "from a technology company to a decision company."
- Advantage: global platforms show you a map; BDG tells you what that map means in Ghana. Grounded in 8+ years of Ghana-specific spatial data. "No competitor holds what we hold."
- Sectors: government, banking, agriculture, logistics, real estate.
- Numbers: 8+ years of Ghana-specific data; team of ~15-20 across 5+ disciplines; 5 flagship platforms; proven delivery across 4 sectors.
- AWS Certified Partner; also Odoo Ready Partner. Team holds AWS Cloud Practitioner, Solutions Architect, and AI Practitioner certs.

## Services
1. Geospatial Intelligence & Earth Observation (/geospatial): "Land analytics that protect your investment." Turns 8 years of Ghana spatial data into site selection, flood-risk mapping, land suitability, satellite imagery analysis, boundary detection, encroachment/land-dispute mapping, and custom spatial platforms. Outcome: smarter site selection and spatial risk removed before capital is committed.
2. Cloud Computing / Cloud & Data Platforms (/cloud-platforms): AWS Certified Partner. Services: AWS architecture & deployment, cloud migration, managed cloud support, infrastructure monitoring, backup & disaster recovery, cloud security review, cost optimisation, DevOps/CI-CD, hosting, database & API deployment. Value: infra that scales, real-time non-siloed data, cloud costs that fall via optimisation.
3. AI & Automation (/ai-automation): "Intelligent systems built for how you work." Services: intelligent process automation, voice & conversational AI, predictive analytics & modelling, custom AI system development, AI integration & deployment, ongoing model monitoring. Impact: 24/7 faster customer response, fewer manual processes, more productive teams.
4. Data Analytics (/data-analytics): "Your data already has the answers." Services: data pipeline & warehousing, dashboard & reporting, predictive analytics, data visualization, data quality & governance, ad-hoc analysis. Turns scattered data into decision-ready intelligence and real-time leadership dashboards.
5. Risk Intelligence (cross-cutting): "See risk before it becomes loss." Risk visible across geography, operations and assets; early-warning systems; multi-layer intelligence for decision confidence.

## Projects (Proof, /proof)
Theme: "Intelligence that shapes better decisions" across infrastructure, climate, agriculture, logistics, data platforms.
- National Forest Monitoring System (2023, with the Forestry Commission): AWS cloud geospatial processing using near real-time Sentinel satellite data for land use/land cover, forest loss/gain, GHG emissions estimation over any area; supports REDD+ climate reporting.
- BDG Flood Platform / National Flood Intelligence System (2023, for NADMO): real-time flood monitoring and early warning across all 16 regions using satellite data, rainfall intelligence and spatial modelling.
- MLNR Spatial Data Infrastructure (2022, Ministry of Lands and Natural Resources): national spatial data infrastructure; digitises land records, maps boundaries, land-administration decision support.
- Data Analysis for Indomie (2024): analysed scratch-card promotion data for regional demand patterns and marketing/distribution insight.
- Vehicle Traffic Enforcement Application for Ghana Police Service (MTTD).
- GIS/RS Solution in Elections; Development of ERP; Ghana Electronic Mapping & Monitoring System for project M&E; Regional & Constituency Maps and data services; Standardizing City-Level Data-Gathering (SCiLeD); ESICOME (mobile/web GIS for sanitary inspections & compliance); Digital Mapping Verification for Gushiegu District; ForestTrace AI Ghana; Route Advisor.

## Solutions / Products (/solutions)
- BigConnect AI (bigconnectai.bigdataghana.com): AI virtual receptionist, answers calls 24/7 with natural bilingual (English/French) conversation, collects caller details, understands intent, auto-generates follow-up summaries. Built on AWS, powered by Amazon Bedrock Nova Pro. For banking, healthcare, government, insurance, hospitality, education, SMEs.
- SendLine SMS (sendlinesms.com): bulk/scheduled SMS, templates, real-time delivery tracking, OTP authentication, REST API for sites/apps/CRMs/ERPs. For SMEs, banks, schools, churches, hospitals, fintechs, e-commerce, government, NGOs.
- Maize Intelligence: crop yield estimation weeks before harvest from farm size, crop type, planting data and field samples; multiple crop types; shareable outputs. For smallholder farmers, agribusinesses, researchers, institutions. "Estimate. Plan. Grow."

## Team (/team) — ~15 members
- Mr. Henry Baffoe — Managing Director
- Nana Yaa Fordwour — Head of Finance & Administrative Officer
- Priscillia Fianu — Cloud Engineer
- Akwasi Darkwa Anto — Data & AI Lead
- Gertrude Chichi — Cloud Engineer Assistant
- Logan Linford Kojo — Marketing Head
- Dzehu Mighty — Associate Software Developer
- Yaa Oparebea Acquah — Assistant Finance
- Afra Owusu-Addo — Technical Writer & Geo Developer
- Amram Afriyie — Earth Observation Desk Coordinator
- Nii Amon Ashie — Marketer
- Kwaku Quartey Ansah — Associate Software Developer
- Bismark Gyebi Duah — Lead Product Designer
- Nancy Wayua — Associate GIS Developer
- Emmanuel Kyei Baffour — Cloud Engineer
Culture: "Built on curiosity, collaboration, and purpose." 20+ team members, 5+ disciplines, 8+ years together.

## Insights / Articles (/insights)
- "The hidden geography of Ghana's investment risk" (Geospatial/Real estate, Jul 2026): spatial blind spots in Accra's growth corridors; >40% of high-value Greater Accra sites carry a material spatial risk missed by traditional due diligence.
- "Your loan portfolio has a geography..." (Banking/Climate risk whitepaper, Jun 2026): with Bank of Ghana's Climate Related Financial Risk Directive active, 15-25% of some banks' commercial real-estate collateral sits in flood/climate-exposed areas not reflected in valuations.
- "The yield gap: why Ghana's agricultural investments underperform" (Agriculture/Data, May 2026): within-district yield variance can exceed 300%; spatially-informed investors see 20-40% better returns.
- "Where Accra is growing next" (Urban growth/Logistics, Apr 2026): five commercial corridors growing >15%/yr, three off the radar; ~18-24 month early-position window.
- "The data-driven organisations quietly winning in Ghana" (AI/Competitive intelligence, Mar 2026): winners built data infrastructure 2-3 years ago; the decision-quality gap compounds.
Article filters: Blog, Insights, Whitepapers. Author byline: BigData Ghana Research.

## About (/about)
- "From a technology company to a decision company." Ghana-specific decision intelligence built over eight years.
- Values: Intelligence-First; Local Expertise; Innovation; Impact (measured by decisions improved — protecting forests, predicting floods, optimising logistics, strengthening businesses).
- Timeline: 2016 founded (geospatial focus); 2018 first national-scale spatial platform for government; 2020 became AWS Partner; 2022 launched National Forest Monitoring System with the Forestry Commission; 2024 released BigConnect AI; 2025 serving 5+ sectors with flagship products.

## Careers (/careers)
All roles full-time, Accra, Ghana. Open roles: Cloud Engineer (AWS infra for geospatial/AI workloads), GIS Developer (spatial platforms, satellite imagery, web mapping), Data Analyst (banking/agriculture/logistics/real-estate insight & dashboards), Software Engineer (full-stack React/Node/TypeScript, APIs), Product Designer (UX for geospatial dashboards & AI products, Figma).

## Contact (/contact)
- Email: info@bigdataghana.com. Phone: +233 59 943 2731.
- Office: No. 4 Blewusi Rd, Airport Residential, Accra, Ghana (GA-117-2050).
- Social: Instagram @bigdataghana; LinkedIn /company/bigdata-ghana-limited. Form responds within 24 hours.

## Clients & Partners
- Clients / trusted by: AFC, Electoral Commission (EC), Indomie, Parliament of Ghana, USAID, GIZ, Digital Earth Africa, NITA, University of Ghana, World Cocoa Foundation, NTL, NTMEL, ECOM, Academic City.
- Partners: AWS (Certified Partner), Odoo (Ready Partner), ECURS, Academic City, API Technologies, Agbedus Consult.
- Named project clients: NADMO, Forestry Commission of Ghana, Ministry of Lands and Natural Resources, Ghana Police Service (MTTD), Indomie, Gushiegu District.`
