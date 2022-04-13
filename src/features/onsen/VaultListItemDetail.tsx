import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Token } from "@sushiswap/core-sdk";
import AssetInput from "app/components/AssetInput";
import Button from "app/components/Button";
import Divider from "app/components/Divider";
import Typography from "app/components/Typography";
import { Transition } from "@headlessui/react";
import { classNames } from "app/functions";
import { getAddress } from "@ethersproject/address";
import React, { FC } from "react";
import { useCurrencyBalance } from "app/state/wallet/hooks";
import { useActiveWeb3React } from "app/services/web3";

interface VaultListItemDetail {
  farm: any;
  expand: boolean;
  // onClick(x: ReactNode): void;
}

// @ts-ignore TYPE NEEDS FIXING
const VaultListItemDetail: FC<VaultListItemDetail> = ({
  farm,
  expand,
  // onClick,
}) => {
  const { i18n } = useLingui();
  const { chainId, account } = useActiveWeb3React();
  const liquidityToken = new Token(
    // @ts-ignore TYPE NEEDS FIXING
    chainId || 1,
    getAddress("0x8Ca74d649dc7faFDECfae2bCFDF1f8cB27f082b5"),
    18,
    "SLP"
  );
  const balance = useCurrencyBalance(account ?? undefined, liquidityToken);
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
          <div className="p-5 grid grid-cols-2 gap-10">
            <div>
              <div className="flex justify-end gap-2 pb-4">
                {["25", "50", "75", "100"].map((multiplier, i) => (
                  <Button
                    variant="outlined"
                    size="xs"
                    color={"pink"}
                    key={i}
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
                currency={liquidityToken}
                value={"0"}
                onChange={() => {}}
                balance={undefined}
                showMax={false}
              />
              <div className="py-5 w-1/4 m-auto">
                <Button
                  fullWidth
                  loading={false}
                  color="pink"
                  // onClick={approve}
                  className="border-none bg-gradient-to-r from-pink/95 hover:from-pink to-red/95 hover:to-red text-dark"
                  // disabled={approvalState !== ApprovalState.NOT_APPROVED}
                >
                  {i18n._(t`Approve`)}
                </Button>
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
                {
                  " You will receive mooStellaswapGLMR-FTM token as a receipt for your deposited GLMR-FTM LP assets. This token is needed to withdraw your GLMR-FTM LP, do not trade or transfer mooStellaswapGLMR-FTM to strangers!"
                }
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
                currency={liquidityToken}
                value={"0"}
                onChange={() => {}}
                balance={undefined}
                showMax={false}
              />
              <div className="py-5 w-1/4 m-auto">
                <Button
                  fullWidth
                  loading={false}
                  color="pink"
                  // onClick={approve}
                  className="border-none bg-gradient-to-r from-pink/95 hover:from-pink to-red/95 hover:to-red text-dark"
                  // disabled={approvalState !== ApprovalState.NOT_APPROVED}
                >
                  {i18n._(t`Widthdraw`)}
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
                {"1. Redeem mooStellaswapGLMR-FTM token for GLMR-FTM LP"}
              </Typography>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default VaultListItemDetail;
