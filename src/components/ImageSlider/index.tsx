import { PureComponent } from 'react'
import styles from './ImageSlider.module.css'
import caret from '../../assets/caret.svg'

export default class ImageSlider extends PureComponent<{
  images: string[]
  mini: boolean
}> {
  state = {
    selectedImageIndex: 0,
  }

  handlePrevious = () => {
    const { selectedImageIndex } = this.state

    if (selectedImageIndex === 0) return
    this.setState({ selectedImageIndex: selectedImageIndex - 1 })
  }

  handleNext = () => {
    const { selectedImageIndex } = this.state
    const { images } = this.props

    if (selectedImageIndex === images.length - 1) return
    this.setState({ selectedImageIndex: selectedImageIndex + 1 })
  }

  render() {
    const { images, mini } = this.props
    return (
      <div className={`${styles.container} ${mini && styles.mini}`}>
        <img
          className={styles.image}
          src={images[this.state.selectedImageIndex]}
          alt="product"
        />
        {images.length > 1 && (
          <div className={styles.control}>
            <button onClick={this.handlePrevious} title={'Previous'}>
              <img
                src={caret}
                alt="previous"
                style={{ transform: 'rotate(-180deg)' }}
              />
            </button>
            <button onClick={this.handleNext} title={'Next'}>
              <img src={caret} alt="next" />
            </button>
          </div>
        )}
      </div>
    )
  }
}
