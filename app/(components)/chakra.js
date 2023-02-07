'use client';

import {
	ChakraProvider
} from '@chakra-ui/react'
import theme from '@/app/(lib)/theme'

export default function Chakra({ children }) {
	return (
		<ChakraProvider theme={theme}>
			{children}
		</ChakraProvider>
	)
}