import { CurrencyAmount, Token } from 'beaconswap-core-sdk'

type TokenAddress = string

export type TokenBalancesMap = Record<TokenAddress, CurrencyAmount<Token>>
