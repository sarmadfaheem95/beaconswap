import { InformationCircleIcon } from "@heroicons/react/solid";
import { CurrencyLogoArray } from "app/components/CurrencyLogo";
import Typography from "app/components/Typography";
import {
  TABLE_TBODY_TD_CLASSNAME,
  TABLE_TBODY_TR_CLASSNAME,
} from "app/features/trident/constants";
import { classNames, formatNumber } from "app/functions";
import { useCurrency } from "app/hooks/Tokens";
import React, { FC, ReactNode, useState } from "react";
import { MouseoverTooltipContent } from "app/components/Tooltip";
import Link from "next/link";
import VaultListItemDetail from "./VaultListItemDetail";

interface VaultListItem {
  farm: any;
  onClick(x: ReactNode): void;
}

// @ts-ignore TYPE NEEDS FIXING
const VaultListItem: FC<VaultListItem> = ({ farm, onClick }) => {
  const token0 =
    useCurrency("0xacc15dc74880c9944775448304b263d191c6077f") ?? undefined;
  const token1 =
    useCurrency("0x8f2C7218f6b2c162b8bA60B5536E2830BaF0Ce4e") ?? undefined;
  const [expand, setExpand] = useState(false);
  return (
    <div
      className={classNames(
        "py-3 border-b border-dark-900",
        TABLE_TBODY_TR_CLASSNAME
      )}
    >
      <div
        className={classNames("grid grid-cols-4")}
        onClick={() => {
          setExpand(!expand);
        }}
      >
        <div
          className={classNames(
            "flex gap-2 border-none",
            TABLE_TBODY_TD_CLASSNAME(0, 4)
          )}
        >
          {token0 && token1 && (
            <CurrencyLogoArray currencies={[token0, token1]} dense size={32} />
          )}
          <div className="flex flex-col items-start">
            <Typography weight={700} className="flex gap-1 text-high-emphesis">
              {farm.name}
              {/* {"GLMR"}
              <span className="text-high-emphesis">-</span>
              {"FTM"}
              <span className="text-high-emphesis">LP</span> */}
            </Typography>
            <Typography variant="xs" className="text-low-emphesis">
              <span>Uses: {farm.tokenDescription}</span>
            </Typography>
            <div className="flex gap-3">
              <Link href="/swap">
                <Typography
                  variant="sm"
                  className="text-pink hover:text-pink/80 text-low-emphesis"
                >
                  Buy Token
                </Typography>
              </Link>
              <Link href="/farm">
                <Typography
                  variant="sm"
                  className="text-pink hover:text-pink/80 text-low-emphesis"
                >
                  Add Liquidity
                </Typography>
              </Link>
            </div>
          </div>
        </div>
        <div
          className={classNames(
            "flex flex-col justify-center border-none",
            TABLE_TBODY_TD_CLASSNAME(1, 4)
          )}
        >
          <Typography weight={700} className="text-high-emphesis">
            {formatNumber(0, false)}
          </Typography>
          <Typography weight={500} className="text-low-emphesis">
            {"Wallet"}
          </Typography>
        </div>
        <div
          className={classNames(
            "flex flex-col justify-center border-none",
            TABLE_TBODY_TD_CLASSNAME(2, 4)
          )}
        >
          <Typography weight={700} className="text-high-emphesis">
            {formatNumber(0, false)}
          </Typography>
          <Typography weight={500} className="text-low-emphesis">
            {"Deposited"}
          </Typography>
        </div>
        <div
          className={classNames("border-none", TABLE_TBODY_TD_CLASSNAME(3, 4))}
        >
          <div className="flex flex-col items-center">
            <Typography weight={700} className="text-high-emphesis">
              {formatNumber(0, false)}
            </Typography>
            <Typography
              weight={500}
              className="text-low-emphesis flex items-center"
            >
              {"APY"}
              <MouseoverTooltipContent
                placement="bottom"
                content={
                  <div className="bg-dark-900 p-3 w-70 flex flex-col gap-2">
                    <div className="flex justify-between gap-10">
                      <Typography
                        weight={700}
                        variant="sm"
                        className="text-high-emphesis"
                      >
                        {"Vault APR"}
                      </Typography>
                      <Typography
                        weight={500}
                        variant="sm"
                        className="text-high-emphesis"
                      >
                        {"0%"}
                      </Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography
                        weight={700}
                        variant="sm"
                        className="text-high-emphesis"
                      >
                        {"Trading APR"}
                      </Typography>
                      <Typography
                        weight={500}
                        variant="sm"
                        className="text-high-emphesis"
                      >
                        {"0%"}
                      </Typography>
                    </div>
                  </div>
                }
              >
                <InformationCircleIcon width={18} height={18} />
              </MouseoverTooltipContent>
            </Typography>
          </div>
          <div className="flex flex-col items-center px-5">
            <Typography weight={700} className="text-high-emphesis">
              {formatNumber(0, false)}
            </Typography>
            <Typography
              weight={500}
              className="text-low-emphesis flex items-center"
            >
              {"Daily"}
              <MouseoverTooltipContent
                placement="bottom"
                content={
                  <div className="bg-dark-900 p-3 w-70 flex flex-col gap-2">
                    <div className="flex justify-between gap-10">
                      <Typography
                        weight={700}
                        variant="sm"
                        className="text-high-emphesis"
                      >
                        {"Vault APR"}
                      </Typography>
                      <Typography
                        weight={500}
                        variant="sm"
                        className="text-high-emphesis"
                      >
                        {"0%"}
                      </Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography
                        weight={700}
                        variant="sm"
                        className="text-high-emphesis"
                      >
                        {"Trading APR"}
                      </Typography>
                      <Typography
                        weight={500}
                        variant="sm"
                        className="text-high-emphesis"
                      >
                        {"0%"}
                      </Typography>
                    </div>
                  </div>
                }
              >
                <InformationCircleIcon width={18} height={18} />
              </MouseoverTooltipContent>
            </Typography>
          </div>
          <div className="flex flex-col items-center pr-2">
            <Typography weight={700} className="text-high-emphesis">
              {formatNumber(0, false)}
            </Typography>
            <Typography
              weight={500}
              className="text-low-emphesis flex items-center"
            >
              {"TVL"}
              <MouseoverTooltipContent
                placement="bottom"
                content={
                  <div className="bg-dark-900 p-3 w-70 flex flex-col gap-2">
                    <div className="flex justify-between gap-10">
                      <Typography
                        weight={700}
                        variant="sm"
                        className="text-high-emphesis"
                      >
                        {"Vault APR"}
                      </Typography>
                      <Typography
                        weight={500}
                        variant="sm"
                        className="text-high-emphesis"
                      >
                        {"0%"}
                      </Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography
                        weight={700}
                        variant="sm"
                        className="text-high-emphesis"
                      >
                        {"Trading APR"}
                      </Typography>
                      <Typography
                        weight={500}
                        variant="sm"
                        className="text-high-emphesis"
                      >
                        {"0%"}
                      </Typography>
                    </div>
                  </div>
                }
              >
                <InformationCircleIcon width={18} height={18} />
              </MouseoverTooltipContent>
            </Typography>
          </div>
        </div>
      </div>
      <VaultListItemDetail expand={expand} farm={farm} />
    </div>
  );
};

export default VaultListItem;
