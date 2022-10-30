import { PureComponent } from 'react'
import { Product } from '../../features/products/models/Product'
import ProductImageViewer from './ProductDetailImageViewer'
import ProductDetailContent from './ProductDetailContent'
import styles from './ProductDetail.module.css'

export default class ProductDetail extends PureComponent<{ product: Product }> {
  render() {
    const { gallery, name } = this.props.product

    return (
      <div className={styles.productDetail}>
        <ProductImageViewer images={gallery} name={name} />
        <ProductDetailContent product={this.props.product} />
      </div>
    )
  }
}
