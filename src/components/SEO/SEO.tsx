import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  path: string
  type?: string
  image?: string
  keywords?: string
  structuredData?: object
}

function SEO({ title, description, path, type = 'website', image, keywords, structuredData }: SEOProps) {
  const siteUrl = 'https://bigdataghana.com'
  const fullUrl = `${siteUrl}${path}`
  const ogImage = image || `${siteUrl}/favicon.png`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="BigData Ghana" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_GH" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@bigdataghana" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO
