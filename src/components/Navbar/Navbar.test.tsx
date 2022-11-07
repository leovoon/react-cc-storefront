import { screen } from '@testing-library/react'
import { server } from '../../mocks/server'

// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../../test/test-utils'
import Navbar from './index'

// We use msw to intercept the network request during the test,

// Enable API mocking before tests.
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('fetches and loads text for category links', async () => {
  renderWithProviders(<Navbar />)

  expect(screen.getByText('Loading...')).toBeInTheDocument()
  expect(await screen.findByText('all')).toBeInTheDocument()
  expect(await screen.findByText('clothes')).toBeInTheDocument()
  expect(await screen.findByText('tech')).toBeInTheDocument()
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
})
