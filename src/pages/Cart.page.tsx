import { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import CartItemList from '../components/CartItemList'
import ProductOrderFooterText from '../components/CartFooterText'
import { RootState } from '../store'
import styles from './Cart.module.css'
import BaseButton from '../components/BaseButton'
import { resetCart } from '../features/products/productSlice'
import { getCurrencies } from '../features/currency/services/currency.service'

export const mapState = (state: RootState, ownProps: any) => ({
  cartItems: state.product.cart,

  cartTotalQty: state.product.cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  ),

  cartTotalPrice: +state.product.cart
    .reduce(
      (acc, item) =>
        acc +
        item.quantity *
          (item.prices.find(
            (p) => p.currency.label === state.currency.selectedCurrency
          )?.amount || 0),
      0
    )
    .toFixed(2),

  currency: state.currency.selectedCurrency,
  currencySymbol:
    getCurrencies
      .select()(state)
      .data?.find(
        (curriency) => curriency.label === state.currency.selectedCurrency
      )?.symbol || '$',
})

export const mapDispatch = {
  resetCart,
}

const connector = connect(mapState, mapDispatch)
type CartProps = ConnectedProps<typeof connector>

class Cart extends PureComponent<CartProps> {
  state = {
    tax: 21,
  }
  // Unused
  getTotalPricePlusTax = () => {
    const { cartTotalPrice } = this.props
    return +(cartTotalPrice + (cartTotalPrice * this.state.tax) / 100).toFixed(
      2
    )
  }
  render() {
    const { cartItems, cartTotalPrice, cartTotalQty, currencySymbol } =
      this.props

    if (cartItems.length === 0) {
      return <div className={styles.emptyCart}>Your cart is empty</div>
    }

    return (
      <>
        <h1 className={styles.heading}>Cart</h1>
        <CartItemList mini={false} cartItems={cartItems} />

        <ProductOrderFooterText
          tax={this.state.tax}
          quantity={cartTotalQty}
          total={+cartTotalPrice.toFixed(2)}
          currencySymbol={currencySymbol || ''}
        />

        <BaseButton
          onClick={() => console.log(cartItems)}
          className={styles.orderButton}
        >
          Order
        </BaseButton>
      </>
    )
  }
}

export default connector(Cart)
