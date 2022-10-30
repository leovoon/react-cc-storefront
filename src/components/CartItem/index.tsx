import { PureComponent } from 'react'
import ImageSlider from '../ImageSlider'
import ProductAttributes from '../ProductAttributes'
import ProductBrandName from '../ProductBrandName'
import ProductPriceTag from '../ProductPriceTag'
import plusIcon from '../../assets/plus.svg'
import minusIcon from '../../assets/minus.svg'
import styles from './CartItem.module.css'
import type { CartItem } from '../../features/products/models/Product'
import BaseIconButton from '../BaseIconButton'
import { RootState } from '../../store'
import { connect, ConnectedProps } from 'react-redux'
import { increment, decrement } from '../../features/products/productSlice'

const mapState = (state: RootState) => ({
  selectedCurrency: state.currency.selectedCurrency,
})

const mapDispatch = {
  increment,
  decrement,
}

const connector = connect(mapState, mapDispatch)

type CartItemProps = ConnectedProps<typeof connector> & {
  cartItem: CartItem
  mini: boolean
}

class CartItemComponent extends PureComponent<CartItemProps> {
  getPriceByCurrency = () => {
    const { cartItem, selectedCurrency } = this.props
    const price = cartItem.prices.find(
      (p) => p.currency.label === selectedCurrency
    )
    return price || cartItem.prices[0]
  }

  render() {
    const { increment, decrement, cartItem, mini } = this.props
    const { brand, name, quantity, attributes, id, gallery } = cartItem
    return (
      <div className={`${styles.cartItem} ${mini && styles.mini}`}>
        <div className={styles.cartItem__info}>
          <ProductBrandName brand={brand} name={name} mini={mini} />
          <ProductPriceTag
            noTitle
            price={this.getPriceByCurrency()}
            mini={mini}
          />
          <ProductAttributes
            editMode={false}
            attributes={attributes}
            productId={id}
            mini={mini}
          />
        </div>

        <div className={styles.cartItem__rightSection}>
          <div className={styles.cartItem__quantityButtons}>
            <BaseIconButton
              onClick={() => {
                increment(cartItem)
              }}
              icon={plusIcon}
            />
            <span>{quantity}</span>
            <BaseIconButton
              onClick={() => {
                decrement(cartItem)
              }}
              icon={minusIcon}
            />
          </div>
          <ImageSlider images={gallery} mini={mini} />
        </div>
      </div>
    )
  }
}

export default connector(CartItemComponent)
