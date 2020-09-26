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
  return (
    <Grid
      id="videosContainer"
      gap={1}
      templateColumns="repeat(5, 1fr)"
      flex={1}
      borderWidth="1px"
      rounded="md"
      mt={4}
      overflow="hidden"
    >
      <Box>
        <Video stream={userStream} muted/>
      </Box>
      <Box>
        <Video stream={userStream} muted/>
      </Box>
      <Box>
        <Video stream={userStream} muted/>
      </Box>
      <Box>
        <Video stream={userStream} muted/>
      </Box>
      <Box>
        <Video stream={userStream} muted/>
      </Box>
      <Box>
        <Video stream={userStream} muted/>
      </Box>
      <Box>
        <Video stream={userStream} muted/>
      </Box>

    </Grid>
  )
}

export default memo(VideosContainer)
