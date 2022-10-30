import { PureComponent } from 'react'
import styles from './CartFooterText.module.css'
export default class CartFooterText extends PureComponent<{
  tax?: number
  quantity: number
  total: number
  currencySymbol: string
}> {
  render() {
    const { tax, quantity, total, currencySymbol } = this.props
    return (
      <footer className={styles.orderFooter}>
        <div className={styles.tax}>
          <span className={styles.label}>Tax {tax}%:</span>
          <span className={styles.value}>
            {currencySymbol} {total}
          </span>
        </div>
        <div className={styles.quantity}>
          <span className={styles.label}>Quantity:</span>
          <span className={styles.value}>{quantity}</span>
        </div>
        <div className={styles.total}>
          <span className={styles.label}> Total:</span>
          <span className={styles.value}>{currencySymbol + total}</span>
        </div>
      </footer>
    )
  }
}
