import { PureComponent } from 'react'
import styles from './ProductBrandName.module.css'
export default class ProductBrandName extends PureComponent<{
  brand: string
  name: string
  mini: boolean
}> {
  render() {
    const { brand, name, mini } = this.props
    return (
      <div>
        <h1 className={`${styles.brand} ${mini && styles.mini}`}>{brand}</h1>
        <h2 className={`${styles.name} ${mini && styles.mini}`}>{name}</h2>
      </div>
    )
  }
}
