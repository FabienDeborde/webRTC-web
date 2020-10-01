import * as React from 'react'
import {
  useColorMode,
  IconButton,
  IconButtonProps
} from '@chakra-ui/core'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher = (props: ColorModeSwitcherProps): React.ReactElement => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      size="sm"
      fontSize="md"
      variant="ghost"
      color="current"
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? 'moon' : 'sun'}
      aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      {...props}
    />
  )
}
