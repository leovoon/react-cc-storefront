import { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { AttributeSet } from '../../features/products/models/Product'
import { RootState } from '../../store'
import styles from './ProductSwatches.module.css'
import { setSelectedAttributeSet } from '../../features/products/productSlice'
import ProductSwatch from '../ProductSwatch'
import { set, get } from 'local-storage'
const mapState = (state: RootState) => ({
  selectedAttributeSet: state.product.selectedAttributeSet,
})

const mapDispatch = {
  setSelectedAttributeSet,
}

const connector = connect(mapState, mapDispatch)

type ProductSwatchesProps = ConnectedProps<typeof connector> & {
  attributes: AttributeSet[]
  productId: string
  editMode: boolean
  mini: boolean
}
class ProductSwatches extends PureComponent<ProductSwatchesProps> {
  handleOnSelected = (attrId: string, itemId: string) => {
    const selectedAttrByProduct = this.props.selectedAttributeSet.find(
      (a) => a.pid === this.props.productId
    )?.attributes

    const selectedAttributeSet = selectedAttrByProduct?.map((attr) => {
      if (attr.id === attrId) {
        return {
          ...attr,
          items: attr.items.map((item) => {
            if (item.id === itemId) {
              return {
                ...item,
                selected: !item.selected,
              }
            } else {
              return {
                ...item,
                selected: false,
              }
            }
          }),
        }
      } else {
        return attr
      }
    })

    set(this.props.productId, selectedAttributeSet)
    this.props.setSelectedAttributeSet({
      pid: this.props.productId,
      attributes: selectedAttributeSet!,
    })
  }

  componentDidMount() {
    const selectedAttributeSet =
      (get(this.props.productId) as AttributeSet[]) || this.props.attributes
    if (selectedAttributeSet) {
      this.props.setSelectedAttributeSet({
        pid: this.props.productId,
        attributes: selectedAttributeSet,
      })
    }
  }

  render() {
    const { editMode, mini, selectedAttributeSet, productId } = this.props
    const attributesByMode = editMode
      ? selectedAttributeSet.find((attr) => attr.pid === productId)?.attributes
      : this.props.attributes

    return (
      <div className={`${styles.container} ${mini && styles.mini}`}>
        {attributesByMode &&
          attributesByMode.map((attribute) => {
            return (
              <ProductSwatch
                key={attribute.id}
                attribute={attribute}
                onSelected={this.handleOnSelected}
                mini={mini}
              />
            )
          })}
      </div>
    )
  }
}

export default connector(ProductSwatches)
