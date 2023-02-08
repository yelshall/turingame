'use client';

import { ColorModeScript, Box, Container } from '@chakra-ui/react'
import Theme from '@/app/(lib)/theme'
import NavBar from '@/app/(components)/navbar'
import Footer from '@/app/(components)/footer'
import Providers from '@/app/(components)/providers'
import Fonts from '@/app/(components)/fonts';

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
