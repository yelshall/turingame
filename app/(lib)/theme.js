'use client';

import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
	global: props => ({
		body: {
			bg: mode('#F7FAFC', '#2D3748')(props)
		}
	})
}

const components = {
}

const colors = {
	light: '#F7FAFC',
	dark: '#2D3748'
}

const fonts = {
	heading: "'M PLUS Rounded 1c'"
}

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false
}

const theme = extendTheme({ config, styles, components, colors, fonts })
export default theme