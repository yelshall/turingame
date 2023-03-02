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
	InputGroup,
	Select
} from '@chakra-ui/react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStateContext } from "../../../context/userAuthFunctions";

// import { verifyEmail } from '@/app/(util)/util';

export default function Page() {
	const router = useRouter();

	const { signUp, googleSignIn, user } = useStateContext()
	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [accountType, setAccountType] = useState("");


	const handleSubmit = async (event) => {
		console.log(email, password)
		try {
			const res = await signUp(email, password);
			if (res) {
				let timerInterval
				await Swal.fire({
				  title: 'Signup Successful',
				  html: 'redirecting you to the homepage...',
				  timer: 4000,
				  timerProgressBar: true,
				  didOpen: () => {
					Swal.showLoading()
				  },
				  willClose: () => {
					clearInterval(timerInterval)
				  }
				})
				router.push("/");
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleGoogle = async () => {
		let res;
		try {
			res = await googleSignIn();
			if (res) {
				let timerInterval
				await Swal.fire({
				  title: 'Signup Successful',
				  html: 'redirecting you to the homepage...',
				  timer: 4000,
				  timerProgressBar: true,
				  didOpen: () => {
					Swal.showLoading()
				  },
				  willClose: () => {
					clearInterval(timerInterval)
				  }
				})
				router.push("/")
			}
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<Box
			display='flex'
			flexDir={'column'}
			w='100%'
			h='100%'
			justifyContent='center'
			alignItems={'center'}
		>
			<Heading fontSize={'4xl'} pb='16px'>Create your account</Heading>
			<Stack>
				<FormControl pb='8px'>
					<FormLabel>Email address</FormLabel>
					<Input
						value={email}
						onChange={(event) => { setEmail(event.target.value); console.log(event.target.value) }}
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
							onChange={(event) => { setPassword(event.target.value); console.log(event.target.value) }}
						/>
						<InputRightElement width='4.5rem'>
							<Button h='1.75rem' size='sm' onClick={handleClick}>
								{show ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
					</InputGroup>
				</FormControl>
				<FormControl pb='8px'>
					<FormLabel>Account Type</FormLabel>
					<Select placeholder='Select account type' onChange={(event) => { setAccountType(event.target.value); console.log(event.target.value) }}>
						<option value="player">Player</option>
						<option value="developer">Developer</option>
					</Select>
				</FormControl>
				<Button bg='#2A4365' onClick={() => { handleSubmit() }}>Sign Up</Button>
				<Box display='flex' flexDir='row'>
					<Text>Have an account?</Text> <Text pl='2px' color={'#2B6CB0'}><Link href='/login'>Sign in</Link></Text>
				</Box>
				<Divider />
				<Button
					variant={'outline'}
					leftIcon={<FcGoogle />} onClick={() => { handleGoogle() }}>
					Continue with Google
				</Button>
			</Stack>
		</Box>
	);
}