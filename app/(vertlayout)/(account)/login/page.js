'use client';

import {
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	Text,
	Divider,
	Box,
	InputRightElement,
	InputGroup
} from '@chakra-ui/react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useEffect, useState } from 'react';
// import { verifyEmail } from '@/app/(util)/util';

export default function Page() {
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	useEffect(() => {
		console.log(email, password)
	}, [email, password])
	return (
		<Box
			display='flex'
			flexDir={'column'}
			w='100%'
			h='100%'
			justifyContent='center'
			alignItems={'center'}
		>
			<Heading fontSize={'4xl'} pb='16px'>Welcome back</Heading>
			<Stack>
				<FormControl pb='8px'>
					<FormLabel>Email address</FormLabel>
					<Input
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						placeholder='Enter email' w='300px' type="email"
					/>
				</FormControl>

				<FormControl pb='8px'>
					<FormLabel>Password</FormLabel>
					<InputGroup w='300px' type="password" >
						<Input
							value={password}
							type={show ? 'text' : 'password'}
							placeholder='Enter password'
							onChange={(event) => setPassword(event.target.value)}
						/>
						<InputRightElement width='4.5rem'>
							<Button h='1.75rem' size='sm' onClick={handleClick}>
								{show ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
					</InputGroup>
				</FormControl>

				<Text pb='8px' color={'#2B6CB0'}><Link href='/forgot'>Forgot password</Link></Text>
				<Button bg='#2A4365'>Sign in</Button>
				<Box display='flex' flexDir='row'>
					<Text>Don't have an account?</Text> <Text pl='2px' color={'#2B6CB0'}><Link href='/signup'>Sign up</Link></Text>
				</Box>
				<Divider />
				<Button
					variant={'outline'}
					leftIcon={<FcGoogle />}>
					Continue with Google
				</Button>
			</Stack >
		</Box >
	);
}