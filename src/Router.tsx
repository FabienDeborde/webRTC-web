import React from 'react'
import { Router } from '@reach/router'
import {
  Box
} from '@chakra-ui/core'

import { HEADER_HEIGHT } from './constants'
import Header from './components/Header'
import Home from './pages/Home'
import Room from './pages/Room'
import NotFound from './pages/NotFound'

const Routes: React.FunctionComponent = () => {
  return (
    <>
      <Header />
      <Box as="main" pt={`${HEADER_HEIGHT}px`} h="100vh">
        <Router>
          <Home path="/" />
          <Room path="/room/:roomID" />
          <NotFound default />
        </Router>
      </Box>
    </>
  )
}

export default Routes
