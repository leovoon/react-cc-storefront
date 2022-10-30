import { connect, ConnectedProps } from 'react-redux'
import React, { PureComponent } from 'react'
import chevron from '../../assets/chevron.svg'
import { setCurrency } from '../../features/currency/currencySlice'
import { Currency } from '../../features/currency/models/Currency'
import { RootState } from '../../store'
import styles from './CurrencySwitcher.module.css'

const mapState = (state: RootState) => ({
  selectedCurrency: state.currency.selectedCurrency,
})

const mapDispatch = {
  setCurrency,
}

const connector = connect(mapState, mapDispatch)

type CurrencySwitcherProps = ConnectedProps<typeof connector> & {
  currencies: Currency[]
}

class CurrencySwitcher extends PureComponent<CurrencySwitcherProps> {
  state = {
    wrapperRef: React.createRef<HTMLDivElement>(),
    isOpen: false,
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  toggleDropdown = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleClickOutside = (e: MouseEvent) => {
    if (
      this.state.wrapperRef &&
      !this.state.wrapperRef?.current?.contains(e.target as HTMLDivElement)
    ) {
      this.setState({ isOpen: false })
    }
  }

  render() {
    const { isOpen } = this.state
    const { currencies, setCurrency, selectedCurrency } = this.props

    return (
      <div
        ref={this.state.wrapperRef}
        className={styles.container}
        onClick={this.toggleDropdown}
      >
        <div className={styles.symbol}>$</div>
        <img
          src={chevron}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          alt="currency switcher dropdown"
        />

        {isOpen && (
          <ul className={styles.menu}>
            {currencies.map((currency, id) => (
              <button
                key={id}
                onClick={() => setCurrency(currency.label)}
                className={styles.item}
                style={{
                  backgroundColor:
                    selectedCurrency === currency.label ? '#eeeeee' : '',
                }}
              >
                <div>
                  <span>{currency.symbol}</span>
                  <span>{currency.label}</span>
                </div>
              </button>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default connector(CurrencySwitcher)
