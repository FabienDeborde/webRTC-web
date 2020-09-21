import React, { useState, useRef, useEffect } from 'react'
import { Box } from '@chakra-ui/core'

import { useUserMedia } from '../../hooks/useUserMedia'
import { CAPTURE_OPTIONS } from '../../constants'

const UserVideo: React.FC = () => {
  const userVideoRef = useRef<HTMLVideoElement>(null)
  const userStream = useUserMedia(CAPTURE_OPTIONS)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const video = userVideoRef && userVideoRef.current

    if (video && userStream) {
      video.srcObject = userStream
      video.muted = true
    }
    return () => {
      if (userStream) {
        userStream.getTracks().forEach(track => {
          track.stop()
        })
      }
      if (video) {
        video.pause()
        video.srcObject = null
        setVideoReady(false)
      }
    }
  }, [userStream])

  useEffect(() => {
    const video = userVideoRef && userVideoRef.current
    if (video && videoReady) {
      video.play()
    }
  }, [videoReady])

  return (
    <Box
      as="video"
      w='auto'
      h='100%'
      m={0}
      p={0}
      rounded="md"
      ref={userVideoRef}
      onCanPlay={() => setVideoReady(true)}
    ></Box>
  )
}

export default UserVideo
