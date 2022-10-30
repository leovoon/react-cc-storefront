import { createApi } from '@reduxjs/toolkit/query'
import { graphqlBaseQuery } from '../../../shared/graphqlBaseQuery'
import { gql } from 'graphql-request'
import type { Currency } from '../../currency/models/Currency'

export const currencyAPI = createApi({
  reducerPath: 'currencyApi',
  baseQuery: graphqlBaseQuery({
    baseUrl: 'http://localhost:4000/',
  }),
  endpoints: (builder) => ({
    getCurrencies: builder.query<Currency[], void>({
      query: () => ({
        body: gql`
          query {
            currencies {
              label
              symbol
            }
          }
        `,
      }),
      transformResponse: (response: { currencies: Currency[] }) => {
        return response.currencies
      },
    }),
  }),
})

export const { getCurrencies } = currencyAPI.endpoints
