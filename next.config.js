/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/usa-good-trading',
  images: {
    unoptimized: true,
  },
  // This is important for GitHub Pages
  assetPrefix: '/usa-good-trading/',
  trailingSlash: true,
};

module.exports = nextConfig;