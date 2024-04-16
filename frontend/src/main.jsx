import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools"
import { BrowserRouter } from "react-router-dom"
import store from './redux/store.js'
import { Provider } from 'react-redux'

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.900", "whiteAlpha.900")(props),
      bg: mode("gray.50", "#101010")(props)
    }
  })
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e"
  }
}

const theme = extendTheme({ styles, config, colors })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
