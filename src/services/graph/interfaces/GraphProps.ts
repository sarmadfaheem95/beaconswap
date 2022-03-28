import { ChainId } from 'beaconswap-core-sdk'
import { SWRConfiguration } from 'swr'

export interface GraphProps {
  chainId?: ChainId
  variables?: { [key: string]: any }
  shouldFetch?: boolean
  swrConfig?: SWRConfiguration
}
