const path = require('path')

module.exports = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.modules.push(path.resolve('./'))
    return config
  }
  // images: {
  //   domains: ['s3.us-east-2.amazonaws.com', 'nomics.com', 'reddit.com', 'images.pexels.com'],
  // },
}

// https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/AAVE.jpg