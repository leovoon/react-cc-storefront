import { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import cartIcon from '../../assets/cart.svg'
import { RootState } from '../../store'
import styles from './CartIcon.module.css'

const mapState = (state: RootState) => ({
  cartQuantity: state.product.cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  ),
})

const connector = connect(mapState)
type CartIconProps = ConnectedProps<typeof connector>

class CartIcon extends PureComponent<CartIconProps> {
  render() {
    const { cartQuantity } = this.props
    return (
      <div className={styles.cart}>
        {cartQuantity > 0 && (
          <div className={styles.cartQuantity}>
            <span>{cartQuantity}</span>
          </div>
        )}

        <img
          src={cartIcon}
          className={styles.cartIcon}
          alt="cart"
          width={20}
          height={20}
        />
      </div>
    )
  }
}

export default connector(CartIcon)
