'use client';

import {
	Stack,
	Heading,
	Box,
    Spinner,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();
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
			<Stack
				justifyContent='center'
				alignItems={'center'}
                >
                    <br />
                    <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.400'
                    color='blue.500'
                    size='xl'
                    />
			</Stack>
		</Box>
	);
}