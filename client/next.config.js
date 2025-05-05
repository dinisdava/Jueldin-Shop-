module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*'
      }
    ];
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};
