/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Remote } from '@core'
import {
  CollectionData,
  NftAssetsType,
  NftOrdersType,
  OpenSeaCollection
} from '@core/network/api/nfts/types'

import { NftsStateType } from './types'

const initialState: NftsStateType = {
  assets: Remote.NotAsked,
  marketplace: { page: 0, token_ids_queried: [] },
  orders: []
}

const nftsSlice = createSlice({
  initialState,
  name: 'nfts',
  reducers: {
    cancelListings: (state, action: PayloadAction<{ asset: NftAssetsType['assets'][0] }>) => {},
    createBuyOrder: (state, action: PayloadAction<{ order: NftOrdersType['orders'][0] }>) => {},
    createSellOrder: (state, action: PayloadAction<{ asset: NftAssetsType['assets'][0] }>) => {},
    fetchNftAssets: () => {},
    fetchNftAssetsFailure: (state, action: PayloadAction<string>) => {
      state.assets = Remote.Failure(action.payload)
    },
    fetchNftAssetsLoading: (state) => {
      state.assets = Remote.Loading
    },
    fetchNftAssetsSuccess: (state, action: PayloadAction<NftAssetsType['assets']>) => {
      state.assets = Remote.Success(action.payload)
    },
    fetchNftOrders: () => {},
    fetchNftOrdersFailure: (state, action: PayloadAction<string>) => {
      state.orders = [
        ...state.orders.slice(0, state.orders.length - 1),
        Remote.Failure(action.payload)
      ]
    },
    fetchNftOrdersLoading: (state) => {
      state.orders = [...state.orders, Remote.Loading]
    },
    fetchNftOrdersSuccess: (state, action: PayloadAction<NftOrdersType['orders']>) => {
      state.orders = [
        ...state.orders.slice(0, state.orders.length - 1),
        Remote.Success(action.payload)
      ]
    },
    resetNftOrders: (state) => {
      state.orders = []
    },
    setMarketplaceBounds: (state, action: PayloadAction<{ atBound: boolean }>) => {
      state.marketplace.atBound = action.payload.atBound
    },
    setMarketplaceData: (
      state,
      action: PayloadAction<{
        atBound?: boolean
        collection?: CollectionData
        page?: number
        token_ids_queried?: string[]
      }>
    ) => {
      if (action.payload.page) state.marketplace.page = action.payload.page
      if (action.payload.atBound) state.marketplace.atBound = action.payload.atBound
      if (action.payload.collection) state.marketplace.collection = action.payload.collection
      if (action.payload.token_ids_queried)
        state.marketplace.token_ids_queried = action.payload.token_ids_queried
    }
  }
})

const { actions } = nftsSlice
const nftsReducer = nftsSlice.reducer
export { actions, nftsReducer }
