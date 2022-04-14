import Typography from "app/components/Typography";
import { TABLE_WRAPPER_DIV_CLASSNAME } from "app/features/trident/constants";
import { classNames } from "app/functions";
import { useInfiniteScroll } from "app/hooks/useInfiniteScroll";
import useSortableData from "app/hooks/useSortableData";
import { useFetchVaultsData } from "app/state/vault/hooks";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import VaultListItem from "./VaultListItem";

// @ts-ignore TYPE NEEDS FIXING
const VaultList = () => {
  const { items } = useSortableData([], {
    key: "tvl",
    direction: "descending",
  });
  const [numDisplayed, setNumDisplayed] = useInfiniteScroll(items);
  const { pools } = useFetchVaultsData();

  return pools.length > 0 ? (
    <>
      <div className={classNames(TABLE_WRAPPER_DIV_CLASSNAME)}>
        <div className="divide-y divide-dark-900  min-w-[768px]">
          <InfiniteScroll
            dataLength={numDisplayed}
            next={() => setNumDisplayed(numDisplayed + 5)}
            hasMore={true}
            loader={null}
          >
            {pools.map((farm, index) => (
              <VaultListItem key={index} farm={farm} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  ) : (
    <div className="w-full py-6 text-center">
      <Typography
        variant="base"
        className="text-low-emphesis pt-10 text-center "
      >
        No vaults found.
      </Typography>
    </div>
  );
};

export default VaultList;
