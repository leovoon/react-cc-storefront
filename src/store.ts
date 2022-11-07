import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit'
import { currencyAPI } from './features/currency/services/currency.service'
import currencySlice from './features/currency/currencySlice'
import productSlice from './features/products/productSlice'
import { productApi } from './features/products/services/product.service'
export const store = configureStore({
  reducer: {
    [currencyAPI.reducerPath]: currencyAPI.reducer,
    [productApi.reducerPath]: productApi.reducer,
    currency: currencySlice.reducer,
    product: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(currencyAPI.middleware)
      .concat(productApi.middleware),
})

const rootReducer = combineReducers({
  product: productSlice.reducer,
  currency: currencySlice.reducer,
  [currencyAPI.reducerPath]: currencyAPI.reducer,
  [productApi.reducerPath]: productApi.reducer,
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(currencyAPI.middleware)
        .concat(productApi.middleware),
    preloadedState,
  })
}

export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
