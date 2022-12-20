export const siteConfig =
  process.env.NEXT_PUBLIC_NETWORK == "opt-mainnet"
    ? {
        CHAIN_NAME: "Optimism",
        CHAIN_ID: "0xa",
        NETWORK: "opt-mainnet",
        WEBSITE_URL: "qx.app",
        RPC_URL: "https://mainnet.optimism.io",
        EXCHANGE_V6: "0x998EF16Ea4111094EB5eE72fC2c6f4e6E8647666",
        PAUSABLE_ZONE: "0x5D9102D6a0734Fc6731A958a685DE18101d98357",
        L1_BLOCK_EXPLORER_URL: "https://etherscan.io",
        L2_BLOCK_EXPLORER_URL: "https://optimistic.etherscan.io",
        L1_BRIDGE_ADDRESS: "0x5a7749f83b81B301cAb5f48EB8516B986DAef23D",
        L2_BRIDGE_ADDRESS: "0x4200000000000000000000000000000000000014",
        REWARDS_WRAPPER: "0xC78A09D6a4badecc7614A339FD264B7290361ef1",
        REWARDS_DERIVER: "0xaFB71004636fCAf6fb15959A7dD19db4779c3237",
        CAMPAIGN_TRACKER_ADDRESS: "0x3Dadc74B465034276bE0Fa55240e1a67d7e3a266",
        BACKEND_URL: "",
        BACKEND_TOKEN: "",
      }
    : process.env.NEXT_PUBLIC_NETWORK == "opt-goerli"
    ? {
        CHAIN_NAME: "Optimism Goerli",
        CHAIN_ID: "0x1a4",
        NETWORK: "opt-goerli",
        WEBSITE_URL: "goerli.qx.app",
        RPC_URL: "https://goerli.optimism.io",
        EXCHANGE_V6: "0xA943370D40d2470d45CECD9093278fd8BB830e58",
        PAUSABLE_ZONE: "0x7305a4d8C9d01AeD3c0CBA9A9F0F359e92160833",
        L1_BLOCK_EXPLORER_URL: "https://goerli.etherscan.io",
        L2_BLOCK_EXPLORER_URL: "https://goerli-optimism.etherscan.io",
        L1_BRIDGE_ADDRESS: "0x8DD330DdE8D9898d43b4dc840Da27A07dF91b3c9",
        L2_BRIDGE_ADDRESS: "0x4200000000000000000000000000000000000014",
        LOGO_BADGE: "Goerli",
        BACKEND_URL: "",
        BACKEND_TOKEN: "",
      }
    : {};
