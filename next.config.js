/** @type {import('next').NextConfig} */
// const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  experimental: {
    appDir: true,
  },
};

// TODO: remove once Nextjs 13.2.1 is supported
// module.exports = withContentlayer(nextConfig);
module.exports = nextConfig;
