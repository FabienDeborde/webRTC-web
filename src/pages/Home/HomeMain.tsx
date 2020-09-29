import React, { memo, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flex, Box } from '@chakra-ui/core'
import { useLocation } from '@reach/router'
import queryString from 'query-string'

import HomeCreate from './HomeCreate'
import HomeJoin from './HomeJoin'

interface IHomeMain {
  currentMode: 'create' | 'join' | null;
}

const HomeMain: React.FC<IHomeMain> = ({ currentMode }) => {
  const location = useLocation()
  const [defaultID, setDefaultID] = useState('')

  useEffect(() => {
    if (location) {
      const parsed = queryString.parse(location.search)
      if (parsed.mode === 'join' && parsed.id) {
        const id = parsed.id as string
        setDefaultID(id)
      }
    }
  }, [location])

  if (!currentMode || !location) return null

  const _renderChildren = () => {
    if (currentMode && currentMode === 'create') return <HomeCreate />
    if (currentMode && currentMode === 'join') return <HomeJoin defaultID={defaultID} />
    return null
  }
  return (
    <Flex
      mt={8}
      flex={1}
      w="100%"
      align="center"
      justify="center"
      p={4}
    >
      <Box
        borderWidth="1px"
        rounded="md"
        px={8}
        py={6}
        w='100%'
        minW='300px'
        maxW='500px'
      >
        <AnimatePresence>
          {currentMode && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
            >
              { _renderChildren() }
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Flex>
  )
}

export default memo(HomeMain)
