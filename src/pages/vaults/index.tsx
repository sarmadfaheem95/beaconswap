import Head from "next/head";
import { TridentBody } from "app/layouts/Trident";
import useFuse from "app/hooks/useFuse";
import { Chef, PairType } from "app/features/onsen/enum";
import Search from "app/components/Search";
import { useRouter } from "next/router";
import useFarmRewards from "app/hooks/useFarmRewards";
import VaultList from "app/features/onsen/VaultList";

export default function Vaults() {

  const router = useRouter();
  const type =
    router.query.filter === null ? "all" : (router.query.filter as string);
  const options = {
    keys: ["pair.id", "pair.token0.symbol", "pair.token1.symbol"],
    threshold: 0.4,
  };
  const FILTER = {
    // @ts-ignore TYPE NEEDS FIXING
    all: (farm) => farm.allocPoint !== "0" && farm.chef !== Chef.OLD_FARMS,
    // @ts-ignore TYPE NEEDS FIXING
    portfolio: (farm) => farm?.amount && !farm.amount.isZero(),
    // @ts-ignore TYPE NEEDS FIXING
    sushi: (farm) =>
      farm.pair.type === PairType.SWAP && farm.allocPoint !== "0",
    // @ts-ignore TYPE NEEDS FIXING
    kashi: (farm) =>
      farm.pair.type === PairType.KASHI && farm.allocPoint !== "0",
    // @ts-ignore TYPE NEEDS FIXING
    "2x": (farm) =>
      (farm.chef === Chef.MASTERCHEF_V2 || farm.chef === Chef.MINICHEF) &&
      farm.rewards.length > 1 &&
      farm.allocPoint !== "0",
    // @ts-ignore TYPE NEEDS FIXING
    old: (farm) => farm.chef === Chef.OLD_FARMS,
  };
  const rewards = useFarmRewards();
  const data = rewards.filter((farm) => {
    // @ts-ignore TYPE NEEDS FIXING
    return type in FILTER ? FILTER[type](farm) : true;
  });
  const { result, term, search } = useFuse({
    data,
    options,
  });
  return (
    <>
      <Head>
        <title>Vaults | Beaconswap</title>
        <meta
          key="description"
          name="description"
          content="Beaconswap vaults..."
        />
        <meta
          key="twitter:description"
          name="twitter:description"
          content="Beaconswap vaults..."
        />
        <meta
          key="og:description"
          property="og:description"
          content="Beaconswap vaults..."
        />
      </Head>
      <TridentBody>
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Search search={search} term={term} />
          </div>
        </div>
        <VaultList />
      </TridentBody>
    </>
  );
}
