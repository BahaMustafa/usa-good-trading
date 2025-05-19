// src/app/contact/metadata.ts
import { Metadata } from 'next';
import { contactMetadata } from '../seo-pages-metadata';

export const metadata: Metadata = contactMetadata;

// JSON-LD data is exported for use in the layout file
export { contactJsonLd, contactBreadcrumbJsonLd, organizationJsonLd } from '../seo-pages-metadata';