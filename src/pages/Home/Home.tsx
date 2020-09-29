import React, { memo, useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import queryString from 'query-string'
import {
  Box,
  Button,
  Flex,
  Text
} from '@chakra-ui/core'

import HomeButton from './HomeButton'
import HomeMain from './HomeMain'
import { CreateIcon, JoinIcon } from '../../components/CustomIcons'
import { HEADER_HEIGHT } from '../../constants'

const Home: React.FC<RouteComponentProps> = ({ location }) => {
  const [currentMode, setCurrentMode] = useState<'create' | 'join' | null>(null)

  const _setToCreateMode = () => {
    setCurrentMode('create')
  }
  const _setToJoinMode = () => {
    setCurrentMode('join')
  }
  const _resetMode = () => {
    setCurrentMode(null)
  }

  useEffect(() => {
    if (location) {
      const parsed = queryString.parse(location.search)
      if (parsed.mode === 'join') {
        setCurrentMode('join')
      }
    }
  }, [location])

  const _renderBackButton = () => {
    if (!currentMode) return null

    return (
      <Box pos="absolute" top={24} left={4}>
        <Button
          leftIcon="arrow-back"
          aria-label="Go back to main menu"
          variant="ghost"
          onClick={_resetMode}
          size="md"
        >
          <Text as="span" fontWeight="normal">back</Text>
        </Button>
      </Box>
    )
  }

  return (
    <Flex align='center' justify={currentMode ? 'flex-start' : 'center'} h={`calc(100vh - ${HEADER_HEIGHT}px)`} direction="column">
      { _renderBackButton() }
      <Flex direction="column">
        <HomeButton
          currentMode={currentMode}
          mode="create"
          Icon={CreateIcon}
          handleClick={_setToCreateMode}
        />
        <HomeButton
          currentMode={currentMode}
          mode="join"
          Icon={JoinIcon}
          handleClick={_setToJoinMode}
        />
      </Flex>
      <HomeMain currentMode={currentMode} />
    </Flex>
  )
}

export default memo(Home)

Home.propTypes = {}
