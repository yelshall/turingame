import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'

const Main = ({ children, router }) => {
	return (
		<Box as="main" pb={8}>
			<Head>
				<title>turingame.ai</title>
			</Head>

			<NavBar path={router.asPath} />

			<Container maxW="container.md" pt={14}>

				{children}

				<Footer />
			</Container>
		</Box>
	)
}

export default Main