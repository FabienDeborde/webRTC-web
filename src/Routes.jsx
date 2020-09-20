import React from 'react'
import { Router } from '@reach/router'
import {
  Box
} from '@chakra-ui/core'

import Home from './pages/Home'
import CreateRoom from './pages/CreateRoom'
import JoinRoom from './pages/JoinRoom'
import Room from './pages/Room'
import NotFound from './pages/NotFound'
import { ColorModeSwitcher } from './components/ColorModeSwitcher'

const Routes = () => {
  return (
    <>
      <Box pos="fixed" top="2" right="2" zIndex="sticky">
        <ColorModeSwitcher />
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
