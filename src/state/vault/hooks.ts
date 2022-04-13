import { vaultABI } from "app/config/vault/abi";
import { useVaultContract, useVaultMultiContract } from "app/hooks";
import { AppState } from "app/state";
import { useAppDispatch, useAppSelector } from "app/state/hooks";
import { Interface } from "ethers/lib/utils";
import { useCallback, useMemo } from "react";
import { useBlockNumber } from "../application/hooks";
import { useMultipleContractSingleData } from "../multicall/hooks";
import { setPoolState } from "./actions";

const VAULT_INTERFACE = new Interface(vaultABI);

export function useVaultState(): AppState["vault"] {
  return useAppSelector((state) => state.vault);
}

export function useVaultsData(pools: any) {
  // const vaultCalls = pools.map(
  //   useMemo((pool: any) => {
  //     // const vault: any = useVaultContract(pool.earnedTokenAddress);
  //     return {
  //       pricePerFullShare: "vault.methods.getPricePerFullShare()",
  //       tvl: "vault.methods.balance()",
  //     };
  //   }),
  //   []
  // );
  // console.log("vaultCalls => ", vaultCalls);
  // const results = useMultipleContractSingleData(earnedAddresses, VAULT_INTERFACE, 'getPricePerFullShare');
  // return null;
  // return dispatch => {
  // dispatch({
  //   type: VAULT_FETCH_VAULTS_DATA_BEGIN,
  // });
  // if (!web3) {
  //   // setup default provider to get vault data
  //   web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl()));
  // }
  // const promise = new Promise((resolve, reject) => {
  //   const multicall = new MultiCall(web3, getNetworkMulticall());
  //   const vaultCalls = pools.map(pool => {
  //     const vault = new web3.eth.Contract(vaultABI, pool.earnedTokenAddress);
  //     return {
  //       pricePerFullShare: vault.methods.getPricePerFullShare(),
  //       tvl: vault.methods.balance(),
  //     };
  //   });
  //   Promise.all([
  //     multicall.all([vaultCalls]).then(result => result[0]),
  //     whenPricesLoaded(), // need to wait until prices are loaded in cache
  //   ])
  //     .then(data => {
  //       const newPools = pools.map((pool, i) => {
  //         const pricePerFullShare = byDecimals(data[0][i].pricePerFullShare, 18).toNumber();
  //         return {
  //           pricePerFullShare: new BigNumber(pricePerFullShare).toNumber() || 1,
  //           tvl: byDecimals(data[0][i].tvl, pool.tokenDecimals).toNumber(),
  //           oraclePrice: fetchPrice({ id: pool.oracleId }) || 0,
  //         };
  //       });
  //       dispatch({
  //         type: VAULT_FETCH_VAULTS_DATA_SUCCESS,
  //         data: newPools,
  //       });
  //       resolve();
  //     })
  //     .catch(error => {
  //       dispatch({
  //         type: VAULT_FETCH_VAULTS_DATA_FAILURE,
  //       });
  //       reject(error.message || error);
  //     });
  // });
  // return promise;
  // };
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
  const dispatch = useAppDispatch();
  const { pools } = useVaultState();
  // debugger
  const latestBlockNumber = useBlockNumber();
  // const contract = useVaultContract(
  //   "0xd1bAb603eee03fA99A378d90d5d83186fEB81aA9"
  // );
  // const earnedAddresses = pools.map((el: any) => el.earnedTokenAddress)
  // const results = useMultipleContractSingleData(earnedAddresses, VAULT_INTERFACE, 'getPricePerFullShare');
  // const { result } = useSingleCallResult(contract, "getPricePerFullShare");
  const earnedAddresses = pools.map((el: any) => el.earnedTokenAddress);
  // const vaultsData = useMemo(
  //   () =>
  //     useMultipleContractSingleData(
  //       earnedAddresses,
  //       VAULT_INTERFACE,
  //       "getPricePerFullShare"
  //     ),
  //   [pools, latestBlockNumber]
  // );
  const fetchVaultsData = useCallback(() => {
    console.log("asd");
  }, []);

  // useCallback(
  //   (data: any) => {
  //     const earnedAddresses = data.map((el: any) => el.earnedTokenAddress)
  //     const results = useMultipleContractSingleData(earnedAddresses, VAULT_INTERFACE, 'getPricePerFullShare');
  //     console.log("Start vaults", results);
  //     // console.log('RESULTS ==> ', results)
  //     return useMemo(() => results, [])
  //   },
  //   [latestBlockNumber]
  // );

  return useMemo(() => {
    return {
      pools,
      fetchVaultsData,
    };
  }, [latestBlockNumber]);
}
