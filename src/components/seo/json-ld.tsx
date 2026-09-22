import { siteConfig } from "@/lib/config/site";

/**
 * JSON-LD structured data. In App Router we emit the <script> tag directly
 * rather than via next/script (which only supports `beforeInteractive` in
 * `pages/_document.js`). JSON-LD has zero runtime cost; inlining it is fine.
 */

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    areaServed: { "@type": "Country", name: "Zambia" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        availableLanguage: ["English"],
      },
    ],
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.facebook,
      siteConfig.social.instagram,
    ].filter(Boolean),
  };

  return <JsonLd data={data} />;
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-ZM",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
  return <JsonLd data={data} />;
}