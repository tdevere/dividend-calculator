module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // Add your allowed image domains here
  },
  env: {
    API_URL: process.env.API_URL, // Add your environment variables here
  },
  webpack: (config) => {
    // Custom webpack configuration
    return config;
  },
};