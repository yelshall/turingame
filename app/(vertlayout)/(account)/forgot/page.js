'use client';

import {
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	Box,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import { verifyEmail } from '@/app/(util)/util';

export default function Page() {
	const [email, setEmail] = useState("")

	return (
		<Box
			display='flex'
			flexDir={'column'}
			w='100%'
			h='100%'
			justifyContent='center'
			alignItems={'center'}
		>
			<Heading fontSize={'4xl'} pb='16px'>Forgot password</Heading>
			<Stack>
				<FormControl pb='8px'>
					<FormLabel>Email address</FormLabel>
					<Input
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						placeholder='Enter email' w='300px' type="email"
					/>
				</FormControl>
				<Button bg='#2A4365' onClick={() => {}}>Send email</Button>
			</Stack>
		</Box>
	);
}