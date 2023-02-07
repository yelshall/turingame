'use client';

import {
	Container,
	Box
} from '@chakra-ui/react'
import ThemeToggleButton from './theme-toggle-button'

export default function Navbar(props) {
	return (
		<Box
			position="fixed"
			as="nav"
			w="100%"
			zIndex={2}
			bg='transparent'
			{...props}
		>
			<Container
				display="flex"
				p={2}
				maxW="container.xxl"
				wrap="wrap"
				align="center"
				justify="space-between"
			>
				<Box flex={1} align="right">
					<ThemeToggleButton />
				</Box>
			</Container>
		</Box>
	);
};