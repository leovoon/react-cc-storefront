import { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../store'
import { withRouter, WithRouterProps } from '../components/withRouter'
import { endpoints } from '../features/products/services/product.service'
import { increment } from '../features/products/productSlice'
import ProductDetail from '../components/ProductDetail'

const mapState = (
  state: RootState,
  ownProps: WithRouterProps<{
    id: string
    attributeSetId: string
    attributeId: string
  }>
) => ({
  product: endpoints.getProductById.select(ownProps.params.id)(state),
  id: ownProps.params.id,
  currency: state.currency.selectedCurrency,
  selectedAttributeSet: state.product.selectedAttributeSet,
})

const mapDispatch = {
  getProductByIdFromApi: endpoints.getProductById.initiate,
  addToCart: increment,
}

const connector = connect(mapState, mapDispatch)
type ProductByIdProps = ConnectedProps<typeof connector>

class ProductById extends PureComponent<ProductByIdProps> {
  componentDidMount(): void {
    const { getProductByIdFromApi, id } = this.props
    getProductByIdFromApi(id)
  }

  componentDidUpdate(prevProps: ProductByIdProps): void {
    const { getProductByIdFromApi, id } = this.props
    if (id !== prevProps.id) {
      getProductByIdFromApi(id)
    }
  }

  render() {
    const { product } = this.props

    if (!product.data || !product.isSuccess) return <div>Loading...</div>

    if (product.isError) return <div>Error fetching product.</div>

    return <ProductDetail product={product.data} />
  }
}

export default withRouter(connector(ProductById))
