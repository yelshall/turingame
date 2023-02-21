'use client';

import {
	Heading,
	Box,
	Spinner,
} from '@chakra-ui/react';

export default function Page() {
	return (
		<Box
			display='flex'
			flexDir={'column'}
			w='100%'
			h='100%'
			justifyContent='center'
			alignItems={'center'}
		>
			<Heading fontSize={'3xl'} pb='16px'>Finding Match</Heading>
			<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.400'
				color='blue.500'
				size='xl'
			/>
		</Box>
	);
}