import { vaultABI } from "app/config/vault/abi";
import { formatBalance, formatTvl } from "app/functions";
import { AppState } from "app/state";
import { useAppDispatch, useAppSelector } from "app/state/hooks";
import { BigNumber } from "ethers";
import { Interface } from "ethers/lib/utils";
import { useCallback, useMemo } from "react";
import { useBlockNumber } from "../application/hooks";
import { useMultipleContractSingleData } from "../multicall/hooks";
import { setPoolState } from "./actions";

const VAULT_INTERFACE = new Interface(vaultABI);

export function useVaultState(): AppState["vault"] {
  return useAppSelector((state) => state.vault);
}

export function useVaultActionHandlers(): {
  onChangePoolState: (pools: any[]) => void;
} {
  const dispatch = useAppDispatch();

  const onChangePoolState = useCallback(
    (pools: any[]) => {
      dispatch(setPoolState({ pools }));
    },
    [dispatch]
  );

  return {
    onChangePoolState,
  };
}

export function useFetchVaultsData() {
  const { pools } = useVaultState();
  const latestBlockNumber = useBlockNumber();

  // const earnedAddresses = pools.map((el: any) => el.earnContractAddress);

  // const results2 = useMultipleContractSingleData(
  //   earnedAddresses,
  //   VAULT_INTERFACE,
  //   "balance"
  // );

  // if (
  //   results2 &&
  //   Array.isArray(results2) &&
  //   results2.length === earnedAddresses.length
  // ) {
  //   const [{ result: balance }] = results2;
  //   balance?.map((i: BigNumber) => {
  //     console.log("balance => ", formatTvl(Number(formatBalance(i)), 1));
  //   });
  // }

  // const fetchVaultsData = useCallback(() => {
  //   console.log("fetch vaults");
  // }, [latestBlockNumber]);

  return useMemo(() => {
    return {
      pools,
    };
  }, [latestBlockNumber]);
}
