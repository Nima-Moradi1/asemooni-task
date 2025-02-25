import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    domains : [
      'testback.asemooni.org'
    ] ,
    remotePatterns : [
      {
        protocol : "https",
        hostname : 'testback.asemooni.org',
        pathname: "/uploads/images/**",
      }
    ]
  }
};

export default nextConfig;
