import * as React from 'react'
import {
  useColorMode,
  IconButton,
  IconButtonProps
} from '@chakra-ui/core'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
  const { colorMode, toggleColorMode } = useColorMode()
  console.log('colorMode', colorMode)

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? 'moon' : 'sun'}
      aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      {...props}
    />
  )
}
