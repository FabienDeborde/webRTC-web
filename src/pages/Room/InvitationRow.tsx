/* eslint-disable react/display-name */
import React, { memo } from 'react'
import { useLocation } from '@reach/router'
import {
  Button,
  Flex,
  Icon,
  useColorMode,
  useClipboard, Text, Box
} from '@chakra-ui/core'
import { motion, AnimatePresence } from 'framer-motion'

const CopyAnimation = React.forwardRef((props, ref) => {
  const { colorMode } = useColorMode()
  const color = colorMode === 'light' ? 'primary.500' : 'primary.200'
  return (
    <Flex
      pos="absolute"
      left="50%"
      transform="translateX(-50%)"
      align="center"
      ref={ref}
      { ...props }
    >
      <Text fontSize="xs" color={color}>Copied!</Text>
      <Icon
        name="check"
        size="0.5em"
        color={color}
        ml={1}
      />
    </Flex>
  )
})
const MotionCopy = motion.custom(CopyAnimation)

const InvitationRow = () => {
  const location = useLocation()
  const { onCopy, hasCopied } = useClipboard(location && location.href)

  return (
    <Flex mt={4} px={4} justify="flex-end" align="center">
      <Box pos="relative">
        <Button
          size="xs"
          variant="ghost"
          variantColor="primary"
          rightIcon="copy"
          fontWeight="normal"
          onClick={onCopy}
        >
            Copy invitation link
        </Button>
        {/* <CopyAnimation/> */}
        <AnimatePresence>
          {hasCopied && (
            <MotionCopy
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: -48 }}
              exit={{ opacity: 0, y: -300 }}
            />
          )}
        </AnimatePresence>
      </Box>
      <Button
        size="xs"
        variant="outline"
        variantColor="accent"
        ml={2}
        leftIcon="email"
        fontWeight="normal"
      >
          Send invitation email
      </Button>
    </Flex>
  )
}

export default memo(InvitationRow)
