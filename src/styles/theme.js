import React from 'react'
import { theme } from '@chakra-ui/core'

export default {
  ...theme,
  breakpoints: ['30em', '48em', '62em', '80em'],
  fonts: {
    heading: 'Raleway, sans-serif',
    body: 'Raleway, sans-serif',
    mono: '"Fira Code", monospace'
  },
  fontSizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '4rem' // 64px
  },
  colors: {
    ...theme.colors,
    black: '#000a1e',
    white: '#e2efff',
    primary: {
      50: '#e2efff',
      100: '#b4d0ff',
      200: '#86b1f9',
      300: '#5692f5',
      400: '#2973f1',
      500: '#135ad8',
      600: '#0a46a9',
      700: '#033279',
      800: '#001e4b',
      900: '#000a1e'
    },
    accent: {
      50: '#ffe8de',
      100: '#fdc8b4',
      200: '#f7aa88',
      300: '#f28f5a',
      400: '#ec762c',
      500: '#d36313',
      600: '#a5420c',
      700: '#762807',
      800: '#481100',
      900: '#1e0000'
    }
  },
  icons: {
    ...theme.icons,
    create: {
      viewBox: '3.725 -0.003 79.953 79.927',
      path: (
        <g>
          <path fill="currentColor" d="m46.51,0.1a40,40 0 0 0 -42.78,37.22a2.4,2.4 0 0 0 2.39,2.55l0,0a2.63,2.63 0 0 0 2.61,-2.46a35,35 0 1 1 37.52,37.49a2.72,2.72 0 0 0 -2.53,2.69l0,0a2.34,2.34 0 0 0 2.48,2.33a40,40 0 0 0 0.31,-79.82z"/>
          <path fill="currentColor" d="m56.43,12.65c-21.24,-8.89 -41.62,5.8 -42.74,25.63a1.48,1.48 0 0 0 1.47,1.59l1.84,0a1.72,1.72 0 0 0 1.7,-1.57c1.13,-16.8 18.84,-29 36.9,-20.51a21.57,21.57 0 0 1 10.25,10.21c8.68,18.41 -4.15,36.43 -21.4,37a0.76,0.76 0 0 0 -0.73,0.75l0,2.45a1.59,1.59 0 0 0 1.63,1.8c19.88,-1.12 34.59,-21.59 25.57,-42.88a27.16,27.16 0 0 0 -14.49,-14.47z"/>
          <path fill="currentColor" d="M 39.944 56.219 L 27.871 56.219 C 27.479 56.219 27.162 55.899 27.162 55.501 L 27.162 43.29 C 27.162 41.306 25.572 39.698 23.61 39.698 C 21.649 39.698 20.059 41.306 20.059 43.29 L 20.059 55.501 C 20.059 55.899 19.742 56.219 19.349 56.219 L 7.275 56.219 C 5.315 56.219 3.725 57.828 3.725 59.812 C 3.725 61.795 5.315 63.403 7.275 63.403 L 19.349 63.403 C 19.742 63.403 20.059 63.725 20.059 64.121 L 20.059 76.333 C 20.059 78.316 21.649 79.924 23.61 79.924 C 25.572 79.924 27.162 78.316 27.162 76.333 L 27.162 64.121 C 27.162 63.725 27.479 63.403 27.871 63.403 L 39.944 63.403 C 41.906 63.403 43.496 61.795 43.496 59.812 C 43.496 57.828 41.906 56.219 39.944 56.219 Z M 39.944 56.219"/>
        </g>
      )
    },
    join: {
      viewBox: '0 0 83 84',
      path: (
        <g>
          <path fill="currentColor" d="M46.51.1A40,40,0,0,0,3.73,37.32a2.4,2.4,0,0,0,2.39,2.55h0a2.63,2.63,0,0,0,2.61-2.46A35,35,0,1,1,46.25,74.9a2.72,2.72,0,0,0-2.53,2.69h0a2.34,2.34,0,0,0,2.48,2.33A40,40,0,0,0,46.51.1Z"></path>
          <path fill="currentColor" d="M56.43,12.65c-21.24-8.89-41.62,5.8-42.74,25.63a1.48,1.48,0,0,0,1.47,1.59H17A1.72,1.72,0,0,0,18.7,38.3c1.13-16.8,18.84-29,36.9-20.51A21.57,21.57,0,0,1,65.85,28C74.53,46.41,61.7,64.43,44.45,65a.76.76,0,0,0-.73.75V68.2A1.59,1.59,0,0,0,45.35,70c19.88-1.12,34.59-21.59,25.57-42.88A27.16,27.16,0,0,0,56.43,12.65Z"></path>
          <path fill="currentColor" d="M39.25,39.93,14.88,46A4.06,4.06,0,0,0,13,52.74l5.62,5.54L1.51,75.64A5.23,5.23,0,1,0,9,83L26.11,65.57l5.62,5.55a4,4,0,0,0,6.76-2l5.63-24.4a4,4,0,0,0-4.87-4.8Z"></path>
        </g>
      )
    }
  }
}
