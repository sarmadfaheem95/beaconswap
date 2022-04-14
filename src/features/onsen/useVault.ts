import { useVaultContract } from "app/hooks/useContract";
import { useActiveWeb3React } from "app/services/web3";
import { useCallback } from "react";

export default function useVault(contractAddress: string) {
  const { account } = useActiveWeb3React();

  const contract = useVaultContract(contractAddress);

  // Deposit
  const deposit = useCallback(
    async (amount?: string) => {
      try {
        let tx;

        tx = await contract?.deposit(amount);

        return tx;
      } catch (e) {
        console.error(e);
        return e;
      }
    },
    [account, contractAddress, contract]
  );

  // Withdraw
  const withdraw = useCallback(
    async (amount?: string) => {
      try {
        let tx;

        tx = await contract?.withdraw(amount);

        return tx;
      } catch (e) {
        console.error(e);
        return e;
      }
    },
    [account, contractAddress, contract]
  );

  return { deposit, withdraw };
}
