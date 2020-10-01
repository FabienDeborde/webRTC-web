import React, { memo, useRef, useState } from 'react'
import { Box, Button, Flex, Icon, theme } from '@chakra-ui/core'

import Video from '../../components/Video'

interface IUserVideoContainer {
  userStream: MediaStream;
}

const UserVideoContainer: React.FC<IUserVideoContainer> = ({ userStream }) => {
  // Manage drag & drop
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [posX, setPosX] = useState(localStorage.getItem('userVideoX') ? Number(localStorage.getItem('userVideoX')) : 8)
  const [posY, setPosY] = useState(localStorage.getItem('userVideoY') ? Number(localStorage.getItem('userVideoY')) : 8)
  const [originalX, setOriginalX] = useState(0)
  const [originalY, setOriginalY] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const [smallVideo, setSmallVideo] = useState(localStorage.getItem('user_video_size') === 'true')

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event

    if (isDragging) {
      setTranslateX(clientX - originalX)
      setTranslateY(clientY - originalY)
    }
  }

  const handleMouseUp = () => {
    setOriginalX(0)
    setOriginalY(0)
    setTranslateX(0)
    setTranslateY(0)
    setIsDragging(false)

    const bottom = posY + (translateY * -1)
    const right = posX + (translateX * -1)
    setPosX(right)
    setPosY(bottom)

    localStorage.setItem('userVideoX', String(right))
    localStorage.setItem('userVideoY', String(bottom))
  }

  const handleMouseDown = (event: React.MouseEvent) => {
    const { clientX, clientY } = event

    setOriginalX(clientX)
    setOriginalY(clientY)
    setTranslateX(0)
    setTranslateY(0)
    setIsDragging(true)
  }

  const _resetContainer = () => {
    setPosX(8)
    setPosY(8)
    setOriginalX(0)
    setOriginalY(0)
    setTranslateX(0)
    setTranslateY(0)
    setIsDragging(false)

    localStorage.setItem('userVideoX', String(8))
    localStorage.setItem('userVideoY', String(8))
  }

  const _handleVideoSize = () => {
    localStorage.setItem('user_video_size', String(!smallVideo))
    setSmallVideo(!smallVideo)
  }

  return (
    <>
      <Box
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        bottom={posY + 'px'}
        right={posX + 'px'}
        transform={`translate(${translateX}px, ${translateY}px) scale(${smallVideo ? 0.5 : 1})`}
        transformOrigin="bottom right"
        h={[
          '150px',
          '200px'
        ]}
        maxW="250px"
        pos="fixed"
        cursor={isDragging ? 'grabbing' : 'grab'}
        boxShadow={isDragging ? 'lg' : 'none'}
        zIndex={theme.zIndices.overlay}
      >
        <Flex
          pos="absolute"
          zIndex={theme.zIndices.popover}
          h={smallVideo ? 10 : 5}
          w={smallVideo ? 10 : 5}
          bg="black"
          onClick={_handleVideoSize}
          cursor="pointer"
          justify="center"
          align="center"
          opacity={0.5}
        >
          <Icon name="arrow-up" size={smallVideo ? '2em' : '1em'} transform={`rotate(${smallVideo ? '-45deg' : '135deg'})`}/>
        </Flex>
        <Box
          h="100%"
          w="100%"
          m={0}
          p={0}
          rounded="md"
          overflow="hidden"
        >
          <Video stream={userStream} muted/>
        </Box>
      </Box>
      <Button
        pos="fixed"
        // variant="outline"
        size="xs"
        variantColor="primary"
        onClick={_resetContainer}
        bottom={3}
        right={3}
        zIndex={theme.zIndices.docked}
      >Reset the video</Button>
    </>
  )
}

export default memo(UserVideoContainer)
