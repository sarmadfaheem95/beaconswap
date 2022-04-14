export const moonbeamPools = [
  {
    id: "moonbeam-bifi-maxi", // important key for apy & key
    name: "BST",
    token: "BST",
    tokenDescription: "Stellaswap",
    tokenAddress: "0x6c9b048354b3e1527d55dca5ad8d9513944609dc", // BST address
    tokenDecimals: 18,
    tokenDescriptionUrl: "#",
    earnedToken: "MBV", // important key for earn token
    earnedTokenAddress: "0xfF74223D9a04C17f11CFd85128539C97C435acF0", // vault address
    earnContractAddress: "0xfF74223D9a04C17f11CFd85128539C97C435acF0", // vault address
    pricePerFullShare: 1,
    tvl: 0,
    oracle: "lps",
    oracleId: "stellaswap-usdc-ftm",
    oraclePrice: 0,
    depositsPaused: false,
    status: "active",
    platform: "Stellaswap",
    assets: ["USDC", "FTM"],
    risks: [
      "COMPLEXITY_LOW",
      "BATTLE_TESTED",
      "IL_HIGH",
      "MCAP_HIGH",
      "AUDIT",
      "CONTRACTS_VERIFIED",
    ],
    stratType: "StratLP",
    withdrawalFee: "0%",
    addLiquidityUrl:
      "https://app.stellaswap.com/exchange/add/0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b/0xC19281F22A075E0F10351cd5D6Ea9f0AC63d4327",
    buyTokenUrl: "https://app.stellaswap.com/exchange/swap",
    createdAt: 1648745802,
  },
];
