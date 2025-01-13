import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"api.auctionx.dev"
      },
      {
        protocol:"https",
        hostname:"gvauction.auctionx.dev"
      },
      {
        protocol:"https",
        hostname:"s3-alpha-sig.figma.com"
      },
      {
        protocol:"https",
        hostname:"new-image-domain.com"
      }
    ]
  },
  experimental: {
    appDir: true
  },
  env: {
    CUSTOM_API_ENDPOINT: process.env.CUSTOM_API_ENDPOINT
  }
};

export default nextConfig;