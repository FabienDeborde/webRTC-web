import React from 'react'
import { Link } from '@reach/router'
import { Flex, theme } from '@chakra-ui/core'

import { HEADER_HEIGHT } from '../constants'
import { ColorModeSwitcher } from './ColorModeSwitcher'

const Header: React.FC = () => {
  return (
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
      <Link to="/">WebRTC tryouts</Link>
      <ColorModeSwitcher />
    </Flex>
  )
}

export default Header
