import { createAction } from '@reduxjs/toolkit'

export const setPoolState = createAction<{ pools: any[] }>('vault/pool')
