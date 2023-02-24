'use client';

import {
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	Box,
	InputRightElement,
	InputGroup
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import { verifyEmail } from '@/app/(util)/util';
import { useStateContext } from '@/app/context/userAuthFunctions';


export default function Page() {
	const router = useRouter();
	const {user, resetPassword } = useStateContext();

	const [showOne, setShowOne] = useState(false)
	const handleClickOne = () => setShowOne(!showOne)

	const [showTwo, setShowTwo] = useState(false)
	const handleClickTwo = () => setShowTwo(!showTwo)

	const [newPassword, setNewPassword] = useState("")
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("")


	return (
		<Box
			display='flex'
			flexDir={'column'}
			w='100%'
			h='100%'
			justifyContent='center'
			alignItems={'center'}
		>
			<Heading fontSize={'4xl'} pb='16px'>Reset your password</Heading>
			<Stack>
				<FormControl pb='8px'>
					<FormLabel>New password</FormLabel>
					<InputGroup w='300px' type="password" >
						<Input
							value={newPassword}
							type={showOne ? 'text' : 'password'}
							placeholder='Enter password'
							onChange={(event) => setNewPassword(event.target.value)}
						/>
						<InputRightElement width='4.5rem'>
							<Button h='1.75rem' size='sm' onClick={handleClickOne}>
								{showOne ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
					</InputGroup>
				</FormControl>
				<FormControl pb='8px'>
					<FormLabel>Confirm new password</FormLabel>
					<InputGroup w='300px' type="password" >
						<Input
							value={newPasswordConfirm}
							type={showTwo ? 'text' : 'password'}
							placeholder='Enter password'
							onChange={(event) => setNewPasswordConfirm(event.target.value)}
						/>
						<InputRightElement width='4.5rem'>
							<Button h='1.75rem' size='sm' onClick={handleClickTwo}>
								{showTwo ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
					</InputGroup>
				</FormControl>
				<Button bg='#2A4365' onClick={() => { router.push('/') }}>Reset password</Button>
			</Stack>
		</Box>
	);
}