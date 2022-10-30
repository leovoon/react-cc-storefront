import { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Attribute, AttributeSet } from '../../features/products/models/Product'
import { RootState } from '../../store'
import styles from './ProductSwatch.module.css'
import { setSelectedAttributeSet } from '../../features/products/productSlice'

const mapState = (state: RootState) => ({
  selectedAttributeSet: state.product.selectedAttributeSet,
})

const mapDispatch = {
  setSelectedAttributeSet,
}

const connector = connect(mapState, mapDispatch)

type ProductSwatchProps = ConnectedProps<typeof connector> & {
  attribute: AttributeSet
  onSelected: (attrId: string, itemId: string) => void
  mini: boolean
}
class ProductSwatch extends PureComponent<ProductSwatchProps> {
  render() {
    const { attribute, onSelected, mini } = this.props
    return (
      <>
        <div className={`${styles.name} ${mini && styles.mini}`}>
          {attribute.name}:
        </div>
        <div className={styles.options}>
          {attribute.items?.map((item: Attribute) => {
            return (
              <button
                title={item.displayValue}
                onClick={() => onSelected(attribute.id, item.id)}
                className={`
                            ${mini && styles.mini}
                            ${attribute.type === 'text' && styles.textOption}
                            ${
                              attribute.type === 'swatch' && styles.swatchOption
                            }
                            ${item.selected ? styles.selected : ''}
                            `}
                style={{
                  backgroundColor:
                    attribute.type === 'swatch' ? item.value : '',
                }}
                key={item.id}
              >
                {attribute.type === 'text' && <span>{item.value}</span>}
              </button>
            )
          })}
        </div>
      </>
    )
  }
}

export default connector(ProductSwatch)
