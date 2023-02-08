'use client';

import { ColorModeScript, Box, Container } from '@chakra-ui/react'
import theme from '@/app/(lib)/theme'
import Footer from '@/app/(components)/footer'
import Chakra from '@/app/(components)/chakra'
import Fonts from '@/app/(components)/fonts';

export default function Template({ children }) {
	return (
		<Chakra>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<Fonts />
			<Box pb={8}>
				<Container maxW="container.xl" pt={14}>
					{children}
				</Container>
				<Footer />
			</Box>
		</Chakra>
	);
};
