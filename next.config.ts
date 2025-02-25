import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    remotePatterns : [
      {
        protocol : "https",
        hostname : 'testback.asemooni.org'
      }
    ]
  }
};

export default nextConfig;
