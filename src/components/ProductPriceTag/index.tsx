import { PureComponent } from 'react'
import { Price } from '../../features/products/models/Product'
import styles from './ProductPriceTag.module.css'
export default class ProductPriceTag extends PureComponent<{
  price: Price
  noTitle?: boolean
  mini: boolean
}> {
  render() {
    const { price, noTitle, mini } = this.props
    return (
      <div>
        {!noTitle && <div className={styles.title}>PRICE:</div>}
        <div className={`${styles.priceTag} ${mini && styles.mini}`}>
          <span>{price.currency.symbol}</span>
          <span>{price.amount}</span>
        </div>
      </div>
    )
  }
}
