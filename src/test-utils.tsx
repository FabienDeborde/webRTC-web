import * as React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core'
import customTheme from './styles/theme'

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ThemeProvider theme={customTheme}>
      <ColorModeProvider>
        <CSSReset />
        { children }
      </ColorModeProvider>
    </ThemeProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
