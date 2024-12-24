import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    // Add rule to handle .node files for Webpack
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
      include: path.resolve(__dirname, 'node_modules/canvas'),
    });

    return config;
  },
};

export default nextConfig;
