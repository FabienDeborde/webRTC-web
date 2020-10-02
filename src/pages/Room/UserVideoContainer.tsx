import React, { memo, useRef, useState } from 'react'
import { Box, Button, Flex, Icon, theme, useColorMode } from '@chakra-ui/core'
import {
  isMobile
} from 'react-device-detect'

import Video from '../../components/Video'
import { useWindowSize } from '../../hooks/useWindowSize'
import { MOBILE_WIDTH } from '../../constants'

interface IUserVideoContainer {
  userStream: MediaStream;
  setUserVideoOptions: React.Dispatch<any>;
}

const UserVideoContainer: React.FC<IUserVideoContainer> = ({ userStream, setUserVideoOptions }) => {
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
  const { width } = useWindowSize()
  const { colorMode } = useColorMode()
  const [facingMode, setFacingMode] = useState('user')

  const handleMouseMove = (event: React.MouseEvent | React.TouchEvent) => {
    event.persist()
    let clientX = 0
    let clientY = 0

    if (event.nativeEvent instanceof TouchEvent) {
      clientX = event.nativeEvent.touches[0].clientX
      clientY = event.nativeEvent.touches[0].clientY
    }

    if (event.nativeEvent instanceof MouseEvent) {
      clientX = event.nativeEvent.clientX
      clientY = event.nativeEvent.clientY
    }

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

  const handleMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
    event.persist()
    let clientX = 0
    let clientY = 0

    if (event.nativeEvent instanceof TouchEvent) {
      clientX = event.nativeEvent.touches[0].clientX
      clientY = event.nativeEvent.touches[0].clientY
    }

    if (event.nativeEvent instanceof MouseEvent) {
      clientX = event.nativeEvent.clientX
      clientY = event.nativeEvent.clientY
    }

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

  const _handleFacingMode = () => {
    const mode = facingMode === 'user' ? 'environment' : 'user'
    setFacingMode(mode)
    setUserVideoOptions(mode)
  }

  return (
    <>
      <Box
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
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
          opacity={colorMode === 'light' ? 0.75 : 0.5}
        >
          <Icon
            name="arrow-up"
            size={smallVideo ? '2em' : '1em'}
            transform={`rotate(${smallVideo ? '-45deg' : '135deg'})`}
            color={colorMode === 'light' ? 'white' : 'gray'}
          />
        </Flex>
        {
          isMobile
            ? (
              <Flex
                pos="absolute"
                bottom={0}
                left={0}
                zIndex={theme.zIndices.popover}
                h={smallVideo ? 10 : 5}
                w={smallVideo ? 10 : 5}
                bg="black"
                onClick={_handleFacingMode}
                cursor="pointer"
                justify="center"
                align="center"
                opacity={colorMode === 'light' ? 0.75 : 0.5}
              >
                <Icon
                  name="flip"
                  size={smallVideo ? '2em' : '1em'}
                  color={colorMode === 'light' ? 'white' : 'gray'}
                />
              </Flex>
            )
            : null
        }
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
      >{ width && width > MOBILE_WIDTH ? 'Reset the video' : 'Reset' }</Button>
    </>
  )
}

export default memo(UserVideoContainer)
