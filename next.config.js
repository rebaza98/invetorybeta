/** @type {import('next').NextConfig} */
const nextConfig = {}

//module.exports = nextConfig
/*module.exports = {
    images: {
        domains: ["tailwindui.com", "images.unsplash.com", "testinventario2.s3.us-east-2.amazonaws.com", "inventario24.s3.amazonaws.com"]
    }
}*/
module.exports = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'inventario24.s3.amazonaws.com',
          port: '',
          pathname: '**',
        },
        {
            protocol: 'https',
            hostname: 'tailwindui.com',
            port: '',
            pathname: '**',
        },
        {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '**',
          },
      ],
    },
  }
  