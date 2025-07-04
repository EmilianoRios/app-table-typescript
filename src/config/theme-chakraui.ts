// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// 3. extend the theme
const themeChakra = extendTheme({
  config,
  colors: {
    gray: {
      800: '#181818',
    },
  },
})

export default themeChakra
