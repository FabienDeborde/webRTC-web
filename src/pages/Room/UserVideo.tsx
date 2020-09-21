import React from 'react'
import { AspectRatioBox, Box } from '@chakra-ui/core'

const UserVideo: React.FC = () => {
  return (
    <AspectRatioBox ratio={1}>
      <Box
        as="iframe"
        title="naruto"
        {
          ...{
            allowFullScreen: true,
            src: 'https://www.youtube.com/embed/QhBnZ6NPOY0'
          }
        }
      />
    </AspectRatioBox>
  )
}

export default UserVideo
