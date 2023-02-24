'use client';

import Image from 'next/image';
import { ColorModeScript, Box, Container, Button } from '@chakra-ui/react'
import Theme from '../../app/(lib)/theme'
import Footer from '../../app/(components)/footer.jsx'
import Providers from '../../app/(components)/providers'
import Fonts from '../../app/(components)/fonts';
import logo from '../../public/next.svg';
import ThemeToggleButton from '../../app/(components)/theme-toggle-button';
import { useRouter } from 'next/navigation';

export default function Template({ children }) {
	const router = useRouter();
	return (
		<Providers>
			<ColorModeScript initialColorMode={Theme.config.initialColorMode} />
			<Fonts />
			<Box h='100%' display={'flex'} flexDir={'column'}>
				<Button pt={8} pb={8} display={'flex'} alignItems={'center'} justifyContent='center' onClick={()=>{router.push("/")}}>
					<p>turing.ai</p> 
				</Button>
				<Container
					h='100%'
					display={'flex'}
					flexDir={'column'}
					justifyContent={'center'}
					alignItems={'center'}
					maxW={'container.sm'}
				>
					{children}
				</Container>
				<Footer />
			</Box>
		</Providers>
	);
};
