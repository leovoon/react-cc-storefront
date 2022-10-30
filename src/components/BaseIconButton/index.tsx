import { PureComponent } from 'react'
import styles from './BaseIconButton.module.css'
export default class BaseIconButton extends PureComponent<{
  className?: string
  onClick?: () => void
  disabled?: boolean
  icon: string
  children?: React.ReactNode
}> {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        disabled={this.props.disabled}
        className={`${styles.iconButton} ${this.props.className}`}
      >
        {this.props.children || (
          <img src={this.props.icon} alt="icon" className={styles.icon} />
        )}
      </button>
    )
  }
}
