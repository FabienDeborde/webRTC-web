/* eslint-disable react/display-name */
import React, { memo, useEffect, useState } from 'react'
import { navigate, RouteComponentProps, WindowLocation } from '@reach/router'
import {
  Flex,
  Spinner
} from '@chakra-ui/core'
import { useMutation } from 'react-query'

import { HEADER_HEIGHT } from '../../constants'
import { RoomAccessResponse, RoomState, RoomAccess, CustomError } from '../../typings'
import { accessRoom } from '../../services/room'

import VerifiedRoom from './VerifiedRoom'

type IRoom = {
  roomID?: string;
  location?: WindowLocation;
} & RouteComponentProps

const Room: React.FC<IRoom> = ({ roomID, location }) => {
  const [isVerified, setIsVerified] = useState(false)
  const [roomName, setRoomName] = useState('')

  const redirectToHome = () => {
    navigate('/', { replace: true })
  }

  const [joinRoom, { isLoading }] = useMutation(accessRoom, {
    onSuccess: (res) => {
      const data = res.data as RoomAccessResponse
      // console.log('data', data)

      if (data.access) {
        setIsVerified(true)
        const name = data.name || roomID as string
        setRoomName(name)
      } else {
        redirectToHome()
      }
    },
    onError: (error: CustomError) => {
      // if 401 redirect to join page with id prefilled and show message to ask for pwd
      if (error.code === 401) {
        navigate(`/?mode=join&id=${roomID}`, { replace: true })
      } else {
        redirectToHome()
      }
    }
  })

  useEffect(() => {
    if (roomID) {
      if (location && location.state) {
        const state = location.state as RoomState
        if (state.access) {
          setIsVerified(true)
          setRoomName(state.name || roomID)
        } else {
          redirectToHome()
        }
      } else {
        const data: RoomAccess = {
          id: roomID
        }
        joinRoom(data)
      }
    } else {
      redirectToHome()
    }
  }, [location, roomID, joinRoom])

  if (isLoading) {
    return (
      <Flex h={`calc(100vh - ${HEADER_HEIGHT}px)`} align="center" justify="center">
        <Spinner
          size="xl"
          thickness="4px"
          speed="1s"
          color="accent.500"
          label="Loading..."
        />
      </Flex>
    )
  }

  if (!isVerified || !roomID || !roomName) return null

  return (
    <VerifiedRoom
      roomName={roomName}
      roomID={roomID}
    />
  )
}

export default memo(Room)
