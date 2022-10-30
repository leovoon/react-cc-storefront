import { useParams, useNavigate, Navigate } from 'react-router-dom'

export const withRouter = <Props extends WithRouterProps<{}>>(
  Component: React.ComponentType<Props>
) => {
  return (props: Omit<Props, keyof WithRouterProps<{}>>) => {
    let params = useParams()
    let navigate = useNavigate()
    return (
      <Component {...(props as Props)} params={params} navigate={navigate} />
    )
  }
}

export interface WithRouterProps<T> {
  params: T
  navigate: typeof Navigate
}
