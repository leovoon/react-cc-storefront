import React, { PureComponent } from 'react'
import DOMPurify from 'dompurify'
import styles from './ProductDescription.module.css'

export default class ProductDescription extends PureComponent<{
  description: string
}> {
  render() {
    const { description } = this.props
    return (
      <div
        tabIndex={0}
        className={styles.description}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(description),
        }}
      />
    )
  }
}
