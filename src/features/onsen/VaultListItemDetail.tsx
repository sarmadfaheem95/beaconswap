import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Token } from "@sushiswap/core-sdk";
import AssetInput from "app/components/AssetInput";
import Button from "app/components/Button";
import Divider from "app/components/Divider";
import Typography from "app/components/Typography";
import { Transition } from "@headlessui/react";
import { classNames, tryParseAmount } from "app/functions";
import { getAddress } from "@ethersproject/address";
import React, { FC, useState } from "react";
import { useCurrencyBalance } from "app/state/wallet/hooks";
import { useActiveWeb3React } from "app/services/web3";
import { ApprovalState, useApproveCallback } from "app/hooks";
import { useTransactionAdder } from "app/state/transactions/hooks";
import useVault from "app/features/onsen/useVault";
interface VaultListItemDetail {
  farm: any;
  expand: boolean;
}

// @ts-ignore TYPE NEEDS FIXING
const VaultListItemDetail: FC<VaultListItemDetail> = ({ farm, expand }) => {
  const { i18n } = useLingui();
  const { chainId, account } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();
  const { deposit, withdraw } = useVault(farm?.earnedTokenAddress);
  const [depositState, setDepositState] = useState<string>();
  const [withdrawValue, setWithdrawValue] = useState<string>();
  const depositToken = new Token(
    // @ts-ignore TYPE NEEDS FIXING
    chainId || 1,
    getAddress(farm?.tokenAddress),
    18,
    farm?.name
  );
  const widthdrawToken = new Token(
    // @ts-ignore TYPE NEEDS FIXING
    chainId || 1,
    getAddress(farm?.earnedTokenAddress),
    18,
    farm?.earnedToken
  );
  const depositBalance = useCurrencyBalance(account ?? undefined, depositToken);
  const parsedDepositValue = tryParseAmount(depositState, depositToken);
  const withdrawBalance = useCurrencyBalance(
    account ?? undefined,
    widthdrawToken
  );
  const parsedWithdrawValue = tryParseAmount(withdrawValue, widthdrawToken);
  const [approvalState, approve] = useApproveCallback(
    parsedDepositValue,
    farm?.earnedTokenAddress
  );
  const depositError = !parsedDepositValue
    ? "Enter an amount"
    : depositBalance?.lessThan(parsedDepositValue)
    ? "Insufficient balance"
    : undefined;
  const isDepositValid = !depositError;
  const withdrawError = !parsedWithdrawValue
    ? "Enter an amount"
    : // @ts-ignore TYPE NEEDS FIXING
    withdrawBalance?.lessThan(parsedWithdrawValue)
    ? "Insufficient balance"
    : undefined;
  const isWithdrawValid = !withdrawError;  

  return (
    <div>
      <style jsx>{`
        .fade-in {
          opacity: 1;
          animation-name: show;
          animation-iteration-count: 1;
          animation-timing-function: ease-in;
          animation-duration: 0.3s;
        }
        .fade-out {
          opacity: 0;
          animation-name: hide;
          animation-iteration-count: 1;
          animation-timing-function: ease-out;
          animation-duration: 0.3s;
        }
        @keyframes show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes hide {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
      <Transition
        show={expand}
        appear={true}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={classNames("fade-in", " p-10 hover:cursor-default")}>
          <Divider />
          {!account ? (
            <Typography variant="base" className="text-low-emphesis pt-10 text-center text-pink">
              Wallet connection to Moonbeam required.
            </Typography>
          ) : (
            <div className="p-5 grid grid-cols-2 gap-10">
              <div>
                <div className="flex justify-end gap-2 pb-4">
                  {["25", "50", "75", "100"].map((multiplier, i) => (
                    <Button
                      variant="outlined"
                      size="xs"
                      color={"pink"}
                      key={i}
                      onClick={() => {
                        setDepositState(
                          depositBalance
                            ?.multiply(multiplier)
                            .divide(100)
                            .toExact()
                        );
                      }}
                      className={classNames(
                        "text-md border border-opacity-50 focus:ring-pink border-pink"
                      )}
                    >
                      {multiplier === "100" ? "MAX" : multiplier + "%"}
                    </Button>
                  ))}
                </div>
                <AssetInput
                  currencyLogo={false}
                  currency={depositToken}
                  value={depositState}
                  onChange={(e: any) => {
                    setDepositState(e);
                  }}
                  balance={undefined}
                  showMax={false}
                />
                <div className="py-5 w-1/3 m-auto">
                  {isDepositValid &&
                  (approvalState === ApprovalState.NOT_APPROVED ||
                    approvalState === ApprovalState.PENDING) ? (
                    <Button
                      fullWidth
                      loading={approvalState === ApprovalState.PENDING}
                      color="pink"
                      onClick={approve}
                      className="border-none bg-gradient-to-r from-pink/95 hover:from-pink to-red/95 hover:to-red text-dark"
                      disabled={approvalState !== ApprovalState.NOT_APPROVED}
                    >
                      {i18n._(t`Approve`)}
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      color={"pink"}
                      onClick={async () => {
                        try {
                          // @ts-ignore TYPE NEEDS FIXING
                          const tx = await deposit(
                            parsedDepositValue?.quotient.toString()
                          );
                          if (tx?.hash) {
                            addTransaction(tx, {
                              summary: `Deposit ${farm.name} success`,
                            });
                          }
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                      disabled={!isDepositValid}
                      className="border-none bg-gradient-to-r from-pink/95 hover:from-pink to-red/95 hover:to-red text-dark"
                    >
                      {depositError || `Deposit`}
                    </Button>
                  )}
                </div>
                <div className="flex items-center justify-center text-low-emphesis">
                  <Typography weight={700}>
                    {"Deposit fee: "}
                    <span>0%</span>
                  </Typography>
                  <span>,</span>
                  <Typography weight={700}>
                    {" Withdrawal fee: "}
                    <span>0%</span>
                  </Typography>
                </div>
                <Typography
                  weight={500}
                  variant="xxs"
                  className="text-center text-low-emphesis pt-3"
                >
                  {`You will receive ${farm?.earnedToken} token as a receipt for your deposited ${farm?.name} assets. This token is needed to withdraw your ${farm?.name}, do not trade or transfer ${farm?.earnedToken} to strangers!`}
                </Typography>
              </div>
              <div>
                <div className="flex justify-end gap-2 pb-4">
                  {["25", "50", "75", "100"].map((multiplier, i) => (
                    <Button
                      variant="outlined"
                      size="xs"
                      color={"pink"}
                      key={i}
                      onClick={() => {
                        setWithdrawValue(
                          withdrawBalance
                            ?.multiply(multiplier)
                            .divide(100)
                            .toExact()
                        );
                      }}
                      className={classNames(
                        "text-md border border-opacity-50 focus:ring-pink border-pink"
                      )}
                    >
                      {multiplier === "100" ? "MAX" : multiplier + "%"}
                    </Button>
                  ))}
                </div>
                <AssetInput
                  currencyLogo={false}
                  currency={widthdrawToken}
                  value={withdrawValue}
                  onChange={(e) => {
                    setWithdrawValue(e);
                  }}
                  balance={undefined}
                  showMax={false}
                />
                <div className="py-5 w-1/3 m-auto">
                  <Button
                    fullWidth
                    loading={false}
                    color="pink"
                    onClick={async () => {
                      try {
                        // @ts-ignore TYPE NEEDS FIXING
                        const tx = await withdraw(
                          parsedWithdrawValue?.quotient.toString()
                        );
                        if (tx?.hash) {
                          addTransaction(tx, {
                            summary: `Withdraw ${farm.earnedToken} success`,
                          });
                        }
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                    className="border-none bg-gradient-to-r from-pink/95 hover:from-pink to-red/95 hover:to-red text-dark"
                    disabled={!isWithdrawValid}
                  >
                    {withdrawError || i18n._(t`Withdraw`)}
                  </Button>
                </div>
                <Typography
                  weight={500}
                  className="text-center text-low-emphesis pt-3"
                >
                  {"Withdrawal will result in: "}
                </Typography>
                <Typography
                  weight={500}
                  variant="xs"
                  className="text-center text-low-emphesis pt-3"
                >
                  {`1. Redeem ${farm?.earnedToken} token for ${farm?.name}`}
                </Typography>
              </div>
            </div>
          )}
        </div>
      </Transition>
    </div>
  );
};

export default VaultListItemDetail;
