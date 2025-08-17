import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // output: 'export',
  // distDir: 'build',
  // images: {
  //     unoptimized: true,
  // },
  trailingSlash: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
