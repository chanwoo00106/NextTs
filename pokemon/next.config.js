/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['raw.githubusercontent.com', 'assets.pokemon.com'] }
}

module.exports = nextConfig
