import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
import socketIOClient from 'socket.io-client'
import Peer from 'peerjs'
// import axios from 'axios'
// import PropTypes from 'prop-types'

const URL = 'http://127.0.0.1:4001'
const ROOM_ID = 'HELLO123'
// const USER_ID = 1

const App = () => {
  const selfVideoRef = useRef(null)
  const userVideoRef = useRef(null)
  const [socket, setSocket] = useState(null)
  const [peer, setPeer] = useState(null)

  useEffect(() => {
    const myPeer = new Peer(undefined, {
      host: '/',
      port: '4000'
    })
    const mySocket = socketIOClient(URL, { path: '/rooms' })
    setSocket(mySocket)
    setPeer(myPeer)

    myPeer.on('open', id => {
      mySocket.emit('join-room', ROOM_ID, id)
    })

    return () => mySocket.disconnect()
  }, [])

  const connectToNewUser = useCallback(
    (userId, stream) => {
      const call = peer.call(userId, stream)
      const videoEl = userVideoRef && userVideoRef.current
      call.on('stream', userVideoStream => {
        console.log('userVideoStream', userVideoStream)
        if (videoEl) {
          videoEl.srcObject = userVideoStream
          videoEl.addEventListener('loadedmetadata', () => {
            videoEl.play()
          })
        }
      })
      call.on('close', () => {
        videoEl.srcObject = null
        videoEl.removeEventListener('loadedmetadata', () => {
          videoEl.play()
        })
      })
    },
    [peer]
  )

  const _handleSelfVideo = useCallback(
    async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        if (stream && selfVideoRef && selfVideoRef.current) {
          selfVideoRef.current.srcObject = stream

          peer.on('call', call => {
            call.answer(stream)
          })

          socket.on('user-connected', userId => {
            connectToNewUser(userId, stream)
          })
        }
      } catch (error) {
        console.warn(error)
      }
    },
    [socket, connectToNewUser, peer]
  )

  const _playSelfVideo = () => {
    selfVideoRef.current.play()
  }

  useEffect(() => {
    const video = selfVideoRef && selfVideoRef.current
    if (socket) {
      _handleSelfVideo()
      if (video) {
        video.addEventListener('loadedmetadata', _playSelfVideo)
      }
    }

    return () => {
      video.removeEventListener('loadedmetadata', _playSelfVideo)
    }
  }, [socket, _handleSelfVideo])

  return (
    <main>
      <h1>App</h1>
      <div id="video-grid">
        <video muted ref={selfVideoRef}></video>
        <video muted ref={userVideoRef}></video>

      </div>
    </main>
  )
}

export default memo(App)

App.propTypes = {}
