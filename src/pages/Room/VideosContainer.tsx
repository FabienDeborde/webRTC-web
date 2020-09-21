import { Box } from '@chakra-ui/core'
import React, { memo } from 'react'

const VideosContainer = () => {
  return (
    <Box
      id="videosContainer"
      flex={1}
      overflowY="scroll"
      borderWidth="1px"
      rounded="md"
      mt={4}
    >

    </Box>
  )
}

export default memo(VideosContainer)
