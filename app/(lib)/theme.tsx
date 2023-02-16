'use client';

import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
	global: props => ({
		body: {
			bg: mode('#F7FAFC', 'gray.900'
			)(props)
		}
	})
}

const components = {
}

const fonts = {
	heading: "'M PLUS Rounded 1c'"
}

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts })
export default theme