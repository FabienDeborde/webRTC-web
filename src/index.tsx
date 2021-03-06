import * as React from 'react'
import ReactDOM from 'react-dom'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core'
import { Global } from '@emotion/core'
import 'focus-visible/dist/focus-visible'

import * as serviceWorker from './serviceWorker'
import reportWebVitals from './reportWebVitals'
import customTheme from './styles/theme'
import Router from './Router'
import GlobalStyles from './styles/GlobalStyles'

const queryCache = new QueryCache()

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider>
        <CSSReset />
        <Global styles={GlobalStyles} />
        <ReactQueryCacheProvider queryCache={queryCache}>
          <Router />
        </ReactQueryCacheProvider>
      </ColorModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
