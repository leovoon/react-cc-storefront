import { PureComponent } from 'react'
import CartIcon from '../CartIcon'
import CartMini from '../CartMini'
import styles from './CartMiniToggler.module.css'
export default class CartMiniToggler extends PureComponent {
  state = {
    isCartMiniOpen: false,
  }

  handleCartMiniOpen = () => {
    this.setState((prevState: { isCartMiniOpen: boolean }) => ({
      isCartMiniOpen: !prevState.isCartMiniOpen,
    }))
  }

  render() {
    const { isCartMiniOpen } = this.state
    return (
      <>
        <div
          onClick={() => this.handleCartMiniOpen()}
          className={styles.cartMiniToggle}
        >
          <CartIcon />
        </div>{' '}
        {isCartMiniOpen && (
          <CartMini onOverlayClick={() => this.handleCartMiniOpen()} />
        )}
      </>
    )
  }
}
