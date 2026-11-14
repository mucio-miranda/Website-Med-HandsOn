export default function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Med HandsOn",
    "url": "https://medhandson.com.br",
    "logo": "https://medhandson.com.br/logo.svg",
    "sameAs": [
      "https://www.instagram.com/medhandson",
      "https://www.youtube.com/@MedHandsOn"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-81-98225-2905",
      "contactType": "customer service",
      "email": "medhandson.br@gmail.com",
      "areaServed": "BR",
      "availableLanguage": "Portuguese"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Recife",
      "addressRegion": "PE",
      "addressCountry": "BR"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}








