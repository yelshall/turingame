'use client';

import { ColorModeScript, Box, Container } from '@chakra-ui/react'
import theme from './(lib)/theme'
import NavBar from './(components)/navbar.tsx'
import Footer from './(components)/footer.tsx'
import Chakra from './(components)/chakra'
import Fonts from './(components)/fonts';

export default function Template({ children }) {
	return (
		<Chakra>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<Fonts />
			<Box pb={8}>
				<NavBar />
				<Container maxW="container.xl" pt={14}>
					{children}
				</Container>
				<Footer />
			</Box>
		</Chakra>
	);
};
