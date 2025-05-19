// src/app/about/metadata.ts
import { Metadata } from 'next';
import { aboutMetadata } from '../seo-pages-metadata';

export const metadata: Metadata = aboutMetadata;

// JSON-LD data is exported for use in the layout file
export { aboutJsonLd, aboutBreadcrumbJsonLd, organizationJsonLd } from '../seo-pages-metadata';