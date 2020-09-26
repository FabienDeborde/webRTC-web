/* eslint-disable react/display-name */
import React, { memo } from 'react'
import { useLocation } from '@reach/router'
import {
  Button,
  Flex,
  Icon,
  useColorMode,
  useClipboard,
  Text,
  Box,
  useDisclosure
} from '@chakra-ui/core'
import { motion, AnimatePresence } from 'framer-motion'
import InvitationModal from './InvitationModal'

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

type IInvitationRow = {
  roomID?: string;
}

const InvitationRow: React.FC<IInvitationRow> = ({ roomID }) => {
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { onCopy, hasCopied } = useClipboard(location && location.href)

  return (
    <>
      <InvitationModal isOpen={isOpen} onClose={onClose} roomID={roomID}/>
      <Flex mt={4} justify="flex-end" align="center">
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
          ml={4}
          leftIcon="email"
          fontWeight="normal"
          onClick={onOpen}
        >
          Send invitation email
        </Button>
      </Flex>
    </>
  )
}

export default memo(InvitationRow)
