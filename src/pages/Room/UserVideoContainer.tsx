import React, { useRef, useState } from 'react'
import { Box, Button, theme } from '@chakra-ui/core'

import { useUserMedia } from '../../hooks/useUserMedia'
import { CAPTURE_OPTIONS } from '../../constants'

import Video from '../../components/Video'

const UserVideoContainer: React.FC = () => {
  const userStream = useUserMedia(CAPTURE_OPTIONS)
  // Manage drag & drop
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [posX, setPosX] = useState(localStorage.getItem('userVideoX') ? Number(localStorage.getItem('userVideoX')) : 8)
  const [posY, setPosY] = useState(localStorage.getItem('userVideoY') ? Number(localStorage.getItem('userVideoY')) : 8)
  const [originalX, setOriginalX] = useState(0)
  const [originalY, setOriginalY] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)

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

  return (
    <>
      <Box
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        bottom={posY + 'px'}
        right={posX + 'px'}
        transform={`translate(${translateX}px, ${translateY}px)`}
        h={[
          '150px',
          '200px'
        ]}
        pos="fixed"
        cursor={isDragging ? 'grabbing' : 'grab'}
        boxShadow={isDragging ? 'lg' : 'none'}
        zIndex={theme.zIndices.overlay}
      >
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

export default UserVideoContainer
