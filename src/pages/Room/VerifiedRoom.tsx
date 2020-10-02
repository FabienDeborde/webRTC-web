import React, { memo, useCallback, useEffect, useState } from 'react'
import SocketIOClient from 'socket.io-client'
import Peer from 'peerjs'
import {
  Flex,
  Icon,
  useColorMode
} from '@chakra-ui/core'

import { getUserMedia } from '../../services/stream'
import {
  CAPTURE_OPTIONS,
  HEADER_HEIGHT,
  MOBILE_WIDTH,
  SERVER_URL,
  PEER_URL,
  PEER_PORT
} from '../../constants'
import { useWindowSize } from '../../hooks/useWindowSize'

import InvitationRow from './InvitationRow'
import VideosContainer from './VideosContainer'
import UserVideoContainer from './UserVideoContainer'

interface IPeers {
  [key: string]: Peer.MediaConnection
}
export interface IUserStreams {
  [key: string]: MediaStream
}

interface IVerifiedRoom {
  roomName: string;
  roomID: string;
}

const peers:IPeers = {}

const peerOptions: Peer.PeerJSOption = {
  host: PEER_URL,
  path: '/peer',
  secure: process.env.NODE_ENV === 'production',
  debug: 1
}

if (process.env.NODE_ENV === 'development') {
  peerOptions.port = PEER_PORT
}

const VerifiedRoom: React.SFC<IVerifiedRoom> = ({ roomName, roomID }) => {
  const { colorMode } = useColorMode()
  const [userStream, setUserStream] = useState<MediaStream|null>()
  const [userStreams, setUserStreams] = useState<IUserStreams>({})
  const [userVideoOptions, setUserVideoOptions] = useState<any>({})
  const { width } = useWindowSize()

  const getUserStream = useCallback(
    async () => {
      const stream = await getUserMedia({
        ...CAPTURE_OPTIONS,
        ...userVideoOptions
      })
      setUserStream(stream)
      return stream
    },
    [userVideoOptions]
  )

  const updateStreams = (call: Peer.MediaConnection, userId: string) => {
    call.on('stream', userVideoStream => {
      setUserStreams(prevState => {
        return {
          ...prevState,
          [userId]: userVideoStream
        }
      })
    })
  }

  const deleteStreams = (userId: string) => {
    setUserStreams(prevState => {
      const newState = { ...prevState }
      delete newState[userId]
      return newState
    })
  }

  const connectToNewUser = useCallback(
    (peer: Peer, userId: string, stream: MediaStream) => {
      if (peer) {
        const call = peer.call(userId, stream)
        console.log('calling user')

        updateStreams(call, userId)

        call.on('close', () => {
          deleteStreams(userId)
        })
        peers[userId] = call
      }
    },
    []
  )

  const removePeer = useCallback(
    (userId: string) => {
      console.log('removing peer')
      if (peers && peers[userId]) peers[userId].close()
      deleteStreams(userId)
    },
    []
  )

  useEffect(() => {
    let stream: MediaStream|null
    const getStream = async () => {
      stream = await getUserStream()
    }
    getStream()

    return () => {
      if (stream) {
        for (const track of stream.getTracks()) {
          track.stop()
        }
      }
    }
  }, [getUserStream])

  useEffect(() => {
    if (userStream && roomID) {
      // console.log('user stream', userStream)
      const peer = new Peer(undefined, peerOptions)
      // console.log('peer', peer)

      const socket = SocketIOClient(SERVER_URL, {
        // transports: ['websocket'],
        path: '/socket'
      })

      peer.on('open', id => {
        socket.emit('join-room', roomID, id)
      })

      peer.on('call', call => {
        console.log('receiving a call...')
        call.answer(userStream)
        updateStreams(call, call.peer)
      })

      socket.on('user-connected', (newUserId: string) => {
        console.log('new user connected')
        connectToNewUser(peer, newUserId, userStream)
      })

      socket.on('user-disconnected', (userId: string) => {
        console.log('user disconnected')
        removePeer(userId)
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [userStream, roomID, connectToNewUser, removePeer])

  if (!userStream) return null

  return (
    <Flex h={`calc(100vh - ${HEADER_HEIGHT}px)`} direction="column" overflow="hidden" p={4}>
      <Flex
        as="h1"
        color={colorMode === 'light' ? 'primary.500' : 'primary.200'}
        fontSize={[
          'l',
          '2xl'
        ]}
        align="center"
        justify="center"
        fontWeight={500}
        pt={[
          0,
          1
        ]}
      >
        <Icon name="info" mr={2}/>
        You are now connected to { roomName }
      </Flex>
      { width && width > MOBILE_WIDTH ? <InvitationRow roomID={roomID}/> : null }
      <VideosContainer userStreams={userStreams} />
      <UserVideoContainer userStream={userStream} setUserVideoOptions={setUserVideoOptions}/>
      { width && width <= MOBILE_WIDTH ? <InvitationRow roomID={roomID}/> : null }
    </Flex>
  )
}

export default memo(VerifiedRoom)
