module.exports = {
  async redirects() {
    return [
      {
        source: `/c/:path*`,
        destination: "/collection/:path*",
        permanent: true,
      },
      {
        source: `/a/:path*`,
        destination: "/asset/:path*",
        permanent: true,
      },
      {
        source: `/l/:path*`,
        destination: "/launch/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      "ipfs.io",
      "ipfs.infura.io",
      "cf-ipfs.com",
      "cloudflare-ipfs.com",
      "gateway.pinata.cloud",
      "arweave.net",
    ],
  },
  reactStrictMode: true,
};
