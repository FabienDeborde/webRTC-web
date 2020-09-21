/* eslint-disable react/display-name */
import React from 'react'
import {
  Button,
  Flex,
  useColorMode
} from '@chakra-ui/core'
import { motion, AnimatePresence } from 'framer-motion'

interface IHomeButton {
  currentMode: 'create' | 'join' | null;
  mode: 'create' | 'join';
  Icon: React.ComponentType;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const HomeButton: React.FC<IHomeButton> = ({ currentMode, mode, Icon, handleClick }) => {
  const { colorMode } = useColorMode()
  const text = `${mode.replace(/^\w/, (c: string) => c.toUpperCase())} a Room`
  const ButtonEl = React.forwardRef((props, ref) => (
    <Button
      size="lg"
      variant="outline"
      variantColor="primary"
      leftIcon={Icon}
      onClick={handleClick}
      m={2}
      ref={ref}
      { ...props }
    >
      { text }
    </Button>
  ))
  const TitleEl = React.forwardRef((props, ref) => (
    <Flex
      as="h1"
      color={colorMode === 'light' ? 'primary.500' : 'primary.200'}
      fontSize="2xl"
      align="center"
      justify="center"
      fontWeight={500}
      pt={1}
      ref={ref}
      { ...props }
    >
      { <Icon /> }
      { text }
    </Flex>
  ))

  const MotionButton = motion.custom(ButtonEl)
  const MotionTitle = motion.custom(TitleEl)

  if (currentMode && currentMode !== mode) return null
  if (currentMode && currentMode === mode) {
    return (
      <AnimatePresence>
        <MotionTitle
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          exit={{ opacity: 0 }}
        />
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      <MotionButton
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    </AnimatePresence>
  )
}

export default HomeButton
