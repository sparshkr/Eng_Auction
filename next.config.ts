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
      }
    ]
  }
};

export default nextConfig;
