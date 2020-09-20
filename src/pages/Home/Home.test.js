import React from 'react'
import { screen } from '@testing-library/react'
import { render } from './test-utils'
import { Home } from './Home'

test('renders home page', () => {
  render(<Home />)
  const createElement = screen.getByText(/Create a Room/i)
  const joinElement = screen.getByText(/Join a Room/i)
  expect(createElement).toBeInTheDocument()
  expect(joinElement).toBeInTheDocument()
})
