import { PureComponent } from 'react'
import BaseButton from '../../BaseButton'
import styles from './ProductDetailContent.module.css'
import ProductPriceTag from '../../ProductPriceTag'
import { Product } from '../../../features/products/models/Product'
import ProductBrandName from '../../ProductBrandName'
import ProductAttributes from '../../ProductAttributes'
import ProductDescription from '../../ProductDescription'
import {
  increment,
  setSelectedAttributeSet,
} from '../../../features/products/productSlice'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../../store'

const mapState = (state: RootState) => ({
  selectedCurrency: state.currency.selectedCurrency,
  selectedAttributes: state.product.selectedAttributeSet,
})

const mapDispatch = {
  addToCart: increment,
}

const connector = connect(mapState, mapDispatch)
type ProductDetailSidebarProps = ConnectedProps<typeof connector> & {
  product: Product
}

class ProductDetailSidebar extends PureComponent<ProductDetailSidebarProps> {
  getPriceFromSelectedCurrency = () => {
    const { selectedCurrency } = this.props
    const { prices } = this.props.product
    return (
      prices.find((price) => price.currency.label === selectedCurrency) ||
      prices[0]
    )
  }

  handleAddToCart = () => {
    const { addToCart, selectedAttributes } = this.props
    const product = this.props.product

    if (!this.props.product.inStock) return

    if (!this.validateSelectedAttributes()) {
      alert('Please select all attributes.')
      return
    }

    const currentSelectedAttributes = selectedAttributes.find(
      (set) => set.pid === product.id
    )?.attributes

    if (currentSelectedAttributes) {
      let newProduct = { ...product, attributes: currentSelectedAttributes }
      addToCart(newProduct)
      console.log('fromDetailPage - ', newProduct)
    }
  }

  validateSelectedAttributes = () => {
    const { product, selectedAttributes } = this.props
    let isValid = true

    const currentSelectedAttributes = selectedAttributes.find(
      (set) => set.pid === product.id
    )?.attributes

    if (currentSelectedAttributes) {
      currentSelectedAttributes.forEach((attr) => {
        if (!attr.items.find((item) => item.selected)) {
          isValid = false
        }
      })
    }

    return isValid
  }

  componentDidMount(): void {
    const { id, attributes } = this.props.product
    setSelectedAttributeSet({
      pid: id,
      attributes: attributes,
    })
  }

  render() {
    const { id, brand, name, description, attributes, inStock } =
      this.props.product
    return (
      <div className={styles.content}>
        <ProductBrandName brand={brand} name={name} mini={false} />

        <ProductPriceTag
          price={this.getPriceFromSelectedCurrency()}
          mini={false}
        />

        <ProductAttributes
          editMode
          attributes={attributes}
          productId={id}
          mini={false}
        />

        <BaseButton
          onClick={this.handleAddToCart}
          className={`${styles.addToCartButton}`}
          disabled={!inStock}
        >
          {inStock ? 'Add to cart' : 'Out of stock'}
        </BaseButton>

        <ProductDescription description={description} />
      </div>
    )
  }
}

export default connector(ProductDetailSidebar)
