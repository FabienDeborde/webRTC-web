import React from 'react'
import { Router } from '@reach/router'
import {
  theme,
  Flex,
  Box
} from '@chakra-ui/core'

import Home from './pages/Home'
import Room from './pages/Room'
import NotFound from './pages/NotFound'
import { ColorModeSwitcher } from './components/ColorModeSwitcher'
import { HEADER_HEIGHT } from './constants'

const Routes: React.FunctionComponent = () => {
  return (
    <>
      <Flex
        as="header"
        pos="fixed"
        top="0"
        left="0"
        right="0"
        zIndex={theme.zIndices.sticky}
        justify="space-between"
        align="center"
        p="2"
        h={`${HEADER_HEIGHT}px`}
      >
        <span>WebRTC tryouts</span>
        <ColorModeSwitcher />
      </Flex>
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
