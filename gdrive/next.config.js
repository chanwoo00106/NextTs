/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: "http://gdrive.o-r.kr:4000",
  },
};

module.exports = nextConfig;
