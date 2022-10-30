import { PureComponent } from 'react'
import { withRouter, WithRouterProps } from '../components/withRouter'
import { endpoints } from '../features/products/services/product.service'
import {
  decrement,
  setSelectedAttributeSet,
} from '../features/products/productSlice'
import { RootState } from '../store'
import { connect, ConnectedProps } from 'react-redux'
import styles from './Products.module.css'
import Spinner from '../components/Spinner'
import ProductCard from '../components/ProductCard'
import ProductCardGrid from '../components/ProductCardGrid'

const mapState = (
  state: RootState,
  ownProps: WithRouterProps<{ category: string }>
) => ({
  cart: state.product.cart,
  productsResult: endpoints.getProducts.select(ownProps.params.category)(state),
  category: ownProps.params.category || '',
  currency: state.currency.selectedCurrency,
  selectedAttributeSet: state.product.selectedAttributeSet,
})

const mapDispatch = {
  getProductsFromApi: endpoints.getProducts.initiate,
  setSelectedAttributeSet,
  removeFromCart: decrement,
}

const connector = connect(mapState, mapDispatch)
type ProductsProps = ConnectedProps<typeof connector>

class Products extends PureComponent<ProductsProps> {
  componentDidMount() {
    const { getProductsFromApi, category } = this.props
    getProductsFromApi(category)
  }
  componentDidUpdate(prevProps: ProductsProps): void {
    const { getProductsFromApi, category } = this.props

    if (this.props.category !== prevProps.category) {
      getProductsFromApi(category)
    }
  }

  render() {
    const { productsResult } = this.props

    if (productsResult.isLoading) {
      return <Spinner />
    }

    if (productsResult.isError) {
      return <div>Error fetching data..</div>
    }

    if (!productsResult.data) {
      return <div>No data..</div>
    }

    if (productsResult.data.products.length === 0) {
      return <div>No products found</div>
    }

    return (
      <div className={styles.products__content}>
        <h1 className={styles.title}>{productsResult.data.name}</h1>
        <ProductCardGrid>
          {productsResult.data.products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </ProductCardGrid>
      </div>
    )
  }
}
export default withRouter(connector(Products))
