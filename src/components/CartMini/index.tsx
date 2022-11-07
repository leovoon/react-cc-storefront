import { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import { mapState, mapDispatch } from '../../pages/Cart.page'
import BaseButton from '../BaseButton'
import CartItemList from '../CartItemList'
import styles from './CartMini.module.css'

const connector = connect(mapState, mapDispatch)

type CartMiniPropsType = ConnectedProps<typeof connector> & {
  onOverlayClick: () => void
}

class CartMini extends PureComponent<CartMiniPropsType> {
  render() {
    const {
      cartItems,
      cartTotalQty,
      resetCart,
      cartTotalPrice,
      currencySymbol,
    } = this.props
    return (
      <div
        title="toggle cart"
        className={styles.wrapper}
        aria-label="toggle cart"
      >
        <div
          onClick={() => this.props.onOverlayClick()}
          className={styles.overlay}
          aria-label="overlay"
        ></div>
        <div className={styles.cartMini}>
          <div className={styles.quantityText}>
            My Bag
            <span>
              , {cartTotalQty} {cartTotalQty > 1 ? 'items' : 'item'}
            </span>
          </div>

          <div>
            {cartItems.length === 0 && (
              <p className={styles.emptyCart}>Your cart is empty</p>
            )}
            <CartItemList mini={true} cartItems={cartItems} />
          </div>

          <div className={styles.totalPrice}>
            <span className={styles.label}>Total</span>
            <span className={styles.price}>
              {currencySymbol}
              {cartTotalPrice}
            </span>
          </div>

          <div className={styles.buttonGroup}>
            <Link
              to="/cart"
              title="go to cart page"
              aria-label="go to cart page"
            >
              <BaseButton
                onClick={() => this.props.onOverlayClick()}
                className={styles.button}
                plain
              >
                view bag
              </BaseButton>
            </Link>
            <BaseButton
              className={styles.button}
              onClick={() => {
                alert('Checked Out')
                resetCart()
              }}
            >
              check out
            </BaseButton>
          </div>
        </div>
      </div>
    )
  }
}

export default connector(CartMini)
