import { PureComponent, ReactNode } from 'react'
import styles from './BaseButton.module.css'

export default class BaseButton extends PureComponent<{
  className?: string
  plain?: boolean
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
}> {
  render() {
    const { onClick, disabled, plain, className, children } = this.props
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
        ${styles.baseButton} 
        ${plain && styles.baseButton__plain} ${className}`}
      >
        {children}
      </button>
    )
  }
}
