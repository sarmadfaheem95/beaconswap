import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId } from '@sushiswap/core-sdk'
import ExternalLink from 'app/components/ExternalLink'
import Search from 'app/components/Search'
import Typography from 'app/components/Typography'
import { Chef, PairType } from 'app/features/onsen/enum'
import FarmList from 'app/features/onsen/FarmList'
import OnsenFilter from 'app/features/onsen/FarmMenu'
import useFarmRewards from 'app/hooks/useFarmRewards'
import useFuse from 'app/hooks/useFuse'
import { TridentBody } from 'app/layouts/Trident'
import { useActiveWeb3React } from 'app/services/web3'
import { useRouter } from 'next/router'
import React from 'react'

export default function Farm(): JSX.Element {
  const { i18n } = useLingui()
  const { chainId } = useActiveWeb3React()

  const router = useRouter()
  const type = router.query.filter === null ? 'all' : (router.query.filter as string)

  const FILTER = {
    // @ts-ignore TYPE NEEDS FIXING
    all: (farm) => farm.allocPoint !== '0' && farm.chef !== Chef.OLD_FARMS,
    // @ts-ignore TYPE NEEDS FIXING
    portfolio: (farm) => farm?.amount && !farm.amount.isZero(),
    // @ts-ignore TYPE NEEDS FIXING
    sushi: (farm) => farm.pair.type === PairType.SWAP && farm.allocPoint !== '0',
    // @ts-ignore TYPE NEEDS FIXING
    kashi: (farm) => farm.pair.type === PairType.KASHI && farm.allocPoint !== '0',
    // @ts-ignore TYPE NEEDS FIXING
    '2x': (farm) =>
      (farm.chef === Chef.MASTERCHEF_V2 || farm.chef === Chef.MINICHEF) &&
      farm.rewards.length > 1 &&
      farm.allocPoint !== '0',
    // @ts-ignore TYPE NEEDS FIXING
    old: (farm) => farm.chef === Chef.OLD_FARMS,
  }

  const rewards = useFarmRewards()

  const data = rewards.filter((farm) => {
    // @ts-ignore TYPE NEEDS FIXING
    return type in FILTER ? FILTER[type](farm) : true
  })

  const options = {
    keys: ['pair.id', 'pair.token0.symbol', 'pair.token1.symbol'],
    threshold: 0.4,
  }

  const { result, term, search } = useFuse({
    data,
    options,
  })

  const farms = [
    {
        "id": "0",
        "pair": {
            "id": "0x8Ca74d649dc7faFDECfae2bCFDF1f8cB27f082b5",
            "reserveUSD": "0",
            "reserveETH": "0.362045889373195433",
            "volumeUSD": "0",
            "untrackedVolumeUSD": "0",
            "trackedReserveETH": "0",
            "token0": {
              "id": "0xacc15dc74880c9944775448304b263d191c6077f",
              "name": "Wrapped GLMR",
              "symbol": "WGLMR",
              "totalSupply": "20360",
              "derivedETH": "0"
          },
            "token1": {
                "id": "0x8f2C7218f6b2c162b8bA60B5536E2830BaF0Ce4e",
                "name": "BEACON",
                "symbol": "BEACON",
                "totalSupply": "20360",
                "derivedETH": "0"
            },
            "reserve0": "0.362045889373195433",
            "reserve1": "279.777433574631174454",
            "token0Price": "0.001294049647776967644478087881386768",
            "token1Price": "772.7678777378348624561723942767192",
            "totalSupply": "9.960921401663906502",
            "txCount": "600",
            "timestamp": "1646078226",
            "decimals": 18,
            "type": 0
        },
        "rewarder": {
          "id": "0x5AC28eC801d6C5f2c438Ff5e79b18157e2403dce",
          "rewardToken": "0x8f2C7218f6b2c162b8bA60B5536E2830BaF0Ce4e",
          "rewardPerSecond": "1000000000000000000"
        },
        "allocPoint": "1000",
        "lastRewardTime": "1646163102",
        "accSushiPerShare": "0",
        "slpBalance": "16005132767",
        "userCount": "1",
        "miniChef": {
          "id": "0x0Ce2cE45563BfcAd73a3d874dAF21Fd2E582E364",
          "sushiPerSecond": "1000000",
          "totalAllocPoint": "1000"
        },
        "chef": 2,
        "owner": {
            "id": "0x011e52e4e40cf9498c79273329e8827b21e2e581",
            "sushiPerSecond": "0",
            "totalAllocPoint": "12500"
        },
        "balance": 0.07391628057560773,
        "feeApyPerHour": null,
        "feeApyPerDay": null,
        "feeApyPerMonth": null,
        "feeApyPerYear": null,
        "rewardAprPerHour": null,
        "rewardAprPerDay": null,
        "rewardAprPerMonth": null,
        "rewardAprPerYear": null,
        "roiPerBlock": null,
        "roiPerHour": null,
        "roiPerDay": null,
        "roiPerMonth": null,
        "roiPerYear": null,
        "rewards": [
            {
                "currency": {
                    "chainId": 1,
                    "decimals": 18,
                    "symbol": "SUSHI",
                    "name": "SushiToken",
                    "isNative": false,
                    "isToken": true,
                    "address": "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2"
                },
                "rewardPerBlock": 0,
                "rewardPerDay": 0,
                "rewardPrice": 3.9433512903278203
            },
            {
                "currency": {
                    "chainId": 1284,
                    "decimals": 18,
                    "symbol": "GLMR",
                    "name": "Glimmer",
                    "isNative": true,
                    "isToken": false
                },
                "rewardPerBlock": 0,
                "rewardPerDay": 0,
                "rewardPrice": 0
            }
        ],
        "tvl": 0
    }
  ]

  return (
    <>
      {/* <TridentHeader className="sm:!flex-row justify-between items-center" pattern="bg-bubble">
        <div>
          <Typography variant="h2" className="text-high-emphesis" weight={700}>
            {i18n._(t`Onsen Menu`)}
          </Typography>
          <Typography variant="sm" weight={400}>
            {i18n._(t`Earn fees and rewards by depositing and staking your tokens to the platform.`)}
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button id="btn-create-new-pool" size="sm">
            <a
              href="https://docs.google.com/document/d/19bL55ZTjKtxlom2CpVo6K8jL1e-OZ13y6y9AQgw_qT4"
              target="_blank"
              rel="noreferrer"
            >
              {i18n._(t`Apply for Onsen`)}
            </a>
          </Button>
        </div>
      </TridentHeader> */}
      <TridentBody>
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Search search={search} term={term} />
            <OnsenFilter />
          </div>
          <FarmList farms={farms} term={term} />
          {chainId && chainId === ChainId.CELO && (
            <Typography variant="xs" weight={700} className="italic text-center text-secondary">
              {i18n._(t`Users can now bridge back to Celo using a new version of Optics.`)}{' '}
              <ExternalLink
                color="blue"
                id={`celo-optics-info-link`}
                href="https://medium.com/@0xJiro/celo-farms-update-migrating-to-the-optics-v2-bridge-e8075d1c9ea"
              >
                {i18n._(t`Click for more info on Optics V1 Migration.`)}
              </ExternalLink>
            </Typography>
          )}
        </div>
      </TridentBody>
    </>
  )
}
