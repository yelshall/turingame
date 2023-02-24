'use client';

import { ColorModeScript, Box, Container } from '@chakra-ui/react'
import Theme from '../(lib)/theme'
import NavBar from '../(components)/navbar'
import Footer from '../(components)/footer.jsx'
import Providers from '../(components)/providers'
import Fonts from '../(components)/fonts';

export default function Template({ children }) {
	return (
		<Providers>
			<ColorModeScript initialColorMode={Theme.config.initialColorMode} />
			<Fonts />
			<Box h='100%' display={'flex'} flexDir={'column'}>
				<NavBar />

				<Container h='100%' maxW="container.xl">
					{children}
				</Container>
				<Footer />
			</Box>
		</Providers>
	);
};
