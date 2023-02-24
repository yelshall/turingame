'use client';

import {
	ChakraProvider
} from '@chakra-ui/react'
import theme from '../(lib)/theme'
import { AuthContextProvider } from "../context/userAuthFunctions"


export default function Providers({ children }) {
	return (
		<AuthContextProvider> 
		<ChakraProvider theme={theme}>
			{children}
		</ChakraProvider>
		</AuthContextProvider>
	)
}