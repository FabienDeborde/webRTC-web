import React, { memo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Box, Flex, Icon, Text } from '@chakra-ui/core'

import { HEADER_HEIGHT } from '../constants'

const NotFound: React.FC<RouteComponentProps> = () => (
  <Flex
    h={`calc(100vh - ${HEADER_HEIGHT}px)`}
    justify="center"
    align="center"
  >
    <Box textAlign="center">
      <Icon
        name="warning-2"
        size="3em"
        color="accent.500"
        mb={4}
      />
      <Text as="h1" fontSize="3xl">Oops! Page not found!</Text>
    </Box>
  </Flex>
)

export default memo(NotFound)
