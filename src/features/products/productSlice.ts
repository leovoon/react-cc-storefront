import { Cart, CartItem, Product, SelectedAttributeSet } from './models/Product'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import isEqual from 'lodash.isequal'
import { set, get } from 'local-storage'
const initialState: {
  cart: Cart
  cartTotal: number
  selectedAttributeSet: SelectedAttributeSet[]
} = {
  cart: get('cart') ?? ([] as Cart),
  cartTotal: 0,
  selectedAttributeSet: [],
}

const modifyQtyByOne = (
  cart: Cart,
  selectedProduct: Product,
  modificationType: 'INCREMENT' | 'DECREMENT'
) => {
  const previousCart = [...cart]

  const exisitingCartItemWithSameAttributes = previousCart.find(
    (cartItem) =>
      cartItem.id === selectedProduct.id &&
      isEqual(cartItem.attributes, selectedProduct.attributes)
  )

  if (exisitingCartItemWithSameAttributes) {
    if (modificationType === 'INCREMENT') {
      exisitingCartItemWithSameAttributes.quantity += 1
    } else if (modificationType === 'DECREMENT') {
      if (exisitingCartItemWithSameAttributes.quantity === 1) {
        const index = previousCart.findIndex(
          (cartItem) =>
            cartItem.id === selectedProduct.id &&
            isEqual(cartItem.attributes, selectedProduct.attributes)
        )
        previousCart.splice(index, 1)
      }
      exisitingCartItemWithSameAttributes.quantity -= 1
    }
  } else {
    previousCart.push({
      ...selectedProduct,
      quantity: 1,
    })
  }

  return previousCart
}

export const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    increment: (state, action: PayloadAction<Product | CartItem>) => {
      const modifiedCart = modifyQtyByOne(
        state.cart,
        action.payload,
        'INCREMENT'
      )

      state.cart = modifiedCart
      set('cart', state.cart)
    },
    decrement: (state, action: PayloadAction<Product>) => {
      const modifiedCart = modifyQtyByOne(
        state.cart,
        action.payload,
        'DECREMENT'
      )
      state.cart = modifiedCart
      set('cart', state.cart)
    },

    resetCart: (state) => {
      state.cart = []
      set('cart', state.cart)
    },
    setSelectedAttributeSet: (
      state,
      action: PayloadAction<SelectedAttributeSet>
    ) => {
      const { pid, attributes } = action.payload

      const existingAttributeSet = state.selectedAttributeSet.find(
        (attrSet) => attrSet.pid === pid
      )

      if (existingAttributeSet) {
        existingAttributeSet.attributes = attributes
      } else {
        state.selectedAttributeSet.push({
          pid,
          attributes,
        })
      }
    },
  },
})

export const { increment, decrement, resetCart, setSelectedAttributeSet } =
  productSlice.actions

export default productSlice
