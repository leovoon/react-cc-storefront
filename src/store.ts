import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
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

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
