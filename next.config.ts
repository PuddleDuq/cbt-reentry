import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cbt-reentry",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
