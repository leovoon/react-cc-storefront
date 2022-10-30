import { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import { Product } from '../../features/products/models/Product'
import { increment } from '../../features/products/productSlice'

import { RootState } from '../../store'
import QuickShopButton from '../QuickShopButton'
import styles from './ProductCard.module.css'

const mapState = (state: RootState) => ({
  selectedCurrency: state.currency.selectedCurrency,
  selectedAttributes: state.product.selectedAttributeSet,
})

const mapDispatch = {
  addToCart: increment,
}

const connector = connect(mapState, mapDispatch)
type ProductCardProps = ConnectedProps<typeof connector> & { product: Product }

class ProductCard extends PureComponent<ProductCardProps> {
  state = {
    isHovered: false,
  }

  handleHover = () => {
    this.setState({ isHovered: !this.state.isHovered })
  }

  handleQuickAddProduct = (product: Product) => {
    const { addToCart } = this.props
    if (!product.inStock) return

    const modifiedAttributes = product.attributes.map((attr) => {
      return {
        ...attr,
        items: attr.items.map((item) => {
          // first item is selected by default
          if (item.id === attr.items[0].id) {
            return {
              ...item,
              selected: true,
            }
          } else {
            return {
              ...item,
              selected: false,
            }
          }
        }),
      }
    })

    let newItem = { ...product, attributes: modifiedAttributes }

    addToCart(newItem)

    console.log('quickshop - ', newItem)
  }

  render() {
    const { isHovered } = this.state
    const { selectedCurrency } = this.props
    const { gallery, id, brand, name, prices, inStock } = this.props.product
    return (
      <div
        className={styles.card + ' ' + (isHovered && styles.hovered)}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      >
        <Link className={styles.card__link} to={`/product/${id}`} key={id}>
          <div className={styles.imageContainer}>
            <img src={gallery[0]} alt={name} />
            {!inStock && (
              <div className={styles.outOfStockOverlay}>OUT OF STOCK</div>
            )}
          </div>
          <div
            className={
              styles.content + ' ' + (!inStock && styles.outOfStockContent)
            }
          >
            <div className={styles.title}>
              {brand} {name}
            </div>
            <div className={styles.price}>
              {prices.map((price) => {
                if (price.currency.label === selectedCurrency) {
                  return price.currency.symbol + ' ' + price.amount
                }

                return null
              })}
            </div>
          </div>
        </Link>
        {isHovered && (
          <QuickShopButton
            onAddProduct={() => this.handleQuickAddProduct(this.props.product)}
          />
        )}
      </div>
    )
  }
}

export default connector(ProductCard)
