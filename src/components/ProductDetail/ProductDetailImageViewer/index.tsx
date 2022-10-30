import { PureComponent } from 'react'
import styles from './ProductDetailImageViewer.module.css'

export default class ProductImageViewer extends PureComponent<{
  images: string[]
  name: string
}> {
  state = {
    selectedImageIndex: 0,
  }

  handleImageClick = (index: number) => {
    this.setState({ selectedImageIndex: index })
  }

  render() {
    const { images, name } = this.props
    const { selectedImageIndex } = this.state
    return (
      <div className={styles.productDetail__imageviewer}>
        <div className={styles.imageBar}>
          {images.map((image, index) => (
            <div
              className={styles.imageBar__image}
              key={index}
              onClick={() => this.handleImageClick(index)}
            >
              <img src={image} alt={name} />
            </div>
          ))}
        </div>
        <div className={styles.imageView}>
          <img src={images[selectedImageIndex]} alt={name} />
        </div>
      </div>
    )
  }
}
