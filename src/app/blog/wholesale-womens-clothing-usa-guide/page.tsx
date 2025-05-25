'use client';

import Script from 'next/script';
import { MDXProvider } from '@mdx-js/react';
import { articleJsonLd, faqJsonLd, breadcrumbJsonLd } from './metadata';
import Content from './content.mdx';

const components = {
  // Add any custom components here if needed
};

export default function WholesaleGuidePage() {
  return (
    <>
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <MDXProvider components={components}>
        <article className="prose prose-lg max-w-none">
          <Content />
        </article>
      </MDXProvider>
    </>
  );
}