import { createReducer } from '@reduxjs/toolkit'
import { moonbeamPools } from 'app/config/vault/moonbeam_pools'

import { setPoolState } from './actions'

export interface VaultState {
  readonly pools: any[]
  readonly tokens: any[]
  readonly apys: any[]
}

const initialState: VaultState = {
  pools: moonbeamPools,
  tokens: [],
  apys: []
}

export default createReducer<VaultState>(initialState, (builder) =>
  builder
  .addCase(setPoolState, (state, { payload: { pools } }) => {
    return {
      ...state,
      pools
    }
  })
)
