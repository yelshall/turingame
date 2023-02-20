'use client';

import {
	Stack,
	Button,
	Heading,
	SkeletonText,
	Box,
	Checkbox,
	Text,
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
			<Heading fontSize={'6xl'} pb='16px'>Turingame</Heading>
			<Stack
				justifyContent='center'
				alignItems={'center'}
                >
                    <br />
				<Button onClick={() => {router.push('/')}} w='100px' colorScheme='green' size='lg' variant='solid'>Play</Button>
			</Stack>
		</Box>
	);
}