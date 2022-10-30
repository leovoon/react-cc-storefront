import { PureComponent } from 'react'
import styles from './QuickShopButton.module.css'
import quickshopIcon from '../../assets/quickshop.svg'
export default class QuickShopButton extends PureComponent<{
  onAddProduct: () => void
}> {
  render() {
    return (
      <button onClick={this.props.onAddProduct} className={styles.quickshopBtn}>
        <img
          className={styles.icon}
          src={quickshopIcon}
          alt="quick add to cart"
        />
      </button>
    )
  }
}
