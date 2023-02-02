import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/provider'

export default function App({ Component, pageProps }) {
	<ChakraProvider>
		return <Component {...pageProps} />
	</ChakraProvider>
}
