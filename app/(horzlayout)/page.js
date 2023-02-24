'use client';

import {
	Container,
	Heading,
	Stack,
	Text,
	Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	return (
		<Container maxW={'5xl'}>
			<Stack
				textAlign={'center'}
				align={'center'}
				spacing={{ base: 8, md: 10 }}
				py={{ base: 20, md: 28 }}>
				<Heading
					fontWeight={600}
					fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
					lineHeight={'110%'}>
					Turingame{' '}
				</Heading>
				<Text color={'gray.500'} maxW={'3xl'}>
					Have an account?
				</Text>
				<Stack spacing={6} direction={'row'}>
					<Button
						rounded={'full'}
						px={6}
						colorScheme={'orange'}
						bg={'orange.400'}
						_hover={{ bg: 'orange.500' }}
						onClick={() => {router.push('/load')}}>
						Start
					</Button>
					<Button rounded={'full'} px={6}>
						Learn more
					</Button>
				</Stack>
			</Stack>
		</Container>
	)
}
