import { PureComponent } from 'react'
import { Cart } from '../../features/products/models/Product'
import CartItem from '../CartItem'
import styles from './CartItemList.module.css'

export default class CartItemList extends PureComponent<{
  cartItems: Cart
  mini: boolean
}> {
  render() {
    const { cartItems, mini } = this.props
    return (
      <div
        className={`
        ${styles.cartItemList}
        ${mini && styles.mini}
        `}
      >
        {cartItems.map((cartItem, idx) => (
          <CartItem key={idx} cartItem={cartItem} mini={mini} />
        ))}
      </div>
    )
  }
}
