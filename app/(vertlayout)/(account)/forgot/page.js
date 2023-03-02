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
import { useStateContext } from '../../../context/userAuthFunctions';
import Swal from "sweetalert2"
// import { verifyEmail } from '@/app/(util)/util';

export default function Page() {
	const [email, setEmail] = useState("")
	const {resetPassword} = useStateContext();


	const handleReset = async() => {
		console.log()
		try {
			const res = await resetPassword(email);
			Swal.fire("Password Reset Link Sent")
		} catch (e) {
			console.log(e);
			Swal.fire({text:"Make Sure you entered a correct email", icon:"error"})


		}

	}

	return (
		<div
			className='flex-col flex justify-center align-center'
	
		>
			<p className='text-2xl pb-9'> Forgot password</p>
			<div className="flex-col">
				<FormControl pb='8px'>
					<FormLabel>Email address</FormLabel>
					<Input
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						placeholder='Enter email' w='300px' type="email"
					/>
				</FormControl>
				<div className='p-5'> 
				<Button className="bg-black" onClick={() => {handleReset()}}>Send email</Button>
				</div>
			</div>
		</div>
	);
}