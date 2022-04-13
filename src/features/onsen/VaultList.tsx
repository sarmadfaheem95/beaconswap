import Dots from "app/components/Dots";
import {
  TABLE_WRAPPER_DIV_CLASSNAME,
} from "app/features/trident/constants";
import { classNames } from "app/functions";
import { useInfiniteScroll } from "app/hooks/useInfiniteScroll";
import useSortableData from "app/hooks/useSortableData";
import { useActiveWeb3React } from "app/services/web3";
import { useFetchVaultsData } from "app/state/vault/hooks";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import VaultListItem from "./VaultListItem";

// @ts-ignore TYPE NEEDS FIXING
const VaultList = ({ farms, term }) => {
  const { items } = useSortableData(farms, {
    key: "tvl",
    direction: "descending",
  });
  const { chainId } = useActiveWeb3React();
  const [numDisplayed, setNumDisplayed] = useInfiniteScroll(items);
  const [selectedFarm, setSelectedFarm] = useState<any>();
  const { pools } = useFetchVaultsData();

  return pools ? (
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
              <VaultListItem
                key={index}
                farm={farm}
                onClick={() => {
                  setSelectedFarm(farm);
                }}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  ) : (
    <div className="w-full py-6 text-center">
      {term ? <span>No Results.</span> : <Dots>Loading</Dots>}
    </div>
  );
};

export default VaultList;
