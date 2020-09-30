import React, { memo, useEffect, useRef, useState } from 'react'
import {
  Grid,
  Box
} from '@chakra-ui/core'
import { IUserStreams } from './VerifiedRoom'

// import { useUserMedia } from '../../hooks/useUserMedia'
// import { CAPTURE_OPTIONS } from '../../constants'

import Video from '../../components/Video'

// const videosCount = 1

interface IVideosContainer {
  userStreams?: IUserStreams;
}

const VideosContainer: React.FC<IVideosContainer> = ({ userStreams }) => {
  const containerRef = useRef<HTMLElement>(null)
  const [containerHeight, setContainerHeight] = useState(0)
  // const userStream = useUserMedia(CAPTURE_OPTIONS)

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
      mt={4}
      id="videosContainer"
      ref={containerRef}
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
        h={containerHeight}
        // h="100%"
        overflowY="auto"
      >
        {_renderVideos()}

      </Grid>
    </Box>
  )
}

export default memo(VideosContainer)
