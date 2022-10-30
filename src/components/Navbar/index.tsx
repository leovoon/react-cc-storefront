import { connect, ConnectedProps } from 'react-redux'
import { PureComponent } from 'react'
import { RootState } from '../../store'
import { endpoints } from '../../features/products/services/product.service'
import { getCurrencies } from '../../features/currency/services/currency.service'
import { setCurrency } from '../../features/currency/currencySlice'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../../assets/logo.svg'
import CurrencySwitcher from '../../components/CurrencySwitcher'
import Spinner from '../../components/Spinner'
import CartMiniToggler from '../CartMiniToggler'

const mapState = (state: RootState) => ({
  categories: endpoints.getCategories.select()(state),
  currencies: getCurrencies.select()(state),
  selectedCurrency: state.currency.selectedCurrency,
})

const mapDispatch = {
  getCategoriesFromApi: endpoints.getCategories.initiate,
  getCurrenciesFromApi: getCurrencies.initiate,
  setCurrency,
}

type NavbarProps = ConnectedProps<typeof connector>
const connector = connect(mapState, mapDispatch)

class Navbar extends PureComponent<NavbarProps> {
  state = {
    activeStyle: {
      color: '#5ECE7B',
      fontWeight: '600',
      borderBottom: '2px solid #5ECE7B',
    },
  }

  componentDidMount(): void {
    const { getCategoriesFromApi, getCurrenciesFromApi } = this.props
    getCategoriesFromApi()
    getCurrenciesFromApi()
  }

  render() {
    const { categories, currencies } = this.props

    if (categories.isLoading || currencies.isLoading) {
      return <Spinner />
    }

    if (!categories.data || !currencies.data) {
      return <div>No data</div>
    }

    if (categories.isError || currencies.isError) {
      return <div>Error initialize api call...</div>
    }

    return (
      <nav className={styles.nav}>
        <ul>
          {categories.isSuccess &&
            categories.data.map((category, id) => (
              <NavLink
                key={id}
                className={styles.navlink}
                style={({ isActive }) =>
                  isActive ? this.state.activeStyle : {}
                }
                to={`/${category.name}`}
              >
                {category.name}
              </NavLink>
            ))}
        </ul>

        <img src={logo} width={41} height={41} alt="logo" />

        <div className={styles.action}>
          <CurrencySwitcher currencies={currencies.data} />
          <CartMiniToggler />
        </div>
      </nav>
    )
  }
}

export default connector(Navbar)
