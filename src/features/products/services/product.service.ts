import { createApi } from '@reduxjs/toolkit/query'
import { graphqlBaseQuery } from '../../../shared/graphqlBaseQuery'
import { gql } from 'graphql-request'
import type { Category, Product } from '../models/Product'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: graphqlBaseQuery({
    baseUrl: 'http://localhost:4000/',
  }),

  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        body: gql`
          query GetCategories {
            categories {
              name
            }
          }
        `,
      }),
      transformResponse(response: { categories: Category[] }) {
        return response.categories
      },
    }),
    getProducts: builder.query<Category, string>({
      query: (category) => ({
        body: gql`
          query GetProducts {
            category (input: {title: "${category}"}) {
              name
              products {
                id
                brand
                name
                inStock
                gallery
                attributes {
                  id
                  name
                  type
                  items {
                    id
                    displayValue
                    value
                  }
                }
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
              }

            }
          }
        `,
      }),
      transformResponse: (response: { category: Category }) => {
        return response.category
      },
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => ({
        body: gql`
          query GetProductById {
            product(id: "${id}") {
              id
              brand
              name
              inStock
              gallery
              description
              category
              
              attributes {
                id
                name
                type
                items {
                  id
                  displayValue
                  value
                }
              }

              prices {
                currency {
                  label
                  symbol
                }
                amount
              }
            }
          }
        `,
      }),
      transformResponse: (response: { product: Product }) => {
        return response.product
      },
    }),
  }),
})

export const { endpoints } = productApi
