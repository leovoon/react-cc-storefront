import { PureComponent } from 'react'
import { AttributeSet } from '../../features/products/models/Product'
import ProductSwatches from '../ProductSwatches'

export default class ProductAttributes extends PureComponent<{
  attributes: AttributeSet[]
  productId: string
  editMode: boolean
  mini: boolean
}> {
  render() {
    const { attributes, productId, mini } = this.props
    return (
      <ProductSwatches
        attributes={attributes}
        productId={productId}
        editMode={this.props.editMode}
        mini={mini}
      />
    )
  }
}
