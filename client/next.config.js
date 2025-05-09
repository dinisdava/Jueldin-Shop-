module.exports = {
  async rewrites() {
    return process.env.NODE_ENV === 'development' 
      ? [
          {
            source: '/api/:path*',
            destination: 'http://localhost:5000/api/:path*'
          }
        ]
      : [];  // Em produção, API será acessada por URL absoluta
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    API_URL: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5000' 
      : process.env.NEXT_PUBLIC_API_URL
  }
};
