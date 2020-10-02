import React, { memo, useEffect, useRef, useState } from 'react'
import {
  Grid,
  Box,
  theme, useColorMode
} from '@chakra-ui/core'
import { IUserStreams } from './VerifiedRoom'

import Video from '../../components/Video'

interface IVideosContainer {
  userStreams?: IUserStreams;
}

const VideosContainer: React.FC<IVideosContainer> = ({ userStreams }) => {
  const containerRef = useRef<HTMLElement>(null)
  const [containerHeight, setContainerHeight] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const { colorMode } = useColorMode()

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const container = containerRef && containerRef.current
      const rect = container.getBoundingClientRect()
      setContainerHeight(rect && rect.height)
    }
  }, [containerRef])

  const _renderVideos = () => {
    if (!userStreams || Object.values(userStreams).length === 0) return null
    return Object.values(userStreams).map((stream, index) => {
      return (
        <Box h="100%" w="100%" key={index}>
          <Video stream={stream} />
        </Box>
      )
    })
  }

  if (!userStreams) return null

  // TODO:  Create dynamic layout using JS? Get W, H of container & number of videos?
  return (
    <Box
      overflow="hidden"
      flex={1}
      mt={fullscreen ? 0 : 4}
      id="videosContainer"
      ref={containerRef}
      onDoubleClick={() => setFullscreen(!fullscreen)}
      pos={fullscreen ? 'fixed' : 'relative'}
      top={fullscreen ? 0 : 'auto'}
      bottom={fullscreen ? 0 : 'auto'}
      left={fullscreen ? 0 : 'auto'}
      right={fullscreen ? 0 : 'auto'}
      zIndex={theme.zIndices.banner}
      bg={fullscreen
        ? colorMode === 'light' ? '#fff' : '#1A202C'
        : 'transparent'}
    >
      <Grid
        id="videosGrid"
        gap={2}
        templateColumns={[
          'repeat( auto-fit, minmax(150px, 1fr) )',
          'repeat( auto-fit, minmax(250px, 1fr) )',
          'repeat( auto-fit, minmax(300px, 1fr) )'
        ]}
        templateRows={[
          'repeat( auto-fit, minmax(150px, 1fr) )',
          'repeat( auto-fit, minmax(250px, 1fr) )',
          'repeat( auto-fit, minmax(300px, 1fr) )'
        ]}
        h={fullscreen ? '100vh' : containerHeight}
        overflowY="auto"
      >
        {_renderVideos()}
      </Grid>
    </Box>
  )
}

export default memo(VideosContainer)
