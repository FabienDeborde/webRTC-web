import React from 'react'
import { Router } from '@reach/router'
import {
  Box,
  IconButton,
  useColorMode
} from '@chakra-ui/core'

import Home from './pages/Home'
import CreateRoom from './pages/CreateRoom'
import JoinRoom from './pages/JoinRoom'
import Room from './pages/Room'
import NotFound from './pages/NotFound'

const Routes = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Box pos="fixed" top="2" right="2" zIndex="sticky">
        <IconButton
          onClick={toggleColorMode}
          variant="ghost"
          icon={colorMode === 'light'
            ? 'moon'
            : 'sun'
          }
          aria-label={`Toggle ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          size="md"
        />
      </Box>
      <Router>
        <Home path="/" />
        <CreateRoom path="/create" />
        <JoinRoom path="/join" />
        <Room path="/room/:id" />
        <NotFound default />
      </Router>
    </>
  )
}

export default Routes
