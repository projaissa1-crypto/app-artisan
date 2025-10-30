/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  // Enable static export for Capacitor
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Add trailing slashes for better routing
  trailingSlash: true,
  // Remove i18n for static export (will use client-side i18n)
  // i18n: {
  //   locales: ['ar', 'fr'],
  //   defaultLocale: 'ar',
  // },
};

module.exports = withPWA(nextConfig);
