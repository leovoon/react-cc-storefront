import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    selectedCurrency: 'USD',
  },

  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload
    },
  },
})

export const { setCurrency } = currencySlice.actions
export default currencySlice
