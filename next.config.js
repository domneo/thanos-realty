const redirectsList = require("./utils/redirects");

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
];

module.exports = {
  assetPrefix: process.env.ASSET_PREFIX || undefined,
  poweredByHeader: false,
  compiler: {
    styledComponents: true,
  },
  env: {
    // This should be a randomly-generated 16-byte string,
    // but we will use this for now until we can ensure that the nonce
    // will be the same in _app.tsx
    NONCE: "JzxX7EUfto/JHDBwQknsVw==",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    domains: [
      "localhost",
      "via.placeholder.com",
      process.env.NEXT_PUBLIC_ASSET_DOMAIN,
    ],
  },
  async redirects() {
    return redirectsList;
  }
};
