/* eslint-disable react/display-name */
import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import {
  Flex,
  Icon,
  useColorMode
} from '@chakra-ui/core'

import InvitationRow from './InvitationRow'

type IRoom = {
  roomID?: string;
} & RouteComponentProps

const Room: React.FC<IRoom> = ({ roomID }) => {
  const { colorMode } = useColorMode()
  return (
    <>
      <Flex
        as="h1"
        color={colorMode === 'light' ? 'primary.500' : 'primary.200'}
        fontSize="2xl"
        align="center"
        justify="center"
        fontWeight={500}
        pt={1}
      >
        <Icon name="info" mr={2}/>
        You are now connected to { roomID }
      </Flex>
      <InvitationRow />
    </>
  )
}

export default memo(Room)

Room.propTypes = {}
