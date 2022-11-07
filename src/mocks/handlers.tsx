import { graphql } from 'msw'

export const handlers = [
  graphql.query('GetCategories', (req, res, ctx) => {
    return res(
      ctx.data({
        categories: [
          {
            name: 'all',
          },
          {
            name: 'clothes',
          },
          {
            name: 'tech',
          },
        ],
      })
    )
  }),
]
