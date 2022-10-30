import { PureComponent } from 'react'
import spinner from '../../assets/spinner.svg'
import styles from './Spinner.module.css'
export default class index extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <img src={spinner} alt="loading spinner" />
      </div>
    )
  }
}
