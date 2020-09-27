import React, { memo } from 'react'
import {
  Grid,
  Box
} from '@chakra-ui/core'

import { useUserMedia } from '../../hooks/useUserMedia'
import { CAPTURE_OPTIONS } from '../../constants'

import Video from '../../components/Video'

const VideosContainer = () => {
  const userStream = useUserMedia(CAPTURE_OPTIONS)

  const _renderVideos = () => {
    const videos = []
    for (let index = 0; index < 2; index++) {
      videos.push(
        <Box h={['150px', '250px']} key={index}>
          <Video stream={userStream} muted/>
        </Box>
      )
    }
    return videos
  }
  // TODO:  Create dynamic layout using JS? Get W, H of container & number of videos?
  return (
    <Box
      overflow="hidden"
      flex={1}
      borderWidth="1px"
      rounded="md"
      mt={4}
      id="videosContainer"
    >
      <Grid
        id="videosGrid"
        gap={0}
        templateColumns={[
          'repeat( auto-fill, minmax(150px, 1fr) )',
          'repeat( auto-fill, minmax(250px, 1fr) )'
        ]}
        autoRows="max-content"
        h="100%"
        overflowY="auto"
      >
        {_renderVideos()}

      </Grid>
    </Box>
  )
}

export default memo(VideosContainer)
