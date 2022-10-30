import { PureComponent, ReactNode } from 'react'
import styles from './ProductCardGrid.module.css'

export default class index extends PureComponent<{ children: ReactNode }> {
  render() {
    return <div className={styles.grid}>{this.props.children}</div>
  }
}
